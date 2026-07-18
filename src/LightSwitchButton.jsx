import React from "react";
import publicUrl from "./utils/publicUrl";

const LightSwitchButton = ({ lightsOn, onToggle }) => (
  <div className="absolute top-0 left-0 z-10 p-8">
    <img
      src={publicUrl(
        lightsOn
          ? "switches/on_switch_transparent.svg"
          : "switches/off_switch_transparent.svg",
      )}
      className="w-20 h-20 cursor-pointer"
      onClick={onToggle}
      alt="Toggle lights"
    />
  </div>
);

export default LightSwitchButton;
