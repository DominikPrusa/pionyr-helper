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
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] my-2">
      <div className="p-3">
        <div className="rounded-[22px] bg-neutral-50 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <input
                id={`waiting-name-${id}`}
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="Zadejte jméno"
                className="w-full border-0 bg-transparent p-0 text-base font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
              />

              <div className="mt-2 flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    isRunning ? "bg-emerald-500" : "bg-red-600"
                  }`}
                />
                <span className="text-xs font-medium text-neutral-500">
                  {isRunning ? "Časovač běží" : "Pozor časovač neběží"}
                </span>
              </div>
            </div>

            <div className="shrink-0 rounded-2xl bg-white px-3 py-2 shadow-sm">
              <span className="tabular-nums text-3xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-4xl">
                {formattedTime}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-start gap-2">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              aria-label={isRunning ? "Zastavit časovač" : "Spustit časovač"}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-sm transition active:scale-95"
            >
              {isRunning ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={onRemove}
              aria-label="Odstranit kartu"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-600 transition active:scale-95"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingTimeTimerCard;
