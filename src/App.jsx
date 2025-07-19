import React from "react";
import Toolbar from "./components/ui/Toolbar";
import Card from "./components/ui/Card";
import ShowCase from "./components/ui/ShowCase";

function App() {
  return (
    <>
      <Toolbar title="Libreria Componenti" showThemeSwitcher={true} />
      <main className="app-container">
        <Card>
          <h1>Libreria Componenti React</h1>
          <p>
            Benvenuto! Usa lo switcher nella toolbar in alto a destra per
            cambiare il tema.
          </p>
        </Card>
        <ShowCase />
      </main>
    </>
  );
}

export default App;
