import React, { useId } from "react";

const GlassesToggle = ({ checked, onChange, lightsOn }) => {
  const labelId = useId();

  return (
    <div
      className="flex max-w-[min(100%-2rem,24rem)] flex-col items-center gap-2 px-2 sm:flex-row sm:gap-4"
      role="group"
      aria-labelledby={labelId}
    >
      <span
        id={labelId}
        className={`shrink-0 text-center text-sm font-medium leading-tight sm:text-base ${
          lightsOn ? "text-slate-800" : "text-slate-200"
        }`}
      >
TOGGLE GLASSES      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        className={`relative h-7 w-12 shrink-0 rounded-full border-0 p-0 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
          checked ? "bg-emerald-500" : "bg-slate-300"
        } ${lightsOn ? "focus:ring-offset-white" : "focus:ring-offset-black"}`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`pointer-events-none absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default GlassesToggle;
