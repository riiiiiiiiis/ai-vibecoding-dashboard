import React from "react";

export const DividerSolid = ({ className = "" }) => (
  <div className={`border-b border-gray-200 ${className}`} />
);

export const DividerDashed = ({ className = "" }) => (
  <div className={`border-t border-dashed border-gray-300 ${className}`} />
);

export const Card = ({ children, className = "", ...props }) => (
  <section className={`bg-white border border-gray-200 rounded-lg p-6 sm:p-8 ${className}`} {...props}>
    {children}
  </section>
);

export const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-xs text-gray-600 border border-gray-300 rounded ${className}`}>
    {children}
  </span>
);

export const LinkA = ({ href, children, className = "" }) => (
  <a href={href} className={`accent-link ${className}`}>
    {children}
  </a>
);


