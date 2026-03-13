import { useMemo, useState } from "react";
import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WORDS_BY_DIFFICULTY } from "../utils/RandomWords";
import {
  anagram,
  caesarCipher,
  filledLetters,
  mobileCipher,
  reverse,
} from "../utils/Ciphers";
import { velkyPolskyKriz } from "../components/CrossLetter";

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Lehká" },
  { value: "medium", label: "Střední" },
  { value: "hard", label: "Těžká" },
  { value: "extreme", label: "Extrémní" },
];

const CIPHER_OPTIONS = [
  { value: "caesar", label: "Caesarova (posunutá abeceda)" },
  { value: "mobilni", label: "Mobilní" },
  { value: "prvniposledni", label: "První a poslední" },
  { value: "kazdexpismeno", label: "Každé X-té písmeno" },
  { value: "pozpatku", label: "Pozpátku" },
  { value: "mrizka", label: "Mřížka" },
];

// nastav podle abecedy, kterou používáš v caesarCipher
const CAESAR_ALPHABET_LENGTH = 26;

const getResultPlaceholder = (
  cipher: string,
  text: string,
  caesarOffset: number,
  fillLetters: number,
) => {
  if (!text.trim()) return "Výsledek se zobrazí tady.";

  switch (cipher) {
    case "caesar":
      return caesarCipher(text, caesarOffset);
    case "mobilni":
      return mobileCipher(text);
    case "prvniposledni":
      return anagram(text);
    case "kazdexpismeno":
      return filledLetters(text, fillLetters);
    case "pozpatku":
      return reverse(text);
    case "mrizka":
      return (
        <div className="flex flex-row flex-wrap gap-4">
          {velkyPolskyKriz(text)}
        </div>
      );
    default:
      return "Výsledek se zobrazí tady.";
  }
};

const Ciphers = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [selectedCipher, setSelectedCipher] = useState("caesar");
  const [caesarOffset, setCaesarOffset] = useState(1);
  const [fillLetters, setFillLetters] = useState(3);
  const [difficulty, setDifficulty] = useState<
    "easy" | "medium" | "hard" | "extreme"
  >("medium");

  const resultText = useMemo(
    () => getResultPlaceholder(selectedCipher, text, caesarOffset, fillLetters),
    [selectedCipher, text, caesarOffset, fillLetters],
  );

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
                Vyber šifru a ihned uvidíš výsledek.
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

            <div>
              <p className="mb-2 text-sm font-semibold text-zinc-500">
                Typ šifry
              </p>
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

            {selectedCipher === "caesar" && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-zinc-500">
                    Posun Caesarovy šifry
                  </p>
                  <span className="text-sm text-zinc-700">
                    {caesarOffset} např. A={caesarCipher("A", caesarOffset)}
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={CAESAR_ALPHABET_LENGTH}
                  value={caesarOffset}
                  onChange={(e) => setCaesarOffset(Number(e.target.value))}
                  className="w-full accent-zinc-900"
                />

                <div className="mt-1 flex justify-between text-xs text-zinc-400">
                  <span>1</span>
                  <span>{CAESAR_ALPHABET_LENGTH}</span>
                </div>
              </div>
            )}
            {selectedCipher === "kazdexpismeno" && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-zinc-500">
                    Každé {fillLetters} písmeno
                  </p>
                </div>

                <input
                  type="range"
                  min={1}
                  max={10}
                  value={fillLetters}
                  onChange={(e) => setFillLetters(Number(e.target.value))}
                  className="w-full accent-zinc-900"
                />

                <div className="mt-1 flex justify-between text-xs text-zinc-400">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            )}

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
