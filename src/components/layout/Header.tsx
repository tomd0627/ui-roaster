function FlameLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={28}
      height={28}
      aria-hidden="true"
    >
      <path
        d="M16 2C16 2 23 9 23 17C23 22.5 19.5 26.5 16 29C12.5 26.5 9 22.5 9 17C9 9 16 2 16 2Z"
        fill="#FF4D6D"
      />
      <path
        d="M16 11C16 11 19.5 15 19.5 19C19.5 21.5 17.8 23.5 16 24.5C14.2 23.5 12.5 21.5 12.5 19C12.5 15 16 11 16 11Z"
        fill="#00E5FF"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-sm"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FlameLogo />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              UI Roaster
            </span>
          </div>

          <a
            href="https://github.com/tomdeluca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors"
            style={{
              color: "var(--color-text-secondary)",
              borderColor: "var(--color-border)",
            }}
            aria-label="View source on GitHub (opens in new tab)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width={16}
              height={16}
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
