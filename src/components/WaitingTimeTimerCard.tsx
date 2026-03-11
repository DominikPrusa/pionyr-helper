import React, { useEffect, useMemo, useState } from "react";
import { Pause, Play, Trash2 } from "lucide-react";
import { formatSecondsToMMSS } from "../utils/TimeConversions";

type WaitingTimeTimerCardProps = {
  id: string;
  onRemove: () => void;
};

const WaitingTimeTimerCard = ({ id, onRemove }: WaitingTimeTimerCardProps) => {
  const [name, setName] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formattedTime = useMemo(() => formatSecondsToMMSS(seconds), [seconds]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      <div className="bg-neutral-100 px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <label
              htmlFor={`waiting-name-${id}`}
              className="mb-3 block text-sm font-medium uppercase tracking-[0.12em] text-neutral-500"
            >
              Jméno
            </label>

            <input
              id={`waiting-name-${id}`}
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Zadejte jméno"
              className="w-full border-0 bg-transparent p-0 text-2xl font-medium text-neutral-900 outline-none placeholder:text-neutral-300 sm:text-3xl"
            />
          </div>

          <div className="shrink-0 rounded-2xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <span className="tabular-nums text-4xl font-light tracking-tight text-neutral-950 sm:text-5xl">
              {formattedTime}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsRunning((prev) => !prev)}
            aria-label={isRunning ? "Zastavit časovač" : "Spustit časovač"}
            className="flex h-14 min-w-19 items-center justify-center rounded-2xl border border-neutral-900 bg-neutral-950 px-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {isRunning ? (
              <Pause size={24} />
            ) : (
              <Play size={24} className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onRemove}
            aria-label="Odstranit kartu"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:text-red-500"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingTimeTimerCard;
