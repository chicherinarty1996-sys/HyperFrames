import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const Cat = ({ x, y, scale, tilt, delay, mood }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin((frame - delay) / 7) * 8;
  const s = interpolate(frame, [delay, delay + 15], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `translateY(${bob}px) rotate(${tilt}deg) scale(${scale * s})`,
      transformOrigin: "center bottom", fontSize: 250, lineHeight: 1,
      filter: "drop-shadow(0 18px 18px rgba(0,0,0,.25))"
    }}>
      {mood}
    </div>
  );
};

export const HyperFramesDemo = () => {
  const frame = useCurrentFrame();
  const intro = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [270, 299], [1, 0], { extrapolateRight: "clamp" });
  const progress = Math.min(1, frame / 299);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg, #ffd6e7 0%, #fff1c7 48%, #c9f2ff 100%)",
      color: "#171717", fontFamily: "Arial, sans-serif", overflow: "hidden"
    }}>
      <div style={{ position:"absolute", top:90, left:70, right:70, display:"flex", justifyContent:"space-between", alignItems:"center", opacity:intro }}>
        <div style={{ fontSize:30, fontWeight:900, letterSpacing:4 }}>CAT MODE</div>
        <div style={{ fontSize:25, fontWeight:700, opacity:.65 }}>10 SEC • 9:16</div>
      </div>

      <div style={{ position:"absolute", inset:0, opacity:intro*outro }}>
        <Cat x={-35} y={570} scale={1.05} tilt={-7} delay={0} mood="🐱" />
        <Cat x={330} y={820} scale={0.82} tilt={6} delay={20} mood="😺" />
        <Cat x={690} y={520} scale={1.0} tilt={-4} delay={42} mood="😹" />
        <Cat x={420} y={1190} scale={0.72} tilt={4} delay={65} mood="😼" />
      </div>

      <div style={{
        position:"absolute", left:55, right:55, bottom:230, textAlign:"center",
        opacity:intro*outro, transform:`translateY(${interpolate(frame,[0,30],[50,0],{extrapolateRight:"clamp"})}px)`
      }}>
        <div style={{ fontSize:76, fontWeight:950, lineHeight:1.02 }}>КОГДА КОТ<br/>УВИДЕЛ ПАКЕТИК</div>
        <div style={{ marginTop:25, fontSize:34, fontWeight:700, opacity:.72 }}>и забыл, что ты его хозяин</div>
      </div>

      <div style={{ position:"absolute", left:70, right:70, bottom:105, height:10, borderRadius:20, background:"rgba(0,0,0,.12)" }}>
        <div style={{ width:`${progress*100}%`, height:"100%", borderRadius:20, background:"#171717" }} />
      </div>
    </AbsoluteFill>
  );
};
