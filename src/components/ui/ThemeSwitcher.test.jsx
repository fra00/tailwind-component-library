import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

describe("ThemeSwitcher (Integration Test)", () => {
  // Pulisce localStorage e il DOM prima di ogni test per garantire l'isolamento
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("should render with the default 'dark' theme", () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // L'etichetta dovrebbe indicare il tema scuro
    expect(screen.getByLabelText(/tema scuro/i)).toBeInTheDocument();

    // Il checkbox sottostante al ToggleSwitch non dovrebbe essere spuntato
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("should initialize with the 'light' theme from localStorage", () => {
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // L'etichetta dovrebbe indicare il tema chiaro
    expect(screen.getByLabelText(/tema chiaro/i)).toBeInTheDocument();

    // Il checkbox dovrebbe essere spuntato per il tema chiaro
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should toggle the theme from dark to light when clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const checkbox = screen.getByRole("checkbox");

    // Stato iniziale: dark
    expect(screen.getByLabelText(/tema scuro/i)).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    // Simula il click dell'utente
    await user.click(checkbox);

    // Stato finale: light
    expect(screen.getByLabelText(/tema chiaro/i)).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
