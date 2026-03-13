import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WORDS_BY_DIFFICULTY } from "../utils/RandomWords";
import { Dices } from "lucide-react";
import { removeCzechDiacritics } from "../utils/Ciphers";

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Lehká" },
  { value: "medium", label: "Střední" },
  { value: "hard", label: "Těžká" },
  { value: "extreme", label: "Extrémní" },
];

const MORSE_MAP: Record<string, string> = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",

  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
};

type MorseToken =
  | { type: "letter"; char: string; morse: string }
  | { type: "separator"; value: "//" | "///" };

const Morse = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState<
    "easy" | "medium" | "hard" | "extreme"
  >("medium");

  const resultTokens = useMemo<MorseToken[]>(() => {
    if (!text.trim()) return [];

    const normalized = removeCzechDiacritics(text).toLowerCase();
    const tokens: MorseToken[] = [];

    for (let i = 0; i < normalized.length; i++) {
      const current = normalized[i];
      const prev = normalized[i - 1];

      if (/[a-z0-9]/.test(current)) {
        const morse = MORSE_MAP[current];
        if (morse) {
          tokens.push({
            type: "letter",
            char: current,
            morse,
          });
        }
      } else if (current === " ") {
        if (/[a-z0-9]/.test(prev)) {
          tokens.push({ type: "separator", value: "//" });
        }
      } else if (/[.!?]/.test(current)) {
        if (/[a-z0-9]/.test(prev)) {
          tokens.push({ type: "separator", value: "///" });
        }
      }
    }

    return tokens;
  }, [text]);

  const handleRandomWord = () => {
    const words = WORDS_BY_DIFFICULTY[difficulty];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setText(randomWord);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-5 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md lg:max-w-2xl xl:max-w-3xl">
        <div className="rounded-[2rem] bg-[#fcfcfc] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-4 lg:p-5">
          <div className="space-y-4 rounded-[1.75rem] bg-[#f7f7f7] p-4 sm:p-5 lg:p-6">
            <div>
              <p className="mb-1 text-sm font-semibold text-zinc-800">
                Zadejte text
              </p>
              <p className="text-xs text-zinc-400">
                Text se ihned převede na morseovku.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Slovo nebo text..."
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
              <p className="mb-2 text-sm font-semibold text-zinc-500">
                Obtížnost náhodného slova
              </p>
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    e.target.value as "easy" | "medium" | "hard" | "extreme",
                  )
                }
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-zinc-800 outline-none transition focus:border-black/15 focus:ring-2 focus:ring-black/5"
              >
                {DIFFICULTY_OPTIONS.map((option) => (
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

              <div className="min-h-[240px] rounded-2xl border border-black/5 bg-[#fafafa] p-4 sm:min-h-[260px]">
                {resultTokens.length === 0 ? (
                  <p className="text-base text-zinc-400">Zatím žádný text.</p>
                ) : (
                  <div className="flex flex-wrap items-end gap-x-2 gap-y-4">
                    {resultTokens.map((token, index) => {
                      if (token.type === "separator") {
                        return (
                          <div
                            key={`${token.value}-${index}`}
                            className="pb-5 text-sm font-semibold text-zinc-400"
                          >
                            {token.value}
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${token.char}-${index}`}
                          className="flex min-w-[44px] flex-col items-center rounded-xl border border-black/5 bg-white px-2 py-2"
                        >
                          <span className="text-base font-semibold tracking-wide text-zinc-900">
                            {token.morse}
                          </span>
                          <span className="mt-1 text-xs text-zinc-400">
                            {token.char.toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
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

export default Morse;
