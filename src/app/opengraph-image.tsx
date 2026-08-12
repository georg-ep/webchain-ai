import { siteConfig } from "@/config/site";
import { ImageResponse } from "next/og";

/**
 * Social share card, generated at build time.
 *
 * The previous card pointed at the brand SVG, which none of the major
 * crawlers render, so shared links had no image at all.
 */
export const alt = "WebChain Labs — AI architecture and autonomous systems for business automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #070708 0%, #0b0f0e 55%, #06231c 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          <div
            style={{
              color: "#a5a5b0",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            WebChain Labs
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#f6f6f8",
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>We build systems that think,</div>
          <div style={{ display: "flex", color: "#a5a5b0" }}>
            not just software that executes.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#74747f",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", maxWidth: 720, lineHeight: 1.4 }}>
            Custom AI architecture and autonomous systems that automate the decisions your
            team is stuck making by hand.
          </div>
          <div style={{ display: "flex", color: "#34d399" }}>{new URL(siteConfig.url).host}</div>
        </div>
      </div>
    ),
    size,
  );
}
