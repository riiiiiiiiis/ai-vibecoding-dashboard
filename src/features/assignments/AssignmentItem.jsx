import React from "react";
import { Badge, LinkA } from "../../components/ui/Primitives.jsx";
import { Button } from "../../components/ui/Forms.jsx";

export const AssignmentItem = ({ title, desc, due, status, onSubmit }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
    <div>
      <h4 className="text-sm font-bold text-black">{title}</h4>
      <p className="mt-1 text-sm text-gray-800">{desc}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
        <Badge>{status}</Badge>
        <span>Сдать до: {due}</span>
        <LinkA href="#" className="text-xs">Скачать шаблон</LinkA>
      </div>
    </div>
    <div className="flex gap-2">
      <Button variant="secondary" onClick={() => onSubmit(title)}>Сдать</Button>
    </div>
  </div>
);


