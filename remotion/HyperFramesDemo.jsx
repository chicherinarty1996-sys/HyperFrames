import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const HyperFramesDemo = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 60], [0, 1, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 60], [0.92, 1], { extrapolateRight: "clamp" });
  const progress = Math.min(1, frame / 360);

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(circle at 50% 25%, #26365a 0%, #0b0d13 45%, #05060a 100%)",
      color: "white",
      fontFamily: "Inter, Arial, sans-serif",
      overflow: "hidden"
    }}>
      <AbsoluteFill style={{ opacity: 0.12, backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div style={{ position: "absolute", top: 180, left: 90, fontSize: 28, letterSpacing: 8, opacity: 0.65 }}>HYPERFRAMES</div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 90 }}>
        <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
          <div style={{ fontSize: 30, marginBottom: 36, opacity: 0.7 }}>AI VIDEO STUDIO</div>
          <div style={{ fontSize: 112, lineHeight: 1.02, fontWeight: 800, letterSpacing: -5 }}>{title}</div>
          <div style={{ marginTop: 48, fontSize: 32, opacity: 0.72 }}>First generated composition • 1080 × 1920</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 110, height: 6, borderRadius: 999, background: "rgba(255,255,255,.16)" }}>
        <div style={{ width: `${progress * 100}%`, height: "100%", borderRadius: 999, background: "white" }} />
      </div>
    </AbsoluteFill>
  );
};
