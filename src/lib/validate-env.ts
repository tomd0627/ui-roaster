/**
 * Validates that required environment variables are set.
 * Called at module initialization in the API route — throws at startup if missing.
 */
export function validateEnv(): void {
  if (!process.env["ANTHROPIC_API_KEY"]) {
    throw new Error(
      "Missing required environment variable: ANTHROPIC_API_KEY. " +
        "Add it to your .env.local file. See .env.example for reference."
    );
  }
}
