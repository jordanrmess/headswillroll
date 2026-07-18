import React, { useState, useEffect, useRef } from "react";
import publicUrl from "./utils/publicUrl";

const HeadDisplay = ({ glassesMode, lightsOn }) => {
  const buildHeadPath = (direction) => {
    const folder = glassesMode ? "glasses_mode" : "heads";
    //if lights off, use invereted photos
    const suffix = !lightsOn ? "i" : "";
    return publicUrl(`${folder}/${direction}${suffix}.png`);
  };

  const [direction, setDirection] = useState("c");
  const [imageSrc, setImageSrc] = useState(() => buildHeadPath("c"));
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    setImageSrc(buildHeadPath(direction));

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, [glassesMode, lightsOn, direction]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      const deltaX = event.clientX - window.innerWidth / 2;
      const deltaY = event.clientY - window.innerHeight / 2;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      const nextDirection = [
        [angle >= -22.5 && angle < 22.5, "cr"],
        [angle >= 22.5 && angle < 67.5, "dr"],
        [angle >= 67.5 && angle < 112.5, "dc"],
        [angle >= 112.5 && angle < 157.5, "dl"],
        [
          (angle >= 157.5 && angle <= 180) || (angle >= -180 && angle < -157.5),
          "cl",
        ],
        [angle >= -157.5 && angle < -112.5, "ul"],
        [angle >= -112.5 && angle < -67.5, "uc"],
        [angle >= -67.5 && angle < -22.5, "ur"],
      ].find(([match]) => match)?.[1];

      if (nextDirection) {
        setDirection(nextDirection);
        setImageSrc(buildHeadPath(nextDirection));
      }

      resetTimeoutRef.current = setTimeout(() => {
        setImageSrc(buildHeadPath(direction));
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
  }, [glassesMode, lightsOn]);

  return (
    <img src={imageSrc} alt="Direction" className="w-36 h-36 object-contain" />
  );
};

export default HeadDisplay;
