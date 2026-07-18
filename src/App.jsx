import React, { useState } from "react";
import GlassesToggle from "./GlassesToggle";
import HeadDisplay from "./HeadDisplay";
import TopTitle from "./TopTitle";
import LightSwitchButton from "./LightSwitchButton";
import ContactLink from "./ContactLink";

const App = () => {
  const [glassesMode, setGlassesMode] = useState(true);
  const [lightSwitch, flipLightSwitch] = useState(true);

  return (
    <div
      className={`relative h-screen w-screen ${
        lightSwitch ? "bg-white" : "bg-black"
      }`}
    >

      <div className="flex min-h-full flex-col items-center justify-center gap-6">
          <TopTitle lightsOn={lightSwitch} />
        <HeadDisplay glassesMode={glassesMode} lightsOn={lightSwitch} />
        <GlassesToggle
          checked={glassesMode}
          onChange={setGlassesMode}
          lightsOn={lightSwitch}
        />
      </div>

      <LightSwitchButton
        lightsOn={lightSwitch}
        onToggle={() => flipLightSwitch(!lightSwitch)}
      />

      <ContactLink lightsOn={lightSwitch} />

      <div
        className={`pointer-events-none fixed inset-0 z-50 backdrop-blur-[2px] transition-opacity duration-300 ${
          glassesMode ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

export default App;
