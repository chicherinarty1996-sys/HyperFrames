import React, { useMemo, useState } from "react";
import { Film, Image as ImageIcon, Type, Music2, Captions, Play, Download, Plus, Settings2, Sparkles } from "lucide-react";

const initialLayers = [
  { id: "media", label: "Media", icon: ImageIcon, value: "Main visual" },
  { id: "title", label: "Title", icon: Type, value: "Your story starts here" },
  { id: "captions", label: "Captions", icon: Captions, value: "Auto captions" },
  { id: "audio", label: "Audio", icon: Music2, value: "No audio selected" }
];

export default function App() {
  const [layers, setLayers] = useState(initialLayers);
  const [selected, setSelected] = useState("title");
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(15);
  const selectedLayer = useMemo(() => layers.find(l => l.id === selected), [layers, selected]);

  function addLayer() {
    const id = "layer-" + Date.now();
    setLayers(prev => [...prev, { id, label: "New layer", icon: Sparkles, value: "Untitled layer" }]);
    setSelected(id);
  }

  return (
    <main className="studio-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark">H</div><div><strong>HyperFrames</strong><span>Video Studio</span></div></div>
        <div className="project-name">Untitled vertical project</div>
        <div className="top-actions"><button className="ghost"><Settings2 size={16}/> Settings</button><button className="export"><Download size={16}/> Export MP4</button></div>
      </header>

      <section className="workspace">
        <aside className="panel left-panel">
          <div className="panel-heading"><span>Layers</span><button className="icon-btn" onClick={addLayer}><Plus size={17}/></button></div>
          <div className="layer-list">
            {layers.map(layer => {
              const Icon = layer.icon;
              return <button key={layer.id} className={selected === layer.id ? "layer active" : "layer"} onClick={() => setSelected(layer.id)}>
                <Icon size={17}/><span><b>{layer.label}</b><small>{layer.value}</small></span>
              </button>
            })}
          </div>
          <div className="skill-card"><Sparkles size={16}/><div><b>AI workflow</b><small>Design + motion skills enabled</small></div></div>
        </aside>

        <section className="canvas-area">
          <div className="canvas-toolbar"><span>9:16 • 1080 × 1920</span><span>00:00 / {String(duration).padStart(2,"0")}:00</span></div>
          <div className="preview-stage">
            <div className={playing ? "video-frame playing" : "video-frame"}>
              <div className="grain"></div>
              <div className="preview-copy"><small>HYPERFRAMES</small><h1>{selectedLayer?.value || "Your story starts here"}</h1><p>Build a polished vertical video.</p></div>
            </div>
          </div>
          <div className="transport">
            <button className="play-btn" onClick={() => setPlaying(v => !v)}>{playing ? "Pause" : <><Play size={15} fill="currentColor"/> Play</>}</button>
            <input aria-label="Timeline" type="range" min="5" max="60" value={duration} onChange={e => setDuration(Number(e.target.value))}/>
            <span>{duration}s</span>
          </div>
        </section>

        <aside className="panel right-panel">
          <div className="panel-heading"><span>Inspector</span><Sparkles size={16}/></div>
          <label>Layer name<input value={selectedLayer?.label || ""} readOnly /></label>
          <label>Content<textarea value={selectedLayer?.value || ""} onChange={e => setLayers(prev => prev.map(l => l.id === selected ? {...l, value:e.target.value} : l))}/></label>
          <label>Animation<select defaultValue="smooth"><option value="smooth">Smooth reveal</option><option value="fade">Fade</option><option value="scale">Scale in</option></select></label>
          <div className="render-card"><Film size={18}/><div><b>Remotion render</b><small>Ready for MP4 export pipeline</small></div></div>
        </aside>
      </section>
    </main>
  );
}