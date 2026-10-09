import React from "react";
import publicUrl from "./utils/publicUrl";

const LightSwitchButton = ({ lightsOn, onToggle }) => {
  const switchImage = lightsOn
    ? "switches/on_switch_transparent.svg"
    : "switches/off_switch_transparent.svg";

  return (
    <div className="absolute top-0 right-0 z-30 p-2 sm:p-4">
      <img
        src={publicUrl(switchImage)}
        className="w-14 h-14 sm:w-20 sm:h-20 cursor-pointer"
        onClick={onToggle}
        alt="Toggle lights"
        draggable={false}
      />
    </div>
  );
};

export default LightSwitchButton;
