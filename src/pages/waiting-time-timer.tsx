import { Plus, Undo2 } from "lucide-react";
import WaitingTimeTimerCard from "../components/WaitingTimeTimerCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TimerCardItem = {
  id: string;
};

const WaitingTimeTimer = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<TimerCardItem[]>([]);

  const generateCardId = (): string => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }

    return `timer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  };

  const addCard = (): void => {
    setCards((prev) => [
      ...prev,
      {
        id: generateCardId(),
      },
    ]);
  };

  const removeCard = (idToRemove: string): void => {
    setCards((prev) => prev.filter((card) => card.id !== idToRemove));
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">
        {cards.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white/70 px-8 py-14 text-center text-neutral-400 shadow-sm">
            Zatím není spuštěno žádné čekání. <br />
            Nové čekání přidáš kliknutím na "+" dole. Zpět se vrátíš kliknutím
            na šipku zpět <br /> - chápeš ne? 😆
          </div>
        ) : (
          cards.map((card) => (
            <WaitingTimeTimerCard
              key={card.id}
              id={card.id}
              onRemove={() => removeCard(card.id)}
            />
          ))
        )}
      </div>
      <div className="mt-auto flex items-center justify-center gap-4 py-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Go back"
          className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition hover:scale-[1.03] hover:shadow-[0_22px_50px_rgba(0,0,0,0.26)]"
        >
          <Undo2 size={34} />
        </button>

        <button
          type="button"
          onClick={addCard}
          aria-label="Add timer card"
          className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition hover:scale-[1.03] hover:shadow-[0_22px_50px_rgba(0,0,0,0.26)]"
        >
          <Plus size={34} />
        </button>
      </div>
    </div>
  );
};

export default WaitingTimeTimer;
