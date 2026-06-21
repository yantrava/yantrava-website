import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Static share card — real logo lockup + positioning line on the black canvas.
// Rendered once at build time (Node runtime keeps the route static). Next
// auto-wires og:image + twitter:image.
export const alt = "Yantrava Labs, a permanent builder of software brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Inline the traced logo as a bone data-URI so satori can render it as an image.
const logoSvg = readFileSync(join(process.cwd(), "public/logo.svg"), "utf8").replace(
  /currentColor/g,
  "#f4f3ef",
);
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoDataUri} width={400} height={104} alt="Yantrava Labs" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#f4f3ef",
          }}
        >
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            A permanent builder of
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            software brands.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "rgba(244,243,239,0.62)",
            }}
          >
            Independent product brands that earn long-term trust. Built in India.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
