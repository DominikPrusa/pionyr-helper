const rows = Array.from({ length: 8 }, (_, i) => i + 1);

const TimesCounter = () => {
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
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                  placeholder="A"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 border-b border-zinc-300">
              <div className="col-span-6 flex items-center border-r border-zinc-300">
                <label className="w-16 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-20">
                  Start:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full bg-transparent px-2 py-3 text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                  placeholder="Čas"
                />
              </div>
              <div className="col-span-6 flex items-center">
                <label className="w-12 shrink-0 px-2 py-3 text-xs font-bold uppercase text-zinc-700 sm:w-14">
                  Cíl:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full bg-transparent px-2 py-3 text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                  placeholder="Čas"
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

            {rows.map((row) => (
              <div key={row} className="grid grid-cols-12">
                <div className="col-span-6 flex border-b border-r border-zinc-300">
                  <div className="flex w-10 items-center justify-center border-r border-zinc-300 bg-zinc-50 text-sm font-semibold">
                    {row}
                  </div>
                  <input
                    type="text"
                    className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                    placeholder="Stan."
                  />
                </div>

                <div className="col-span-3 border-b border-r border-zinc-300">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full bg-transparent px-2 py-3 text-center text-xs outline-none placeholder:text-zinc-400 sm:text-sm"
                    placeholder="0"
                  />
                </div>

                <div className="col-span-3 border-b border-zinc-300">
                  <input
                    type="text"
                    inputMode="numeric"
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
                  className="w-full bg-transparent px-2 py-3 text-center text-xs font-medium outline-none placeholder:text-zinc-400 sm:text-sm"
                  placeholder="0"
                />
              </div>
              <div className="col-span-3 border-b border-zinc-300">
                <input
                  type="text"
                  inputMode="numeric"
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
                  className="w-full bg-transparent px-2 py-3 text-sm outline-none placeholder:text-zinc-400"
                  placeholder="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TimesCounter;
