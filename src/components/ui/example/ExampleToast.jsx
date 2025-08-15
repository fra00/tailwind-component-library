import React, { useState, useCallback, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import Toast from "../Toast";
import Card from "../Card";
import CardHeader from "../CardHeader";
import Button from "../Button";
import CodeBlock from "../CodeBlock";
import "./ExampleToast.css";

// --- Sistema di gestione dei Toast (Provider e Hook) ---

const ToastContext = createContext(null);

/**
 * Provider che gestisce lo stato e la visualizzazione dei toast.
 * Va inserito una sola volta al livello più alto dell'applicazione.
 */
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((content, variant = "info") => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, content, variant }]);

    // Rimuove il toast dopo 5 secondi
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="toast-container">
          {toasts.map(({ id, content, variant }) => (
            <Toast key={id} variant={variant} onClose={() => removeToast(id)}>
              {content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

/**
 * Hook per accedere alla funzione `addToast` da qualsiasi componente.
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// --- Componente di Esempio ---

const ToastExampleContent = () => {
  const { addToast } = useToast();

  const codeSnippet = `
// 1. Avvolgi la tua app (o una parte di essa) con ToastProvider
// import { ToastProvider } from './ExampleToast'; // (o dove lo definisci)
// <ToastProvider>
//   <App />
// </ToastProvider>

// 2. Usa l'hook 'useToast' in qualsiasi componente figlio
import { useToast } from './ExampleToast';
import Button from './Button';

const MyComponent = () => {
  const { addToast } = useToast();

  return (
    <Button onClick={() => addToast('Operazione completata!', 'success')}>
      Mostra Toast di Successo
    </Button>
  );
};`;

  return (
    <Card>
      <CardHeader>Esempi di Toast</CardHeader>
      <p>
        Clicca i bottoni per lanciare notifiche toast. I toast scompaiono
        automaticamente dopo 5 secondi. Questo esempio usa un `ToastProvider` e
        un hook `useToast` per un'integrazione realistica.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => addToast("Questa è un'informazione utile.", "info")}
        >
          Info Toast
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            addToast("Operazione completata con successo!", "success")
          }
        >
          Success Toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            addToast("Attenzione, qualcosa potrebbe non andare.", "warning")
          }
        >
          Warning Toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            addToast("Errore grave durante il salvataggio.", "danger")
          }
        >
          Danger Toast
        </Button>
      </div>
      <CodeBlock code={codeSnippet} />
    </Card>
  );
};

/**
 * Componente di esempio completo che include il Provider.
 * Nella tua applicazione, il Provider andrebbe al livello più alto.
 */
const ExampleToast = () => {
  return (
    <ToastProvider>
      <ToastExampleContent />
    </ToastProvider>
  );
};

export default ExampleToast;
