import React from "react";

export const LessonCard = ({ title, time, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex flex-col items-center w-24 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-black/70 rounded"
    aria-label={`Открыть урок: ${title}`}
  >
    <div className="w-20 h-20 rounded-full border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200 flex items-center justify-center text-center p-2">
      <span className="text-[10px] font-bold text-gray-900 leading-tight break-words">{title}</span>
    </div>
    <div className="mt-2 text-[10px] text-gray-600">{time}</div>
  </button>
);