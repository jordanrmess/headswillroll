import React, { useState } from "react";
import publicUrl from "./utils/publicUrl";
import Modal from "./Modal";

const Envelope = ({ envelopeOpen, lightsOn, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showOpenEnvelope = envelopeOpen || isHovered;

  return (
    <div>
      <div className="absolute top-0 left-0 z-10 p-4 pl-22">
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
          className="w-17.5 h-17.5 cursor-pointer"
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
