import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4338ca 0%, #be185d 100%)",
          borderRadius: 7,
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: -0.5,
          color: "#f5f5fa",
        }}
      >
        RD
      </div>
    ),
    { ...size },
  );
}
