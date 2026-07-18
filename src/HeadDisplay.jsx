import React, { useState, useEffect, useRef } from "react";
import publicUrl from "./utils/publicUrl";

const HEAD_DIRECTIONS = ["c", "cr", "dr", "dc", "dl", "cl", "ul", "uc", "ur"];

const HeadDisplay = ({ glassesMode, lightsOn }) => {
  const buildHeadPath = (direction) => {
    const folder = glassesMode ? "glasses_mode" : "heads";
    const suffix = !lightsOn ? "i" : "";
    return publicUrl(`${folder}/${direction}${suffix}.png`);
  };

  const [direction, setDirection] = useState("c");
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    const cachedImages = [];

    HEAD_DIRECTIONS.forEach((dir) => {
      ["", "i"].forEach((suffix) => {
        cachedImages.push(
          Object.assign(new Image(), {
            src: publicUrl(`heads/${dir}${suffix}.png`),
          }),
        );
      });
    });

    HEAD_DIRECTIONS.forEach((dir) => {
      ["", "i"].forEach((suffix) => {
        cachedImages.push(
          Object.assign(new Image(), {
            src: publicUrl(`glasses_mode/${dir}${suffix}.png`),
          }),
        );
      });
    });

    return () => {
      cachedImages.length = 0;
    };
  }, []);

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
      }

      resetTimeoutRef.current = setTimeout(() => {
        setDirection("c");
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
  }, []);

  return (
    <img
      src={buildHeadPath(direction)}
      alt="Direction"
      className="w-36 h-36 object-contain"
    />
  );
};

export default HeadDisplay;
