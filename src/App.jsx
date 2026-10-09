import React, { useState } from "react";
import GlassesToggle from "./GlassesToggle";
import Envelope from "./Envelope";
import HeadDisplay from "./HeadDisplay";
import LightSwitchButton from "./LightSwitchButton";
import ContactLink from "./ContactLink";
import { PlayProvider, CanToggleElement } from "@playhtml/react";

const BG_COLOR_KEY = "bgColor";
const DEFAULT_BG_COLOR = "rgb(255, 102, 102)";

const App = () => {
  const [glassesMode, setGlassesMode] = useState(true);
  const [lightSwitch, flipLightSwitch] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [litBgColor, setLitBgColor] = useState(() => {
    try {
      return localStorage.getItem(BG_COLOR_KEY) || DEFAULT_BG_COLOR;
    } catch {
      return DEFAULT_BG_COLOR;
    }
  });
  const bgColor = lightSwitch ? litBgColor : "#000000";

  const randomizeBgColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 100%, 70%)`;
    setLitBgColor(color);
    try {
      localStorage.setItem(BG_COLOR_KEY, color);
    } catch {
      // ignore storage failures
    }
  };

  return (
    <PlayProvider initOptions={{ cursors: { enabled: true } }}>
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-6">
          <HeadDisplay
            glassesMode={glassesMode}
            lightsOn={lightSwitch}
            onClick={randomizeBgColor}
          />
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
