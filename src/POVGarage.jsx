import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export const POVGarage = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const zoom = t < 6 ? interpolate(t,[0,6],[1,1.18],{extrapolateRight:"clamp"}) : interpolate(t,[6,10],[1.18,2.5],{extrapolateRight:"clamp"});
  return <AbsoluteFill style={{background:"#111",color:"white",fontFamily:"Arial",overflow:"hidden"}}>
    <AbsoluteFill style={{transform:`scale(${zoom})`,transformOrigin:"50% 48%"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 42%,#344 0%,#151515 42%,#050505 100%)"}}/>
      <div style={{position:"absolute",left:"8%",top:"13%",width:"84%",height:"68%",border:"2px solid #566",borderRadius:24}}/>
      <div style={{position:"absolute",left:"38%",top:"27%",width:"24%",height:"38%",background:"#536",borderRadius:"48% 48% 38% 38%",border:"3px solid #9aa"}}/>
      <div style={{position:"absolute",left:"42%",top:"35%",width:"7%",height:"6%",background:"#fff",borderRadius:"50%"}}/>
      <div style={{position:"absolute",left:"51%",top:"35%",width:"7%",height:"6%",background:"#fff",borderRadius:"50%"}}/>
    </AbsoluteFill>
    {t<6 && <div style={{position:"absolute",top:70,left:45,right:45,textAlign:"center",fontSize:42,fontWeight:800}}>POV: ты случайно зашёл в гараж Рика</div>}
    {t>=3.5 && t<6.8 && <div style={{position:"absolute",bottom:150,left:60,right:60,textAlign:"center",fontSize:30,fontWeight:700}}>«Э-э… ты кто вообще?»</div>}
    {t>=6.8 && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.3)"}}><div style={{fontSize:58,fontWeight:900,textAlign:"center",maxWidth:"88%"}}>Теперь ты часть эксперимента.</div></div>}
    {t>=8.7 && <div style={{position:"absolute",bottom:90,width:"100%",textAlign:"center",fontSize:24}}>— Рик, наверное</div>}
  </AbsoluteFill>;
};