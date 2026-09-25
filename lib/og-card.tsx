import { profile } from "@/lib/data";

export function OgCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0b0b14",
        backgroundImage:
          "radial-gradient(circle at 8% 12%, rgba(129,140,248,0.55) 0%, rgba(129,140,248,0) 42%), radial-gradient(circle at 92% 22%, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0) 42%), radial-gradient(circle at 25% 100%, rgba(96,165,250,0.35) 0%, rgba(96,165,250,0) 45%)",
        fontFamily: "sans-serif",
        color: "#f5f5fa",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #818cf8 0%, #f472b6 100%)",
            fontSize: 24,
            fontWeight: 700,
            color: "#0b0b14",
          }}
        >
          RD
        </div>
        <span style={{ fontSize: 24, color: "#a8a8c0", fontWeight: 500 }}>
          {profile.shortName}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span
          style={{
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 950,
          }}
        >
          {profile.headline}
        </span>
        <span style={{ fontSize: 26, color: "#a8a8c0", fontWeight: 500 }}>
          {profile.role} · {profile.location}
        </span>
      </div>
    </div>
  );
}
