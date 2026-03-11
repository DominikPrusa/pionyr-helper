import React, { useMemo, useState } from "react";
import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WORDS = [
  "shadow",
  "ember",
  "cipher",
  "signal",
  "matrix",
  "pixel",
  "raven",
  "echo",
  "vector",
  "nova",
  "orbit",
  "ghost",
];

const CIPHER_OPTIONS = [
  { value: "caesar", label: "Caesarova (posunutá abeceda)" },
  { value: "mobilni", label: "Mobilní" },
  { value: "prvniposledni", label: "První a poslední" },
  { value: "presmycka", label: "Přesmyčka" },
  { value: "pozpatku", label: "Slovo pozpátku" },
  { value: "mrizka", label: "Mřížka" },
];

const getResultPlaceholder = (cipher: string, text: string) => {
  if (!text.trim()) return "Výsledek se zobrazí tady.";

  switch (cipher) {
    case "caesar":
      return `Caesar result for: ${text}`;
    case "mobilni":
      return `Mobilní result for: ${text}`;
    case "prvniposledni":
      return `Prvni a poslední result for: ${text}`;
    case "presmycka":
      return `Přesmyčka result for: ${text}`;
    case "pozpatku":
      return `Pozpátku result for: ${text}`;
    case "mrizka":
      return `Mřížka result for: ${text}`;
    default:
      return "Výsledek se zobrazí tady.";
  }
};

const Ciphers = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [selectedCipher, setSelectedCipher] = useState("caesar");

  const resultText = useMemo(
    () => getResultPlaceholder(selectedCipher, text),
    [selectedCipher, text],
  );

  const handleRandomWord = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setText(randomWord);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-5 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md lg:max-w-2xl xl:max-w-3xl">
        <div className="rounded-[2rem] bg-[#fcfcfc] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-4 lg:p-5">
          <div className="space-y-4 rounded-[1.75rem] bg-[#f7f7f7] p-4 sm:p-5 lg:p-6">
            <div>
              <p className="mb-1 text-sm font-semibold text-zinc-500">
                Zadejte text
              </p>
              <p className="text-xs text-zinc-400">
                Vyber šifru a ihned uvidíš výsledek.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Input"
                rows={2}
                className="min-h-[58px] flex-1 resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-black/15 focus:ring-2 focus:ring-black/5"
              />

              <button
                type="button"
                onClick={handleRandomWord}
                aria-label="Generate random word"
                className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white text-zinc-800 shadow-sm transition hover:bg-zinc-50 active:scale-[0.98]"
              >
                <Dices className="h-5 w-5" />
              </button>
            </div>

            <div>
              <select
                value={selectedCipher}
                onChange={(e) => setSelectedCipher(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-zinc-800 outline-none transition focus:border-black/15 focus:ring-2 focus:ring-black/5"
              >
                {CIPHER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-h-[320px] rounded-[1.75rem] border border-black/5 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-zinc-500">
                Výsledek
              </p>
              <div className="min-h-[240px] whitespace-pre-wrap break-words overflow-wrap-anywhere rounded-2xl border border-black/5 bg-[#fafafa] p-4 text-base leading-relaxed text-zinc-800 sm:min-h-[260px]">
                {resultText}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 grow-0 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Zpět na menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ciphers;
