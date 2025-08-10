import React from "react";

export const H2 = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold text-black ${className}`}>{children}</h2>
);

export const H3 = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold text-black ${className}`}>{children}</h3>
);

export const SectionHeading = ({ children, className = "" }) => (
  <div className={`text-xs uppercase font-bold text-gray-500 tracking-wider ${className}`}>{children}</div>
);


