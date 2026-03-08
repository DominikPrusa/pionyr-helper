const items = [
  {
    title: "Sečtení časů",
    description: "Aplikace na sečtení časů orientačního běhu na táboře.",
    href: "/times-counter",
  },
  {
    title: "Čekačky",
    description: "Aplikace na psaní čekaček.",
    href: "/waiting-time-timer",
  },
  {
    title: "Šifry",
    description: "Aplikace na psaní šifer.",
    href: "/ciphers",
  },
  {
    title: "Morseovka",
    description: "Aplikace na psaní morseovky.",
    href: "/morse-code",
  },
];

const Home = () => {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Pionyr-helper
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Hlavní rozcestník
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            Minimalistická navigace pro rychlý přístup k nástrojům pro táborové
            aktivity a orientační běh.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {item.title}
                  </h2>
                  <span className="text-zinc-400 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <p className="text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>

                <div className="mt-6 text-sm font-medium text-zinc-900">
                  Otevřít
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
