import React from "react";
import {AbsoluteFill, Audio, Img, Sequence, interpolate, useCurrentFrame, staticFile} from "remotion";

const memes = [
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-1.jpg",
    label: "Когда пытаешься объяснить, почему всё пошло не по плану",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-2.jpg",
    label: "Рик снова решил провести воспитательную беседу",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-3.jpg",
    label: "Когда вокруг все говорят очевидные вещи",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-1.png",
    label: "Когда твоё мнение попросили… и тут же пожалели",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D0%BC%D0%B5%D0%BC-%D0%BF%D1%80%D0%B8%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-20-%D0%BC%D0%B8%D0%BD%D1%83%D1%82-5.jpg",
    label: "Когда Рик говорит: «Да это на двадцать минут»",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D0%BE%D0%B3%D1%83%D1%80%D0%B5%D1%86-%D1%80%D0%B8%D0%BA-1.png",
    label: "Когда хотел просто спокойно провести вечер",
  },
];

const FPS = 30;
const SLIDE = 60;

function Slide({item, index}) {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 12], [80, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const scale = interpolate(frame, [0, 12, 48, 60], [0.96, 1, 1, 1.025], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const opacity = interpolate(frame, [0, 8, 52, 60], [0, 1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const cardY = interpolate(frame, [0, 12], [24, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{opacity, background: "#090b0e", color: "#fff", fontFamily: "Arial, sans-serif"}}>
      <AbsoluteFill style={{background: "radial-gradient(circle at 50% 25%, #202a2f 0%, #090b0e 62%)"}} />
      <div style={{
        position:"absolute", left:48, right:48, top:52, display:"flex",
        justifyContent:"space-between", alignItems:"center", zIndex:5,
        fontSize:22, fontWeight:800, letterSpacing:3, opacity:.78
      }}>
        <span>РИК И МОРТИ</span>
        <span>{String(index+1).padStart(2,"0")}/06</span>
      </div>

      <div style={{
        position:"absolute", left:42, right:42, top:140, bottom:245,
        transform:`translateX(${enter}px) translateY(${cardY}px) scale(${scale})`,
        display:"flex", alignItems:"center", justifyContent:"center",
        borderRadius:30, overflow:"hidden", background:"#11161a",
        border:"1px solid rgba(255,255,255,.12)",
        boxShadow:"0 22px 70px rgba(0,0,0,.48)"
      }}>
        <Img src={item.src} style={{width:"100%", height:"100%", objectFit:"contain"}} />
      </div>

      <div style={{
        position:"absolute", left:65, right:65, bottom:104, textAlign:"center",
        fontSize:28, lineHeight:1.2, fontWeight:800, opacity:.96,
        textShadow:"0 3px 12px #000", zIndex:6
      }}>{item.label}</div>

      <div style={{position:"absolute", left:50, right:50, bottom:52, height:5, background:"rgba(255,255,255,.14)", borderRadius:99}}>
        <div style={{height:"100%", width:`${((index+1)/memes.length)*100}%`, background:"#fff", borderRadius:99}} />
      </div>
    </AbsoluteFill>
  );
}

export const RickMortyMemes = () => (
  <AbsoluteFill>
    <Audio src={staticFile("rick-morty-beat.wav")} volume={0.18} loop />
    {memes.map((item, i) => (
      <Sequence key={item.src} from={i * SLIDE} durationInFrames={SLIDE}>
        <Slide item={item} index={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
