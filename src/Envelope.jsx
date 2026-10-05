import React, { useState } from "react";
import publicUrl from "./utils/publicUrl";
import Modal from "./Modal";

const Envelope = ({ envelopeOpen, lightsOn, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [labelColor, setLabelColor] = useState(undefined);
  const showOpenEnvelope = envelopeOpen || isHovered;

  return (
    <div>
      <div className="absolute bottom-0 left-0 z-10 flex flex-col items-center p-2 sm:p-4">
        <span
          style={{ fontFamily: '"Datatype", sans-serif', color: labelColor }}
          className={`text-sm font-medium leading-tight sm:text-base ${
            lightsOn ? "text-slate-800" : "text-slate-200"
          }`}
          onMouseEnter={() =>
            setLabelColor(`hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`)
          }
          onMouseLeave={() => setLabelColor(undefined)}
        >
          WORK WITH ME
        </span>
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
          className="w-16 h-16 sm:w-23.5 sm:h-23.5 cursor-pointer"
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
