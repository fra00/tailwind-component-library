import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";

// Componente di test per consumare il context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-display">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  // Pulisce localStorage e l'attributo sul DOM prima di ogni test
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    setItemSpy.mockClear();
  });

  it("should default to 'dark' theme if no theme is in localStorage", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Verifica che il tema nel context sia 'dark'
    expect(screen.getByTestId("theme-display")).toHaveTextContent("dark");
    // Verifica che l'attributo data-theme sia impostato su 'dark'
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    // Verifica che il tema sia stato salvato in localStorage
    expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
  });

  it("should initialize with the theme from localStorage if it exists", () => {
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Verifica che il tema nel context sia 'light'
    expect(screen.getByTestId("theme-display")).toHaveTextContent("light");
    // Verifica che l'attributo data-theme sia impostato su 'light'
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    // L'useEffect chiamerà di nuovo setItem con il valore inizializzato
    expect(setItemSpy).toHaveBeenCalledWith("theme", "light");
  });

  it("should toggle the theme from dark to light and back to dark", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });

    // Stato iniziale: dark
    expect(screen.getByTestId("theme-display")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
    setItemSpy.mockClear(); // Pulisce le chiamate dall'inizializzazione

    // Primo click: passa a light
    await act(async () => {
      await user.click(toggleButton);
    });

    expect(screen.getByTestId("theme-display")).toHaveTextContent("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(setItemSpy).toHaveBeenCalledWith("theme", "light");
    setItemSpy.mockClear();

    // Secondo click: torna a dark
    await act(async () => {
      await user.click(toggleButton);
    });

    expect(screen.getByTestId("theme-display")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
  });

  it("should provide theme and toggleTheme function to children", () => {
    let contextValue;
    const ConsumerComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <ConsumerComponent />
      </ThemeProvider>
    );

    expect(contextValue).toBeDefined();
    expect(contextValue).toHaveProperty("theme", "dark");
    expect(contextValue).toHaveProperty("toggleTheme");
    expect(typeof contextValue.toggleTheme).toBe("function");
  });
});
