import Anthropic from "@anthropic-ai/sdk";
import type { TextBlock } from "@anthropic-ai/sdk/resources/messages";
import { CLAUDE_MAX_TOKENS, CLAUDE_MODEL } from "@/lib/constants";
import type { AcceptedMimeType, RoastResult } from "@/types";

// Singleton client — initialized once at module level
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a ruthlessly honest UI/UX design critic with deep expertise in visual design, accessibility (WCAG 2.1), typography, user experience, and modern web standards. Your job is to "roast" UI screenshots with wit, precision, and specific technical insight. You are entertaining but never cruel — your goal is improvement, delivered with humor. You must respond ONLY with valid JSON matching the schema provided. Do not include markdown code fences or any text outside the JSON object.`;

const USER_PROMPT = `Analyze this UI screenshot and produce a structured roast/critique.

Return ONLY a JSON object with this exact structure — no markdown, no preamble, no code fences:
{
  "overallScore": <integer 1-10, where 10 is catastrophically bad>,
  "overallVerdict": "<one punchy sentence summarizing the whole roast>",
  "categories": [
    {
      "id": "visual-design",
      "title": "Visual Design",
      "score": <integer 1-10, where 10 is catastrophically bad>,
      "severity": <1|2|3>,
      "critique": "<1-3 sentences of specific, witty critique referencing actual elements in the image>",
      "suggestion": "<1-2 sentences of actionable improvement>"
    },
    {
      "id": "ux",
      "title": "User Experience",
      "score": <integer 1-10, where 10 is catastrophically bad>,
      "severity": <1|2|3>,
      "critique": "<specific UX issues you can see — navigation, affordances, hierarchy>",
      "suggestion": "<actionable UX improvement>"
    },
    {
      "id": "accessibility",
      "title": "Accessibility",
      "score": <integer 1-10, where 10 is catastrophically bad>,
      "severity": <1|2|3>,
      "critique": "<contrast, focus indicators, text sizing, touch targets — be specific to what you see>",
      "suggestion": "<WCAG 2.1 AA remediation advice>"
    },
    {
      "id": "typography",
      "title": "Typography",
      "score": <integer 1-10, where 10 is catastrophically bad>,
      "severity": <1|2|3>,
      "critique": "<type hierarchy, readability, font pairing, line height, letter spacing>",
      "suggestion": "<actionable typography fix>"
    },
    {
      "id": "layout",
      "title": "Layout & Spacing",
      "score": <integer 1-10, where 10 is catastrophically bad>,
      "severity": <1|2|3>,
      "critique": "<grid alignment, whitespace, visual rhythm, responsive considerations>",
      "suggestion": "<actionable layout fix>"
    }
  ]
}

Score scale (per category): 1 = nearly flawless, 10 = catastrophically bad. Use the full range.
Severity scale: 1 = mild (could be better), 2 = notable problem, 3 = needs immediate attention.
Be specific — reference actual elements you can see in the image.
If the UI is genuinely good in an area, give it a low severity score with a witty compliment, but still find room to improve.`;

export class ClaudeAPIError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "ClaudeAPIError";
  }
}

export class ClaudeParseError extends Error {
  constructor(message: string, public readonly raw?: string) {
    super(message);
    this.name = "ClaudeParseError";
  }
}

export async function callClaude(
  imageBase64: string,
  mimeType: AcceptedMimeType
): Promise<RoastResult> {
  // Strip data URI prefix if present — Claude SDK expects raw base64
  const base64Data = imageBase64.startsWith("data:")
    ? imageBase64.split(",")[1] ?? imageBase64
    : imageBase64;

  let response: Anthropic.Message;

  try {
    response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: CLAUDE_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: USER_PROMPT,
            },
          ],
        },
      ],
    });
  } catch (err) {
    throw new ClaudeAPIError("Claude API request failed", err);
  }

  const firstBlock = response.content[0];
  if (!firstBlock || firstBlock.type !== "text") {
    throw new ClaudeParseError("Unexpected response structure from Claude");
  }

  const rawText = (firstBlock as TextBlock).text.trim();

  // Extract JSON object — find the first { and last } to handle preamble/postamble
  const start = rawText.indexOf("{");
  const end = rawText.lastIndexOf("}");
  const jsonText = start !== -1 && end !== -1 && end > start
    ? rawText.slice(start, end + 1)
    : rawText;

  try {
    const parsed: unknown = JSON.parse(jsonText);
    // Basic shape validation
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("overallScore" in parsed) ||
      !("categories" in parsed)
    ) {
      throw new Error("Response missing required fields");
    }
    return parsed as RoastResult;
  } catch {
    throw new ClaudeParseError("Failed to parse Claude JSON response", jsonText);
  }
}
