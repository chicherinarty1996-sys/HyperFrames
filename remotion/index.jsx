import React from "react";
import {Composition, registerRoot} from "remotion";
import {RickMortyMemes, RICK_MORTY_DURATION} from "../src/RickMortyMemes";

const Root = () => (
  <Composition
    id="RickMortyMemes"
    component={RickMortyMemes}
    durationInFrames={RICK_MORTY_DURATION}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
