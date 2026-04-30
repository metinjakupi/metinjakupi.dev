import { ImageResponse } from "next/og";
import { siteDescription, siteTitle } from "@/lib/seo";

export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#a3e635";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#0a0a0a",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            color: ACCENT,
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          ~ senior_frontend_engineer
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 0.95,
              color: "#ffffff",
              fontFamily: "sans-serif",
            }}
          >
            Metin Jakupi
          </div>
          <div
            style={{
              color: "#a1a1aa",
              fontSize: 36,
              lineHeight: 1.35,
              maxWidth: 1000,
              fontFamily: "sans-serif",
            }}
          >
            {siteDescription}
          </div>
        </div>

        <div
          style={{
            borderTop: `2px solid ${ACCENT}`,
            color: "#a1a1aa",
            display: "flex",
            fontSize: 24,
            justifyContent: "space-between",
            paddingTop: 30,
            width: "100%",
          }}
        >
          <span>react / next / node / typescript</span>
          <span style={{ color: ACCENT }}>metinjakupi.dev</span>
        </div>
      </div>
    ),
    size
  );
}
