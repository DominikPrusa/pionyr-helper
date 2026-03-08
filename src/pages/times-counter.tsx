import { useEffect, useState } from "react";
import { formatSecondsToMMSS } from "../utils/TimeConversions";

const rows = Array.from({ length: 8 }, (_, i) => i + 1);

type Station = {
  name: string;
  points: number | null;
  waitingTime: number | null;
};

type FormData = {
  name: string;
  group: string;
  startTime: string;
  endTime: string;
  stations: Station[];
};

const TimesCounter = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    group: "",
    startTime: "",
    endTime: "",
    stations: rows.map(() => ({
      name: "",
      points: null,
      waitingTime: null,
    })),
  });
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [totalWaitingTime, setTotalWaitingTime] = useState<number>(0);
  const [resultTime, setResultTime] = useState<string>("");
  const [placement, setPlacement] = useState<number>();

  const handleChange = (
    field: keyof Omit<FormData, "stations">,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStationChange = (
    index: number,
    field: keyof Station,
    value: string | number | null,
  ) => {
    setFormData((prev) => {
      const updatedStations = [...prev.stations];
      updatedStations[index] = {
        ...updatedStations[index],
        [field]: value,
      };

      return {
        ...prev,
        stations: updatedStations,
      };
    });
  };

  const getFormJson = () => {
    const payload = {
      name: formData.name,
      group: formData.group,
      startTime: formData.startTime,
      endTime: formData.endTime,
      stations: formData.stations.map((station) => ({
        name: station.name,
        points: station.points,
        "waiting-time": station.waitingTime,
      })),
    };

    console.log(payload);
    return payload;
  };

  useEffect(() => {
    // points
    const count = formData.stations.reduce((sum, station) => {
      return sum + (station.points ?? 0);
    }, 0);

    setTotalPoints(count);

    // waiting time
    const total = formData.stations.reduce((sum, station) => {
      return sum + (station.waitingTime ?? 0);
    }, 0);

    setTotalWaitingTime(total);
  }, [formData.stations]);

  useEffect(() => {
    const timeToSeconds = (time: string) => {
      if (!time) return 0;

      const parts = time.split(":").map(Number);

      if (parts.length === 3) {
        const [hours, minutes, seconds] = parts;
        return hours * 3600 + minutes * 60 + seconds;
      }

      if (parts.length === 2) {
        const [hours, minutes] = parts;
        return hours * 3600 + minutes * 60;
      }

      return 0;
    };

    const formatToHHMMSS = (totalSeconds: number) => {
      const safe = Math.max(0, totalSeconds);
      const hours = Math.floor(safe / 3600);
      const minutes = Math.floor((safe % 3600) / 60);
      const seconds = safe % 60;

      return [hours, minutes, seconds]
        .map((value) => String(value).padStart(2, "0"))
        .join(":");
    };

    if (formData.startTime && formData.endTime) {
      const startSeconds = timeToSeconds(formData.startTime);
      const endSeconds = timeToSeconds(formData.endTime);

      const result = endSeconds - startSeconds - totalWaitingTime;

      setResultTime(formatToHHMMSS(result));
    } else {
      setResultTime("");
    }
  }, [totalWaitingTime, formData.startTime, formData.endTime]);

  const handleReset = () => {
    setTotalPoints(0);
    setTotalWaitingTime(0);
    setResultTime("");
    setFormData({
      name: "",
      group: "",
      startTime: "",
      endTime: "",
      stations: rows.map(() => ({
        name: "",
        points: null,
        waitingTime: null,
      })),
    });
  };

  const handleSubmit = () => {
    const jsonData = getFormJson();

    // send somewhere
    // fetch("/api/times-counter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(jsonData),
    // });

    console.log(JSON.stringify(jsonData, null, 2));
  };

  return (
    <main className="min-h-screen bg-zinc-100 px-3 py-4 text-zinc-900 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm">
          <div className="bg-stone-600 px-4 py-3 text-center text-white">
            <div className="text-lg font-extrabold uppercase tracking-wide sm:text-xl">
              LDT "RADOST" Luka nad Jihlavou
            </div>
          </div>

          <div className="border-t border-zinc-300">
            <div className="grid grid-cols-12 border-b border-zinc-300">
              <div className="col-span-9 flex items-center border-r border-zinc-300">
                <label className="w-20 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-24">
                  Jméno:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                  placeholder="Zadej jméno"
                />
              </div>
              <div className="col-span-3 flex items-center">
                <label className="w-10 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700">
                  Sk.
                </label>
                <input
                  type="text"
                  value={formData.group}
                  onChange={(e) => handleChange("group", e.target.value)}
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                  placeholder="Ml"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 border-b border-zinc-300">
              <div className="col-span-6 flex items-center border-r border-zinc-300">
                <label className="w-16 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-20">
                  Start:
                </label>
                <input
                  type="time"
                  step={1}
                  value={formData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="w-full bg-transparent px-2 py-3 text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                />
              </div>
              <div className="col-span-6 flex items-center">
                <label className="w-12 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-14">
                  Cíl:
                </label>
                <input
                  type="time"
                  step={1}
                  value={formData.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className="w-full bg-transparent px-2 py-3 text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 bg-zinc-50 text-[10px] font-bold uppercase text-zinc-700 sm:text-xs">
              <div className="col-span-6 border-b border-r border-zinc-300 px-2 py-2 text-center">
                Stanoviště
              </div>
              <div className="col-span-3 border-b border-r border-zinc-300 px-2 py-2 text-center">
                Body
              </div>
              <div className="col-span-3 border-b border-zinc-300 px-2 py-2 text-center">
                Čekání
              </div>
            </div>

            {rows.map((row, index) => (
              <div key={row} className="grid grid-cols-12">
                <div className="col-span-6 flex border-b border-r border-zinc-300">
                  <div className="flex w-10 items-center justify-center border-r border-zinc-300 bg-zinc-50 text-sm font-semibold">
                    {row}
                  </div>
                  <input
                    type="text"
                    value={formData.stations[index].name}
                    onChange={(e) =>
                      handleStationChange(index, "name", e.target.value)
                    }
                    className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                    placeholder="Název stanoviště"
                  />
                </div>

                <div className="col-span-3 border-b border-r border-zinc-300">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={formData.stations[index].points ?? ""}
                    onChange={(e) => {
                      handleStationChange(
                        index,
                        "points",
                        e.target.value === "" ? null : Number(e.target.value),
                      );
                    }}
                    className="w-full bg-transparent px-2 py-3 text-center text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                    placeholder="0"
                  />
                </div>

                <div className="col-span-3 border-b border-zinc-300">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={formData.stations[index].waitingTime ?? ""}
                    onChange={(e) => {
                      handleStationChange(
                        index,
                        "waitingTime",
                        e.target.value === "" ? null : Number(e.target.value),
                      );
                    }}
                    className="w-full bg-transparent px-2 py-3 text-center text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-12">
              <div className="col-span-6 flex items-center border-b border-r border-zinc-300 bg-zinc-50 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:text-sm">
                Celkem
              </div>
              <div className="col-span-3 border-b border-r border-zinc-300">
                <input
                  type="text"
                  inputMode="numeric"
                  value={totalPoints}
                  disabled
                  className="w-full bg-transparent px-2 py-3 text-center text-xs font-medium outline-none placeholder:text-zinc-400 sm:text-sm"
                  placeholder="0"
                />
              </div>
              <div className="col-span-3 border-b border-zinc-300">
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatSecondsToMMSS(totalWaitingTime)}
                  disabled
                  className="w-full bg-transparent px-2 py-3 text-center text-xs font-medium outline-none placeholder:text-zinc-400 sm:text-sm"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="col-span-6 flex items-center border-r border-zinc-300">
                <label className="w-16 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-20">
                  Čas:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={resultTime}
                  disabled
                  className="w-full bg-transparent px-2 py-3 text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                  placeholder="Výsledek"
                />
              </div>
              <div className="col-span-6 flex items-center">
                <label className="w-16 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-20">
                  Pořadí:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={placement}
                  disabled
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                  placeholder="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Resetovat
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Odeslat JSON
          </button>
        </div>
      </div>
    </main>
  );
};

export default TimesCounter;
