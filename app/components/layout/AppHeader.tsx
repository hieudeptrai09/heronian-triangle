"use client";

export function AppHeader() {
  return (
    <header className="border-b border-zinc-800 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono">
          △ Number Theory Tools
        </h1>
        <p className="text-zinc-600 text-xs mt-0.5 tracking-widest uppercase font-mono">
          Gaussian integers · Heron's formula
        </p>
      </div>
    </header>
  );
}
