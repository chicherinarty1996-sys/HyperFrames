import React from "react";
import {AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

const memes = [
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-1.jpg",
    kicker: "Я:",
    label: "Сегодня никаких проблем",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-2.jpg",
    kicker: "Рик через 3 секунды:",
    label: "МОРТИ, У НАС ЕСТЬ ОДНА МАЛЕНЬКАЯ ПРОБЛЕМА",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-3.jpg",
    kicker: "Морти:",
    label: "А МОЖНО ПРОСТО ДОМОЙ?",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-1.png",
    kicker: "Рик:",
    label: "НЕ ПАНИКУЙ. ПОКА.",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D0%BC%D0%B5%D0%BC-%D0%BF%D1%80%D0%B8%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-20-%D0%BC%D0%B8%D0%BD%D1%83%D1%82-5.jpg",
    kicker: "Рик:",
    label: "ПРИКЛЮЧЕНИЕ НА 20 МИНУТ",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D0%BE%D0%B3%D1%83%D1%80%D0%B5%D1%86-%D1%80%D0%B8%D0%BA-1.png",
    kicker: "Через 20 минут:",
    label: "Я ВСЕГО ЛИШЬ ХОТЕЛ ПОСПАТЬ",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-2.jpg",
    kicker: "Джерри:",
    label: "МОЖЕТ, ПРОСТО ПОГОВОРИМ?",
  },
  {
    src: "https://memepedia.ru/wp-content/uploads/2017/10/%D1%80%D0%B8%D0%BA-%D0%B8-%D0%BC%D0%BE%D1%80%D1%82%D0%B8-%D0%BC%D0%B5%D0%BC-1.jpg",
    kicker: "Рик:",
    label: "НЕТ.",
  },
];

const FPS = 30;
const SLIDE = 72;
const TOTAL = memes.length * SLIDE;

function KineticText({children, kicker, frame}) {
  const pop = spring({frame, fps: FPS, config:{damping:12, stiffness:180, mass:.65}});
  const y = interpolate(frame,[0,8],[32,0],{extrapolateRight:"clamp"});
  const opacity = interpolate(frame,[0,6],[0,1],{extrapolateRight:"clamp"});
  const shake = frame < 10 ? Math.sin(frame * 3.4) * 2 : 0;
  return (
    <div style={{position:"absolute",left:55,right:55,bottom:145,zIndex:10,textAlign:"center",transform:`translateY(${y}px) translateX(${shake}px) scale(${0.94 + pop*.06})`,opacity}}>
      <div style={{fontSize:22,fontWeight:800,letterSpacing:1.8,textTransform:"uppercase",marginBottom:12,opacity:.78}}>{kicker}</div>
      <div style={{fontSize:48,lineHeight:1.02,fontWeight:950,letterSpacing:-1.2,textTransform:"uppercase",textShadow:"0 5px 20px rgba(0,0,0,.65)"}}>{children}</div>
    </div>
  );
}

function Slide({item,index}) {
  const frame = useCurrentFrame();
  const {width,height} = useVideoConfig();
  const enter = interpolate(frame,[0,10],[width*.12,0],{extrapolateRight:"clamp"});
  const exit = interpolate(frame,[58,72],[0,-width*.1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const scale = interpolate(frame,[0,18,72],[1.04,1,1.08],{extrapolateRight:"clamp"});
  const opacity = interpolate(frame,[0,5,64,72],[0,1,1,0],{extrapolateRight:"clamp"});
  const rotation = interpolate(frame,[0,12],[index%2 ? 1.8:-1.8,0],{extrapolateRight:"clamp"});
  const progress = ((index*SLIDE + frame) / TOTAL) * 100;
  const accent = index % 2 ? "#5ee7ff" : "#b6ff4a";

  return (
    <AbsoluteFill style={{background:"#07090b",opacity,fontFamily:"Arial, Helvetica, sans-serif",color:"#fff",overflow:"hidden"}}>
      <AbsoluteFill style={{background:"radial-gradient(circle at 50% 30%, rgba(44,63,68,.75), rgba(7,9,11,1) 65%)"}} />
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",backgroundSize:"48px 48px",transform:`translateY(${(frame*1.5)%48}px)`}} />

      <div style={{position:"absolute",top:46,left:45,right:45,zIndex:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:19,fontWeight:950,letterSpacing:3}}>RICK / MORTY</div>
        <div style={{fontSize:18,fontWeight:900,opacity:.55}}>{String(index+1).padStart(2,"0")} / {String(memes.length).padStart(2,"0")}</div>
      </div>

      <div style={{position:"absolute",top:108,left:45,width:70,height:5,borderRadius:9,background:accent,boxShadow:`0 0 20px ${accent}`}} />

      <div style={{position:"absolute",left:34,right:34,top:145,bottom:390,borderRadius:34,overflow:"hidden",background:"#111418",border:"1px solid rgba(255,255,255,.14)",boxShadow:"0 30px 100px rgba(0,0,0,.55)",transform:`translateX(${enter+exit}px) scale(${scale}) rotate(${rotation}deg)`}}>
        <Img src={item.src} style={{width:"100%",height:"100%",objectFit:"contain",filter:"contrast(1.04) saturate(1.05)"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 55%,rgba(0,0,0,.55) 100%)"}} />
      </div>

      <KineticText kicker={item.kicker} frame={frame}>{item.label}</KineticText>

      <div style={{position:"absolute",left:45,right:45,bottom:64,height:5,borderRadius:9,background:"rgba(255,255,255,.12)",zIndex:20}}>
        <div style={{height:"100%",width:`${progress}%`,borderRadius:9,background:"#fff",boxShadow:"0 0 14px rgba(255,255,255,.4)"}} />
      </div>

      {index === 0 && frame < 40 && (
        <div style={{position:"absolute",top:570,left:0,right:0,textAlign:"center",fontSize:20,fontWeight:900,letterSpacing:2,opacity:interpolate(frame,[0,8,32,40],[0,1,1,0],{extrapolateRight:"clamp"})}}>
          НЕ ЛИСТАЙ ↓
        </div>
      )}
    </AbsoluteFill>
  );
}

function Outro() {
  const frame = useCurrentFrame();
  const scale = interpolate(frame,[0,12],[.88,1],{extrapolateRight:"clamp"});
  const opacity = interpolate(frame,[0,8,48,60],[0,1,1,0],{extrapolateRight:"clamp"});
  return (
    <AbsoluteFill style={{background:"#07090b",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",fontFamily:"Arial, sans-serif",opacity}}>
      <div style={{transform:`scale(${scale})`,padding:60}}>
        <div style={{fontSize:24,fontWeight:800,letterSpacing:3,opacity:.55,marginBottom:18}}>ОБЫЧНЫЙ ДЕНЬ</div>
        <div style={{fontSize:62,lineHeight:.95,fontWeight:950,textTransform:"uppercase"}}>В РИКЕ<br/>И МОРТИ</div>
        <div style={{marginTop:28,fontSize:19,fontWeight:700,opacity:.45}}>если понял — ты уже часть команды</div>
      </div>
    </AbsoluteFill>
  );
}

export const RickMortyMemes = () => (
  <AbsoluteFill>
    {memes.map((item,i) => (
      <Sequence key={item.src + i} from={i * SLIDE} durationInFrames={SLIDE}>
        <Slide item={item} index={i} />
      </Sequence>
    ))}
    <Sequence from={TOTAL} durationInFrames={60}>
      <Outro />
    </Sequence>
  </AbsoluteFill>
);

export const RICK_MORTY_DURATION = TOTAL + 60;
