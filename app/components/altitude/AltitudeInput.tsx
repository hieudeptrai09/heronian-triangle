"use client";

const SAFE_LIMIT = 94906265;

interface AltitudeInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  shake: boolean;
}

export function AltitudeInput({
  value,
  onChange,
  onSubmit,
  shake,
}: AltitudeInputProps) {
  const exceedsLimit = Number(value) > SAFE_LIMIT;

  return (
    <div className="border border-zinc-800 bg-zinc-900 p-4 sm:p-6 mb-8 rounded-lg">
      <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-3 font-mono">
        Altitude
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="e.g. 12, 60, 120 …"
          className={`
            w-full bg-zinc-950 border text-white text-lg px-4 py-3 rounded-lg
            placeholder-zinc-700 outline-none transition-colors font-mono
            ${shake ? "border-red-500 animate-pulse" : exceedsLimit ? "border-amber-500 focus:border-violet-400" : "border-zinc-700 focus:border-violet-400"}
          `}
        />
        <button
          onClick={onSubmit}
          className="w-full sm:w-auto px-8 py-3 bg-violet-500 text-white font-bold text-sm
                     tracking-widest uppercase hover:bg-violet-400 transition-colors
                     active:scale-95 whitespace-nowrap rounded-lg"
        >
          Generate
        </button>
      </div>
      <p className="mt-3 text-zinc-600 text-xs font-mono">
        Enter a positive integer altitude shared by the right-triangle family.
      </p>
      <p
        className={`mt-1 text-xs font-mono transition-colors ${exceedsLimit ? "text-amber-500" : "text-zinc-700"}`}
      >
        ⚠ Values above 94,906,265 (√MAX_SAFE_INTEGER) may produce incorrect
        results due to integer overflow.
      </p>
    </div>
  );
}
