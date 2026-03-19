export function Footer() {
  return (
    <footer
      className="mt-auto border-t py-8"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text-muted)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          Powered by{" "}
          <a
            href="https://www.anthropic.com/claude"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{ color: "var(--color-heat)" }}
          >
            Claude Sonnet
          </a>
        </p>
      </div>
    </footer>
  );
}
