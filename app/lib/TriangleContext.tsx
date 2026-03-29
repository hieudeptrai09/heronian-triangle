"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface SelectedTriangle {
  sides: [number, number, number]; // always sorted [a, b, c] smallest to largest
  label: string; // e.g. "Pythagorean", "Heronian", "Altitude"
}

interface TriangleContextValue {
  selected: SelectedTriangle | null;
  showTriangle: (t: SelectedTriangle) => void;
}

const TriangleContext = createContext<TriangleContextValue>({
  selected: null,
  showTriangle: () => {},
});

export function TriangleProvider({
  children,
  onShow,
}: {
  children: ReactNode;
  onShow: () => void;
}) {
  const [selected, setSelected] = useState<SelectedTriangle | null>(null);

  function showTriangle(t: SelectedTriangle) {
    setSelected(t);
    onShow();
  }

  return (
    <TriangleContext.Provider value={{ selected, showTriangle }}>
      {children}
    </TriangleContext.Provider>
  );
}

export function useTriangle() {
  return useContext(TriangleContext);
}
