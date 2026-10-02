import React, { useState } from "react";
import GlassesToggle from "./GlassesToggle";
import Envelope from "./Envelope";
import HeadDisplay from "./HeadDisplay";
import LightSwitchButton from "./LightSwitchButton";
import ContactLink from "./ContactLink";
import { PlayProvider, CanToggleElement } from "@playhtml/react";

const App = () => {
  const [glassesMode, setGlassesMode] = useState(true);
  const [lightSwitch, flipLightSwitch] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const bgColor = lightSwitch ? "rgb(255, 102, 102)" : "#000000";

  return (
    <PlayProvider initOptions={{ cursors: { enabled: true } }}>
      <div
        className="relative h-screen w-screen"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-6">
          <HeadDisplay glassesMode={glassesMode} lightsOn={lightSwitch} />
          <GlassesToggle
            checked={glassesMode}
            onChange={setGlassesMode}
            lightsOn={lightSwitch}
          />
        </div>

        <LightSwitchButton
          lightsOn={lightSwitch}
          onToggle={() => flipLightSwitch((prev) => !prev)}
        />
        <Envelope
          envelopeOpen={envelopeOpen}
          lightsOn={lightSwitch}
          onToggle={() => setEnvelopeOpen((prev) => !prev)}
        />
        <div
          className={`pointer-events-none fixed inset-0 z-50 backdrop-blur-[2px] transition-opacity duration-300 ${
            glassesMode ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
      </div>
    </PlayProvider>
  );
};

export default App;
