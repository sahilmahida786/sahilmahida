import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const runtime = "nodejs";
export const alt = `${personal.name} - ${personal.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#05070B", // SAHIL.OS Dark Premium Background
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "9999px",
            padding: "20px 40px",
            background: "rgba(255, 255, 255, 0.03)",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "-0.05em",
            }}
          >
            SAHIL<span style={{ color: "#3b82f6" }}>.OS</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {personal.name}
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#9ca3af",
              margin: 0,
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Software Developer & Digital Solutions Provider
          </p>
          <p
            style={{
              fontSize: "24px",
              color: "#3b82f6",
              margin: "20px 0 0 0",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: "bold",
            }}
          >
            Rajkot, Gujarat, India
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
