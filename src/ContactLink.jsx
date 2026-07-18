import React from "react";

const ContactLink = ({ lightsOn }) => (
  <p
    className={`absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center text-sm sm:bottom-6 sm:text-base ${
      lightsOn ? "text-slate-800" : "text-slate-200"
    }`}
  >
    <a
      href="mailto:jordanrmess@gmail.com"
      className="underline underline-offset-2 hover:opacity-80"
      style={{ fontFamily: '"Datatype", sans-serif' }}
    >
      jordanrmess@gmail.com
    </a>
  </p>
);

export default ContactLink;
