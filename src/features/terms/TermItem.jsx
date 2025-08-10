import React from "react";

export const TermItem = ({ title, desc }) => (
  <details className="group rounded-md border border-gray-200 bg-white p-3">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm">
      <span className="text-gray-900 font-bold">{title}</span>
      <span className="text-xs text-gray-500 group-open:hidden">Показать</span>
      <span className="text-xs text-gray-500 hidden group-open:inline">Скрыть</span>
    </summary>
    {desc && <div className="mt-2 text-sm text-gray-800">{desc}</div>}
  </details>
);


