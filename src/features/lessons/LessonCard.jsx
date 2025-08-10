import React from "react";

export const LessonCard = ({ title, time, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-40 shrink-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/70 rounded-md"
    aria-label={`Открыть урок: ${title}`}
  >
    <div className="h-52 border border-gray-200 rounded-md bg-white p-3 flex flex-col justify-between group-hover:bg-gray-50">
      <div className="text-sm font-bold text-gray-900 leading-snug break-words">{title}</div>
      <div className="text-xs text-gray-600">{time}</div>
    </div>
  </button>
);