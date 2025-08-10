import React from "react";

export const GuideItem = ({ title, desc, time }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
    <div>
      <h4 className="text-sm font-bold text-black">{title}</h4>
      <p className="mt-1 text-sm text-gray-800">{desc}</p>
    </div>
    <div className="text-xs text-gray-500 whitespace-nowrap">{time}</div>
  </div>
);


