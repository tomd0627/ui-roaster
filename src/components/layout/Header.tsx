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
        </div>
      </div>
    </header>
  );
}
