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
          <span style={{ color: "var(--color-heat)" }}>Claude Sonnet</span> ·
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
