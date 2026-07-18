import React, { useState, useEffect, useRef } from "react";
import publicUrl from "./utils/publicUrl";

const HeadDisplay = ({ glassesMode, lightsOn }) => {
  const [imageSrc, setImageSrc] = useState(() => publicUrl("glasses_mode/c.png"));
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    const folder = glassesMode ? "glasses_mode" : "heads";
    setImageSrc(publicUrl(`${folder}/c.png`));

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, [glassesMode]);

  useEffect(() => {
    const folder = glassesMode ? "glasses_mode" : "heads";

    const handleMouseMove = (event) => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      const deltaX = event.clientX - window.innerWidth / 2;
      const deltaY = event.clientY - window.innerHeight / 2;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      const direction = [
        [angle >= -22.5 && angle < 22.5, "cr"],
        [angle >= 22.5 && angle < 67.5, "dr"],
        [angle >= 67.5 && angle < 112.5, "dc"],
        [angle >= 112.5 && angle < 157.5, "dl"],
        [(angle >= 157.5 && angle <= 180) || (angle >= -180 && angle < -157.5), "cl"],
        [angle >= -157.5 && angle < -112.5, "ul"],
        [angle >= -112.5 && angle < -67.5, "uc"],
        [angle >= -67.5 && angle < -22.5, "ur"],
      ].find(([match]) => match)?.[1];

      if (direction) {
        setImageSrc(publicUrl(`${folder}/${direction}.png`));
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
    <img
      src={imageSrc}
      alt="Direction"
      className={`w-36 h-36 object-contain ${lightsOn ? "" : "invisible"}`}
    />
  );
};

export default HeadDisplay;
