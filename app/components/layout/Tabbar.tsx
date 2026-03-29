"use client";

export type Tab = "pythagorean" | "heronian" | "altitude" | "display";

const TABS: { id: Tab; label: string }[] = [
  { id: "pythagorean", label: "Pythagorean Triples" },
  { id: "heronian", label: "Heronian Triangles" },
  { id: "altitude", label: "Altitude Triangles" },
  { id: "display", label: "Display" },
];

interface TabBarProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <div className="border-b border-zinc-800 px-4 sm:px-8 flex gap-0">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`
            px-4 py-3 text-sm font-mono tracking-wide border-b-2 transition-colors
            ${
              activeTab === id
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
