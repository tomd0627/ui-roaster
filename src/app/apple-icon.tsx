import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 2C16 2 23 9 23 17C23 22.5 19.5 26.5 16 29C12.5 26.5 9 22.5 9 17C9 9 16 2 16 2Z"
            fill="#FF4D6D"
          />
          <path
            d="M16 11C16 11 19.5 15 19.5 19C19.5 21.5 17.8 23.5 16 24.5C14.2 23.5 12.5 21.5 12.5 19C12.5 15 16 11 16 11Z"
            fill="#00E5FF"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
