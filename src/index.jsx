import React from "react";
import {Composition, registerRoot} from "remotion";
import {POVGarage} from "./POVGarage.jsx";

const Root = () => (
  <Composition
    id="POVGarage"
    component={POVGarage}
    durationInFrames={300}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
