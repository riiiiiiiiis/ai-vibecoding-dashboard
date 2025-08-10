import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AIMonoSite from "../ai_mono_минималистичный_сайт_про_ии_flat_jet_brains_mono.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AIMonoSite />
  </React.StrictMode>
);


