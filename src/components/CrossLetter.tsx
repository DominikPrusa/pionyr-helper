import React from "react";
import { removeCzechDiacritics } from "../utils/Ciphers";

type DotPosition = "left" | "center" | "right";

type CrossCellConfig = {
  borders: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  dot: DotPosition;
};

const LETTER_TO_CROSS: Record<string, CrossCellConfig> = {
  A: {
    borders: { top: false, right: true, bottom: true, left: false },
    dot: "left",
  },
  B: {
    borders: { top: false, right: true, bottom: true, left: false },
    dot: "center",
  },
  C: {
    borders: { top: false, right: true, bottom: true, left: false },
    dot: "right",
  },

  D: {
    borders: { top: false, right: true, bottom: true, left: true },
    dot: "left",
  },
  E: {
    borders: { top: false, right: true, bottom: true, left: true },
    dot: "center",
  },
  F: {
    borders: { top: false, right: true, bottom: true, left: true },
    dot: "right",
  },

  G: {
    borders: { top: false, right: false, bottom: true, left: true },
    dot: "left",
  },
  H: {
    borders: { top: false, right: false, bottom: true, left: true },
    dot: "center",
  },
  I: {
    borders: { top: false, right: false, bottom: true, left: true },
    dot: "right",
  },

  J: {
    borders: { top: true, right: true, bottom: true, left: false },
    dot: "left",
  },
  K: {
    borders: { top: true, right: true, bottom: true, left: false },
    dot: "center",
  },
  L: {
    borders: { top: true, right: true, bottom: true, left: false },
    dot: "right",
  },

  M: {
    borders: { top: true, right: true, bottom: true, left: true },
    dot: "left",
  },
  N: {
    borders: { top: true, right: true, bottom: true, left: true },
    dot: "center",
  },
  O: {
    borders: { top: true, right: true, bottom: true, left: true },
    dot: "right",
  },

  P: {
    borders: { top: true, right: false, bottom: true, left: true },
    dot: "left",
  },
  Q: {
    borders: { top: true, right: false, bottom: true, left: true },
    dot: "center",
  },
  R: {
    borders: { top: true, right: false, bottom: true, left: true },
    dot: "right",
  },

  S: {
    borders: { top: true, right: true, bottom: false, left: false },
    dot: "left",
  },
  T: {
    borders: { top: true, right: true, bottom: false, left: false },
    dot: "center",
  },
  U: {
    borders: { top: true, right: true, bottom: false, left: false },
    dot: "right",
  },

  V: {
    borders: { top: true, right: true, bottom: false, left: true },
    dot: "left",
  },
  W: {
    borders: { top: true, right: true, bottom: false, left: true },
    dot: "center",
  },
  X: {
    borders: { top: true, right: true, bottom: false, left: true },
    dot: "right",
  },

  Y: {
    borders: { top: true, right: false, bottom: false, left: true },
    dot: "left",
  },
  Z: {
    borders: { top: true, right: false, bottom: false, left: true },
    dot: "center",
  },
};

const dotPositionClasses: Record<DotPosition, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const CrossLetter = ({ letter }: { letter: string }) => {
  const config = LETTER_TO_CROSS[letter];

  if (!config) {
    return (
      <div className="flex min-w-[28px] items-center justify-center px-1 text-sm font-medium text-zinc-700">
        {letter}
      </div>
    );
  }

  const { borders, dot } = config;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-4 w-8 sm:h-8 sm:w-14 items-center px-3
        ${dotPositionClasses[dot]}
        ${borders.top ? "border-t-2" : ""}
        ${borders.right ? "border-r-2" : ""}
        ${borders.bottom ? "border-b-2" : ""}
        ${borders.left ? "border-l-2" : ""}
        border-black`}
      >
        <div className="h-1 w-1 sm:h-2 sm:w-2 rounded-full bg-black" />
      </div>
      <span className="text-xs text-gray-400">{letter}</span>
    </div>
  );
};

export const velkyPolskyKriz = (text: string): React.ReactNode[] => {
  const normalized = removeCzechDiacritics(text).toUpperCase();

  return normalized.split("").map((char, index) => {
    if (char === " ") {
      return <div key={`break-${index}`} className="basis-full h-0" />;
    }

    return <CrossLetter key={`${char}-${index}`} letter={char} />;
  });
};
