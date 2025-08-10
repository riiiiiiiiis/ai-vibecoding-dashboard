import React from "react";

export const TermItem = ({ title, desc }) => (
  <details className="group border-b border-gray-100 last:border-b-0">
    <summary className="w-full flex items-center justify-between text-left py-2 px-1 rounded-md hover:bg-gray-50 transition-colors cursor-pointer list-none marker:content-none select-none text-sm focus:outline-none">
      <span className="font-bold text-black text-sm">{title}</span>
      <svg
        className="h-4 w-4 text-gray-500 transition-transform duration-200 group-open:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </summary>
    {desc && <div className="text-sm text-gray-800 pb-2 pl-1">{desc}</div>}
  </details>
);


