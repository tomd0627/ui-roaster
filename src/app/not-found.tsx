import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p
        className="mb-2 font-mono text-6xl font-bold"
        style={{ color: "var(--color-heat)" }}
      >
        404
      </p>
      <h1
        className="mb-4 text-2xl font-bold"
        style={{ color: "var(--color-text)" }}
      >
        Page not found
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Even our roaster can&apos;t find what you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="rounded-md px-5 py-2.5 text-sm font-semibold transition-colors"
        style={{
          backgroundColor: "var(--color-heat)",
          color: "#fff",
        }}
      >
        Back to the roaster
      </Link>
    </div>
  );
}
