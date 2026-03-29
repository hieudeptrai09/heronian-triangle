"use client";

interface PythagoreanInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  shake: boolean;
}

export function PythagoreanInput({
  value,
  onChange,
  onSubmit,
  shake,
}: PythagoreanInputProps) {
  return (
    <div className="border border-zinc-800 bg-zinc-900 p-4 sm:p-6 mb-8 rounded-lg">
      <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-3 font-mono">
        Hypotenuse
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="e.g. 5, 25, 65, 325 …"
          className={`
            w-full bg-zinc-950 border text-white text-lg px-4 py-3 rounded-lg
            placeholder-zinc-700 outline-none focus:border-sky-400 transition-colors font-mono
            ${shake ? "border-red-500 animate-pulse" : "border-zinc-700"}
          `}
        />
        <button
          onClick={onSubmit}
          className="w-full sm:w-auto px-8 py-3 bg-sky-500 text-white font-bold text-sm
                     tracking-widest uppercase hover:bg-sky-400 transition-colors
                     active:scale-95 whitespace-nowrap rounded-lg"
        >
          Generate
        </button>
      </div>
      <p className="mt-3 text-zinc-600 text-xs font-mono">
        Must be a product of Pythagorean primes (≡ 1 mod 4), e.g. 5, 13, 25, 65,
        325 …
      </p>
    </div>
  );
}
