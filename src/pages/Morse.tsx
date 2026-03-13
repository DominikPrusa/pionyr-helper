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
] as const;

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

const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([key, value]) => [value, key.toUpperCase()]),
);

type Difficulty = "easy" | "medium" | "hard" | "extreme";
type Mode = "encode" | "decode";

type EncodeToken =
  | { type: "letter"; char: string; morse: string }
  | { type: "separator"; value: "//" | "///" };

type DecodeToken =
  | { type: "letter"; source: string; value: string }
  | { type: "invalid"; source: string }
  | { type: "separator"; value: "/" | "//" | "///" };

const Morse = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("encode");
  const [text, setText] = useState("");
  const [morseInput, setMorseInput] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const resultTokens = useMemo<EncodeToken[]>(() => {
    if (!text.trim()) return [];

    const normalized = removeCzechDiacritics(text).toLowerCase();
    const tokens: EncodeToken[] = [];

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

  const decodeTokens = useMemo<DecodeToken[]>(() => {
    if (!morseInput.trim()) return [];

    const parts = morseInput.match(/([.-]+|\/+)/g) ?? [];

    return parts.map((part) => {
      if (/^\/+$/.test(part)) {
        if (part.length >= 3) {
          return { type: "separator", value: "///" as const };
        }

        if (part.length === 2) {
          return { type: "separator", value: "//" as const };
        }

        return { type: "separator", value: "/" as const };
      }

      const decoded = REVERSE_MORSE_MAP[part];
      if (decoded) {
        return {
          type: "letter",
          source: part,
          value: decoded,
        };
      }

      return {
        type: "invalid",
        source: part,
      };
    });
  }, [morseInput]);

  const decodedPreview = useMemo(() => {
    if (!decodeTokens.length) return "";

    let output = "";

    decodeTokens.forEach((token) => {
      if (token.type === "letter") {
        output += token.value;
      } else if (token.type === "invalid") {
        output += "�";
      } else if (token.value === "//") {
        output += " ";
      } else if (token.value === "///") {
        output += ". ";
      }
    });

    return output.trim();
  }, [decodeTokens]);

  const handleRandomWord = () => {
    const words = WORDS_BY_DIFFICULTY[difficulty];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setText(randomWord);
  };

  const appendMorseChar = (char: "." | "-" | "/") => {
    setMorseInput((prev) => prev + char);
  };

  const handleDeleteLast = () => {
    setMorseInput((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setMorseInput("");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-5 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md lg:max-w-2xl xl:max-w-3xl">
        <div className="rounded-[2rem] bg-[#fcfcfc] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-4 lg:p-5">
          <div className="space-y-4 rounded-[1.75rem] bg-[#f7f7f7] p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-sm font-semibold text-zinc-800">
                  {mode === "encode" ? "Zadejte text" : "Zadejte morseovku"}
                </p>
                <p className="text-xs text-zinc-400">
                  {mode === "encode"
                    ? "Text se ihned převede na morseovku."
                    : "Používejte pouze tlačítka pro dekódování morseovky."}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMode((prev) => (prev === "encode" ? "decode" : "encode"))
                }
                className="shrink-0 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 active:scale-[0.98]"
              >
                {mode === "encode" ? "Morse → Text" : "Text → Morse"}
              </button>
            </div>

            {mode === "encode" ? (
              <>
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
                      setDifficulty(e.target.value as Difficulty)
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
              </>
            ) : (
              <>
                <div className="rounded-[1.75rem] border border-black/5 bg-white p-4 shadow-sm">
                  <p className="mb-3 text-sm font-semibold text-zinc-500">
                    Zadaná morseovka
                  </p>

                  <div className="min-h-[84px] rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                    {morseInput ? (
                      <div className="break-all text-2xl font-semibold tracking-[0.2em] text-zinc-900">
                        {morseInput}
                      </div>
                    ) : (
                      <p className="text-base text-zinc-400">
                        Zatím žádný vstup.
                      </p>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => appendMorseChar(".")}
                      className="flex min-h-[78px] items-center justify-center rounded-[1.5rem] border border-black/10 bg-white px-4 py-4 text-3xl font-bold text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.98]"
                    >
                      .
                    </button>
                    <button
                      type="button"
                      onClick={() => appendMorseChar("-")}
                      className="flex min-h-[78px] items-center justify-center rounded-[1.5rem] border border-black/10 bg-white px-4 py-4 text-3xl font-bold text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.98]"
                    >
                      –
                    </button>
                    <button
                      type="button"
                      onClick={() => appendMorseChar("/")}
                      className="flex min-h-[78px] items-center justify-center rounded-[1.5rem] border border-black/10 bg-white px-4 py-4 text-3xl font-bold text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.98]"
                    >
                      /
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleDeleteLast}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 active:scale-[0.98]"
                    >
                      Smazat znak
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.98]"
                    >
                      Vymazat vše
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="min-h-[320px] rounded-[1.75rem] border border-black/5 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-zinc-500">
                Výsledek
              </p>

              {mode === "encode" ? (
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
              ) : (
                <div className="space-y-4">
                  <div className="min-h-[120px] rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                    <p className="mb-3 text-sm font-semibold text-zinc-500">
                      Přeložený text
                    </p>

                    {decodeTokens.length === 0 ? (
                      <p className="text-base text-zinc-400">
                        Zatím žádná morseovka.
                      </p>
                    ) : (
                      <>
                        <div className="mb-4 text-lg font-semibold tracking-wide text-zinc-900">
                          {decodedPreview || "—"}
                        </div>

                        <div className="flex flex-wrap items-end gap-x-2 gap-y-4">
                          {decodeTokens.map((token, index) => {
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

                            if (token.type === "invalid") {
                              return (
                                <div
                                  key={`${token.source}-${index}`}
                                  className="flex min-w-[56px] flex-col items-center rounded-xl border border-red-200 bg-red-50 px-2 py-2"
                                >
                                  <span className="text-base font-semibold tracking-wide text-red-700">
                                    {token.source}
                                  </span>
                                  <span className="mt-1 text-xs font-semibold text-red-500">
                                    CHYBA
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={`${token.source}-${index}`}
                                className="flex min-w-[56px] flex-col items-center rounded-xl border border-black/5 bg-white px-2 py-2"
                              >
                                <span className="text-base font-semibold tracking-wide text-zinc-900">
                                  {token.value}
                                </span>
                                <span className="mt-1 text-xs text-zinc-400">
                                  {token.source}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-4">
                    <p className="text-xs leading-relaxed text-zinc-500">
                      Oddělování v dekódování:
                      <br />
                      <span className="font-semibold text-zinc-700">
                        /
                      </span>{" "}
                      písmeno,
                      <span className="ml-1 font-semibold text-zinc-700">
                        //
                      </span>{" "}
                      slovo,
                      <span className="ml-1 font-semibold text-zinc-700">
                        ///
                      </span>{" "}
                      věta
                    </p>
                  </div>
                </div>
              )}
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
