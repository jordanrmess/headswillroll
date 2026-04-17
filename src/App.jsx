import React, { useState, useEffect, useRef } from "react";
import GlassesToggle from "./GlassesToggle";

const publicUrl = (path) => {
  const p = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL ?? "/";
  return base.endsWith("/") ? `${base}${p}` : `${base}/${p}`;
};

const App = () => {
  const [imageSrc, setImageSrc] = useState(() =>
    publicUrl("glasses_mode/c.png"),
  );
  const resetTimeoutRef = useRef(null);
  const [glassesMode, setGlassesMode] = useState(true);
  const [lightSwitch, flipLightSwitch] = useState(true);

  // Switch asset set immediately; clear pending "return to center" timer
  useEffect(() => {
    const folder = glassesMode ? "glasses_mode" : "heads";
    setImageSrc(publicUrl(`${folder}/c.png`));
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, [glassesMode]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const deltaX = event.clientX - viewportCenterX;
      const deltaY = event.clientY - viewportCenterY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      const folder = glassesMode ? "glasses_mode" : "heads";

      if (angle >= -22.5 && angle < 22.5) {
        setImageSrc(publicUrl(`${folder}/cr.png`));
      } else if (angle >= 22.5 && angle < 67.5) {
        setImageSrc(publicUrl(`${folder}/dr.png`));
      } else if (angle >= 67.5 && angle < 112.5) {
        setImageSrc(publicUrl(`${folder}/dc.png`));
      } else if (angle >= 112.5 && angle < 157.5) {
        setImageSrc(publicUrl(`${folder}/dl.png`));
      } else if (
        (angle >= 157.5 && angle <= 180) ||
        (angle >= -180 && angle < -157.5)
      ) {
        setImageSrc(publicUrl(`${folder}/cl.png`));
      } else if (angle >= -157.5 && angle < -112.5) {
        setImageSrc(publicUrl(`${folder}/ul.png`));
      } else if (angle >= -112.5 && angle < -67.5) {
        setImageSrc(publicUrl(`${folder}/uc.png`));
      } else if (angle >= -67.5 && angle < -22.5) {
        setImageSrc(publicUrl(`${folder}/ur.png`));
      }

      resetTimeoutRef.current = setTimeout(() => {
        setImageSrc(publicUrl(`${folder}/c.png`));
        resetTimeoutRef.current = null;
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, [glassesMode]);

  return (
    <div
      className={`relative h-screen w-screen ${
        lightSwitch ? "bg-white" : "bg-black"
      }`}
    >
      <div className="flex justify-center items-center h-full">
        <img
          src={imageSrc}
          alt="Direction"
          className={`w-36 h-36 object-contain ${
            lightSwitch ? "" : "invisible"
          }`}
        />
        <GlassesToggle
          checked={glassesMode}
          onChange={setGlassesMode}
          lightsOn={lightSwitch}
        />
      </div>
      <div className="absolute top-0 left-0 p-8">
        <img
          src={
            lightSwitch
              ? publicUrl("switches/on_switch_transparent.svg")
              : publicUrl("switches/off_switch_transparent.svg")
          }
          className="w-24 h-24 cursor-pointer"
          onClick={() => flipLightSwitch(!lightSwitch)}
        />
      </div>
    </div>
  );
};

export default App;
