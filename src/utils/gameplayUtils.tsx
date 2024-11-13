import { BrailleEncoding, BrailleEncodings } from "@/contents/en/brailleData";

export const keyToDotMap: { [key: string]: number } = {
  f: 0,
  d: 1,
  s: 2,
  j: 3,
  k: 4,
  l: 5,
};

export function createBraillePattern(pressedKeys: Set<string>): string {
  const pattern = Array(6).fill("0");
  pressedKeys.forEach((key) => {
    const dotIndex = keyToDotMap[key.toLowerCase()];
    if (dotIndex !== undefined) {
      pattern[dotIndex] = "1";
    }
  });
  return pattern.join("");
}

export function findBrailleMatch(pattern: string): BrailleEncoding | null {
  for (const category of Object.values(BrailleEncodings)) {
    const match = category.find((item) => item.keystroke[0] === pattern);
    if (match) return match;
  }
  return null;
}

export function updateBinaryPattern(key: string, currentPattern: string[]): string[] {
  const dotIndex = keyToDotMap[key.toLowerCase()];
  if (dotIndex !== undefined) {
    const newPattern = [...currentPattern];
    newPattern[dotIndex] = "1";
    return newPattern;
  }
  return currentPattern;
}

export function findCombinedBrailleMatch(prevPattern: string, currentPattern: string): BrailleEncoding | null {
  const combinedPattern = [prevPattern, currentPattern];
  for (const category of Object.values(BrailleEncodings)) {
    const match = category.find((item) => item.keystroke.length === 2 && item.keystroke[0] === prevPattern && item.keystroke[1] === currentPattern);
    if (match) return match;
  }
  return null;
}
