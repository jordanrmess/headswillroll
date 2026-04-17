import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [imageSrc, setImageSrc] = useState("glasses_mode/c.png");
  const resetTimeoutRef = useRef(null);
  const [glassesMode, setGlassesMode] = useState(true);
  const [lightSwitch, flipLightSwitch] = useState(true);

  // Switch asset set immediately; clear pending "return to center" timer
  useEffect(() => {
    const folder = glassesMode ? "glasses_mode" : "heads";
    setImageSrc(`${folder}/c.png`);
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
        setImageSrc(`${folder}/cr.png`);
      } else if (angle >= 22.5 && angle < 67.5) {
        setImageSrc(`${folder}/dr.png`);
      } else if (angle >= 67.5 && angle < 112.5) {
        setImageSrc(`${folder}/dc.png`);
      } else if (angle >= 112.5 && angle < 157.5) {
        setImageSrc(`${folder}/dl.png`);
      } else if (
        (angle >= 157.5 && angle <= 180) ||
        (angle >= -180 && angle < -157.5)
      ) {
        setImageSrc(`${folder}/cl.png`);
      } else if (angle >= -157.5 && angle < -112.5) {
        setImageSrc(`${folder}/ul.png`);
      } else if (angle >= -112.5 && angle < -67.5) {
        setImageSrc(`${folder}/uc.png`);
      } else if (angle >= -67.5 && angle < -22.5) {
        setImageSrc(`${folder}/ur.png`);
      }

      resetTimeoutRef.current = setTimeout(() => {
        setImageSrc(`${folder}/c.png`);
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
        <div
          className="absolute top-4 left-1/2 z-10 flex max-w-[min(100%-2rem,24rem)] -translate-x-1/2 flex-col items-center gap-2 px-2 sm:top-6 sm:flex-row sm:gap-4"
          role="group"
          aria-labelledby="glasses-toggle-label"
        >
          <span
            id="glasses-toggle-label"
            className={`shrink-0 text-center text-sm font-medium leading-tight sm:text-base ${
              lightSwitch ? "text-slate-800" : "text-slate-200"
            }`}
          >
            toggle glasses
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={glassesMode}
            aria-labelledby="glasses-toggle-label"
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
              glassesMode ? "bg-emerald-500" : "bg-slate-300"
            } ${lightSwitch ? "focus:ring-offset-white" : "focus:ring-offset-black"}`}
            onClick={() => setGlassesMode(!glassesMode)}
          >
            <span
              className={`pointer-events-none absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                glassesMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 p-8">
        <img
          src={
            lightSwitch
              ? "/switches/on_switch_transparent.svg"
              : "/switches/off_switch_transparent.svg"
          }
          className="w-24 h-24 cursor-pointer"
          onClick={() => flipLightSwitch(!lightSwitch)}
        />
      </div>
    </div>
  );
};

export default App;
