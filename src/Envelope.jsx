import React, { useEffect, useRef, useState } from "react";
import publicUrl from "./utils/publicUrl";
import Modal from "./Modal";

const Envelope = ({ envelopeOpen, lightsOn, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const showOpenEnvelope = envelopeOpen || isHovered;
  const prevShowOpenRef = useRef(showOpenEnvelope);

  useEffect(() => {
    if (prevShowOpenRef.current === showOpenEnvelope) return;

    setAnimationClass(
      showOpenEnvelope ? "envelope-anim-open" : "envelope-anim-close",
    );
    prevShowOpenRef.current = showOpenEnvelope;

    const timer = window.setTimeout(() => setAnimationClass(""), 1000);
    return () => window.clearTimeout(timer);
  }, [showOpenEnvelope]);

  return (
    <div>
      <div className="absolute top-0 left-0 z-10 p-8 pt-44">
        <img
          src={publicUrl(
            showOpenEnvelope
              ? lightsOn
                ? "envelope/envelope_open.svg"
                : "envelope/envelope_open_inverse.svg"
              : lightsOn
                ? "envelope/envelope_closed.svg"
                : "envelope/envelope_closed_inverse.svg",
          )}
          className={`relative w-35 h-35 cursor-pointer hover:scale-110 ${animationClass}`}
          onClick={onToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          draggable={false}
        />
      </div>
      {envelopeOpen && (
        <Modal
          message="jordanrmess(at)gmail(dot)com"
          lightsOn={lightsOn}
          onClose={onToggle}
        />
      )}
    </div>
  );
};

export default Envelope;
