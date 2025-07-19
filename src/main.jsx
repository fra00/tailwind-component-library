import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utilities.css"; // Importa le classi di utility per la griglia
import "./App.css"; // Aggiungi questa riga per caricare i temi
import App from "./App.jsx";
import { ThemeProvider } from "./components/ui/context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
