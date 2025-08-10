import React from "react";

export const TermItem = ({ title, desc }) => (
  <details className="group">
    <summary className="flex items-center justify-between cursor-pointer list-none marker:content-none select-none text-sm">
      <span className="font-bold text-gray-900">{title}</span>
      <svg
        className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </summary>
    {desc && <div className="mt-2 text-sm text-gray-800">{desc}</div>}
  </details>
);


