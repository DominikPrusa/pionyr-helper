export const removeCzechDiacritics = (text: string): string => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Caesar
export const caesarCipher = (text: string, offset: number) => {
  const normalizedText = removeCzechDiacritics(text);
  const normalizedOffset = ((offset % 26) + 26) % 26;

  return normalizedText
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        const code = char.charCodeAt(0) - 65;
        return String.fromCharCode(((code + normalizedOffset) % 26) + 65);
      }

      if (char >= "a" && char <= "z") {
        const code = char.charCodeAt(0) - 97;
        return String.fromCharCode(((code + normalizedOffset) % 26) + 97);
      }

      return char;
    })
    .join("");
};

// prvni a posledni (presmycka)
const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const scrambleWord = (word: string): string => {
  if (word.length <= 3) return word;

  const first = word[0];
  const last = word[word.length - 1];
  const middle = word.slice(1, -1).split("");

  const shuffledMiddle = shuffleArray(middle).join("");

  return `${first}${shuffledMiddle}${last}`;
};

export const anagram = (text: string): string => {
  const normalizedText = removeCzechDiacritics(text);

  return normalizedText
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      return scrambleWord(part);
    })
    .join("");
};

// every x letter
const RANDOM_ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const getRandomLetter = (): string => {
  const index = Math.floor(Math.random() * RANDOM_ALPHABET.length);
  return RANDOM_ALPHABET[index];
};

const fillWord = (word: string, fillCount: number): string => {
  // AI comprehension problem
  fillCount--;
  if (word.length <= 1 || fillCount <= 0) return word;

  let result = word[0];

  for (let i = 1; i < word.length; i++) {
    for (let j = 0; j < fillCount; j++) {
      result += getRandomLetter();
    }
    result += word[i];
  }

  return result;
};

export const filledLetters = (text: string, fillCount: number): string => {
  const normalizedText = removeCzechDiacritics(text);
  const safeFillCount = Math.max(0, Math.floor(fillCount));

  return normalizedText
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      return fillWord(part, safeFillCount);
    })
    .join("");
};

export const reverse = (text: string): string => {
  const normalizedText = removeCzechDiacritics(text);
  return normalizedText
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      return part.split("").reverse().join("");
    })
    .join("");
};
