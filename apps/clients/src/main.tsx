import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ClientesMfe from "./ClientsMfe.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClientesMfe />
    </BrowserRouter>
  </StrictMode>
);
