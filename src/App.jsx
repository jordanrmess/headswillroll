import React, { useState, useEffect } from "react";

const App = () => {
  const [imageSrc, setImageSrc] = useState("glasses_mode/c.png");
  const [timeoutId, setTimeoutId] = useState(null);
  const [glassesMode, setGlassesMode] = useState(true);
  const [lightSwitch, flipLightSwitch] = useState(true);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
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

      const id = setTimeout(() => {
        setImageSrc(`${folder}/c.png`);
      }, 2000); // 2000ms delay
      setTimeoutId(id);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [glassesMode, timeoutId]);

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
        <button
          className={`bg-transparent absolute bottom-4 px-4 py-2 rounded focus:outline-none ${
            lightSwitch ? "bg-transparent text-black" : "bg-black! text-white"
          }`}
          onClick={() => setGlassesMode(!glassesMode)}
        >
          toggles glasses
        </button>
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
