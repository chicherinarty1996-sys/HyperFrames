import React from "react";
import { Composition, registerRoot } from "remotion";
import { HyperFramesDemo } from "./HyperFramesDemo";

export const RemotionRoot = () => (
  <Composition
    id="HyperFramesDemo"
    component={HyperFramesDemo}
    durationInFrames={300}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(RemotionRoot);
