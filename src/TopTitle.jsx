import React from "react";
import { LoadingText } from "./LoadingTitle";

const TopTitle = ({ lightsOn }) => (
  <h1
    className={`absolute left-1/2 top-6 z-10 -translate-x-1/2 text-4xl font-semibold tracking-[0.08em] ${
      lightsOn ? "text-slate-900" : "text-slate-100"
    }`}
    style={{ fontFamily: '"Jacquarda Bastarda 9", sans-serif' }}
  >
    <LoadingText baseText="hello" />
  </h1>
);

export default TopTitle;
