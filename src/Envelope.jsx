import React from "react";
import publicUrl from "./utils/publicUrl";
import Modal from "./Modal";

const Envelope = ({ envelopeOpen, onToggle }) => (
  <div>
    <div className="absolute top-0 left-0 z-10 p-8 pt-44">
      {" "}
      <img
        src={
          envelopeOpen
            ? "envelope/envelope_open.svg"
            : "envelope/envelope_closed.svg"
        }
        className="relative w-35 h-35 cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={onToggle}
      />
    </div>
    {envelopeOpen && (
      <Modal message="jordan r mess at  gmail dot com" onClose={onToggle} />
    )}
  </div>
);

export default Envelope;
