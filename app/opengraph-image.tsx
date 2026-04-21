import { ImageResponse } from "next/og";
import { EVENT_INFO } from "@/lib/constants";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          color: "#4E4538",
          background:
            "radial-gradient(circle at 20% 20%, rgba(239,164,140,0.45), transparent 40%), radial-gradient(circle at 80% 0%, rgba(248,220,41,0.28), transparent 35%), linear-gradient(135deg, rgba(151,172,98,0.55), rgba(227,219,198,0.92))"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "28px",
            border: "2px solid rgba(78,69,56,0.22)",
            borderRadius: "24px"
          }}
        />
        <div style={{ fontSize: 34, letterSpacing: 6, textTransform: "uppercase", opacity: 0.85 }}>
          Приглашение на свадьбу
        </div>
        <div style={{ marginTop: 24, fontSize: 88, fontWeight: 700 }}>{EVENT_INFO.couple}</div>
        <div style={{ marginTop: 14, fontSize: 44 }}>{EVENT_INFO.dateText}</div>
        <div style={{ marginTop: 24, fontSize: 34, opacity: 0.9 }}>
          {EVENT_INFO.venue}
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}

