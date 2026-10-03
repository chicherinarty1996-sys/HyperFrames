import React from "react";
import {Composition, registerRoot} from "remotion";
import {RickMortyMemes} from "../src/RickMortyMemes";

const Root = () => (
  <>
    <Composition
      id="RickMortyMemes"
      component={RickMortyMemes}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(Root);
