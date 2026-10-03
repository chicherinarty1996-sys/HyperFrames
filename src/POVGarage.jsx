import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export const POVGarage = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const approach = interpolate(t, [0, 6], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const shockZoom = t >= 6 ? interpolate(t, [6, 7.1], [1, 2.8], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 1;
  const zoom = (1 + approach * 0.18) * shockZoom;
  const shake = t >= 6 ? Math.sin(frame * 2.7) * Math.min(3, (t - 6) * 3) : 0;

  return (
    <AbsoluteFill style={{background: "#07090b", color: "white", fontFamily: "Arial, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{
        transform: `translateX(${shake}px) scale(${zoom})`,
        transformOrigin: "50% 48%"
      }}>
        {/* Garage atmosphere */}
        <AbsoluteFill style={{background: "linear-gradient(180deg,#17202a 0%,#101418 48%,#050607 100%)"}} />
        <div style={{position:"absolute",left:"8%",right:"8%",top:"8%",height:"10%",background:"linear-gradient(180deg,#e9f2f2,#79898d)",opacity:.28,borderRadius:12}} />
        <div style={{position:"absolute",left:"5%",top:"18%",width:"90%",height:"58%",border:"3px solid #3b4a50",background:"linear-gradient(135deg,rgba(60,72,76,.25),rgba(5,8,9,.8))",boxShadow:"0 0 70px rgba(130,210,220,.08) inset"}} />
        {/* Garage clutter */}
        <div style={{position:"absolute",left:"10%",top:"27%",width:"19%",height:"9%",background:"#253239",border:"2px solid #56666b",transform:"rotate(-3deg)"}} />
        <div style={{position:"absolute",right:"9%",top:"31%",width:"20%",height:"7%",background:"#202b30",border:"2px solid #4e5d61",transform:"rotate(4deg)"}} />
        <div style={{position:"absolute",left:"13%",bottom:"20%",width:"16%",height:"13%",background:"#182126",border:"2px solid #3f4d51"}} />
        <div style={{position:"absolute",right:"12%",bottom:"19%",width:"18%",height:"16%",background:"#121a1e",border:"2px solid #3b494d"}} />

        {/* Rick-like central figure */}
        <div style={{position:"absolute",left:"50%",top:"46%",width:"22%",height:"31%",transform:"translate(-50%,-50%)"}}>
          <div style={{position:"absolute",left:"12%",top:"4%",width:"76%",height:"53%",background:"#a9d7e5",borderRadius:"52% 52% 44% 44%",border:"4px solid #dceff2",boxShadow:"0 0 35px rgba(120,220,255,.16)"}} />
          <div style={{position:"absolute",left:"28%",top:"25%",width:"13%",height:"9%",background:"#101417",borderRadius:"50%"}} />
          <div style={{position:"absolute",right:"28%",top:"25%",width:"13%",height:"9%",background:"#101417",borderRadius:"50%"}} />
          <div style={{position:"absolute",left:"39%",top:"42%",width:"23%",height:"3px",background:"#20272a",transform:"rotate(7deg)"}} />
          <div style={{position:"absolute",left:"20%",bottom:"0",width:"60%",height:"46%",background:"#8db7c5",borderRadius:"35% 35% 8% 8%",border:"4px solid #c9e4e9"}} />
        </div>

        {/* Lab glow */}
        <div style={{position:"absolute",left:"50%",top:"52%",width:"44%",height:"30%",transform:"translate(-50%,-50%)",background:"radial-gradient(circle,rgba(90,240,255,.18),transparent 65%)"}} />
      </AbsoluteFill>

      {t < 6 && (
        <div style={{position:"absolute",top:65,left:35,right:35,textAlign:"center",fontSize:42,fontWeight:900,textShadow:"0 3px 10px #000"}}>
          POV: ты случайно зашёл в гараж Рика
        </div>
      )}

      {t >= 3.2 && t < 6.5 && (
        <div style={{position:"absolute",bottom:135,left:50,right:50,textAlign:"center",fontSize:32,fontWeight:800,textShadow:"0 3px 8px #000"}}>
          «Э-э… ты кто вообще?»
        </div>
      )}

      {t >= 6 && t < 7.2 && (
        <div style={{position:"absolute",inset:0,background:"rgba(255,255,255,.12)"}} />
      )}

      {t >= 6.8 && (
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.48)"}}>
          <div style={{fontSize:58,fontWeight:900,textAlign:"center",maxWidth:"88%",textShadow:"0 4px 18px #000"}}>
            Теперь ты часть эксперимента.
          </div>
        </div>
      )}

      {t >= 8.7 && (
        <div style={{position:"absolute",bottom:78,width:"100%",textAlign:"center",fontSize:24,opacity:.9}}>
          — Рик, наверное
        </div>
      )}
    </AbsoluteFill>
  );
};
