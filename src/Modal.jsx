import React, { useEffect } from "react";

export default function Modal({ message, onClose }) {
  //Close modal on esc key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md grid grid-cols-1 grid-rows-1 drop-shadow-xl animate-pop-in">
        <div className="col-start-1 row-start-1 w-full h-full pointer-events-none">
          <img
            src="envelope/paper.svg"
            className="w-full h-full text-amber-50 fill-amber-50 stroke-stone-800 stroke-[3px]"
          />
        </div>
        {/* text content */}
        <div className="col-start-1 row-start-1 flex items-center justify-center px-10 text-center text-stone-800">
          <span
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            style={{ fontFamily: '"Datatype", sans-serif' }}
          >
            <a href={`mailto:${message}`} className="hover:underline">
              {message}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
