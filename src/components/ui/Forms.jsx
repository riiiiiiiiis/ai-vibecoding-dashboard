import React from "react";

export const Button = ({ variant = "primary", className = "", ...props }) => {
  const base = "text-sm font-bold rounded-md focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "px-5 py-2 text-white bg-gray-900 hover:bg-gray-700 focus:ring-gray-900 disabled:opacity-50",
    secondary:
      "px-4 py-2 text-gray-900 bg-gray-100 hover:bg-gray-200",
    icon:
      "p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
};

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 ${className}`}
    {...props}
  />
);

export const TextArea = ({ className = "", rows = 4, ...props }) => (
  <textarea
    className={`w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 ${className}`}
    rows={rows}
    {...props}
  />
);


