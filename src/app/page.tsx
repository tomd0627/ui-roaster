import { RoasterShell } from "@/components/RoasterShell";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--color-text)" }}>
          Your UI,{" "}
          <span style={{ color: "var(--color-heat)" }}>Brutally</span>{" "}
          <span style={{ color: "var(--color-digital)" }}>Honest</span>
        </h1>
        <p className="mx-auto max-w-md text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          Drop a UI screenshot and get an AI-powered critique of your design&apos;s
          visual quality, UX, accessibility, typography, and layout.
        </p>
      </div>

      <RoasterShell />
    </div>
  );
}
