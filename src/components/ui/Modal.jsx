import React from "react";
import { Button } from "./Forms.jsx";
import { H3 } from "./Typography.jsx";

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-6" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex items-start justify-between gap-3">
          {title ? <H3 className="m-0">{title}</H3> : <span />}
          <Button variant="icon" aria-label="Закрыть модал" onClick={onClose}>✕</Button>
        </div>
        <div className="mt-3 text-sm text-gray-800 space-y-2">{children}</div>
      </div>
    </div>
  );
};


