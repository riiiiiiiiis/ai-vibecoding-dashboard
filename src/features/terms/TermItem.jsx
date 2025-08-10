import React from "react";

export const TermItem = ({ title, desc }) => (
  <div className="flex flex-col gap-1">
    <div className="text-sm font-bold text-black">{title}</div>
    {desc && <div className="text-sm text-gray-800">{desc}</div>}
  </div>
);


