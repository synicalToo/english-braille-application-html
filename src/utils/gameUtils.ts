import { BrailleData } from "@/contents/en/BrailleData";

export function findHighestMatchingPatternCount(pattern: string): number {
  let maxCount = 0;
  function countPatternInArray(array: string[]): number {
    let count = 0;
    for (const stroke of array) {
      if (stroke === pattern) {
        count++;
      }
    }
    return count;
  }

  for (const category in BrailleData) {
    const content = BrailleData[category].content;
    for (const key in content) {
      const keystrokes = content[key].keystroke;
      const count = countPatternInArray(keystrokes);
      if (count > maxCount) {
        maxCount = count;
      }
    }
  }
  return maxCount;
}

export function findNumberMatch(pattern: string): { title: string; symbol?: string; keystroke: string[] } | null {
  for (const item in BrailleData.numbers.content) {
    if (BrailleData.numbers.content[item].keystroke[0] === pattern) {
      return BrailleData.numbers.content[item];
    }
  }

  return null;
}

export function findBrailleMatch(
  pattern: string,
  inputHistory: string[]
): {
  bestMatch: { title: string; symbol?: string; keystroke: string[] } | null;
  longestMatch: number;
} {
  const updatedInputHistory = [...inputHistory, pattern];
  let bestMatch: { title: string; symbol?: string; keystroke: string[] } | null = null;
  let longestMatch = 0;

  // Determine maximum slice length based on grade
  const maxSliceLength = 3;

  for (const category in BrailleData) {
    const mapping = BrailleData[category];

    if (mapping.compatibility == 2 || category == "Numbers") continue;

    const { content } = mapping;

    for (const entry in content) {
      const item = content[entry];
      const { keystroke } = item;

      if (keystroke.length > 2) {
        for (let sliceLength = Math.min(maxSliceLength, keystroke.length); sliceLength >= 1; sliceLength--) {
          const mergedInput = updatedInputHistory.slice(-sliceLength).join("");
          const joinedKeystrokes = keystroke.join("");

          if (joinedKeystrokes === mergedInput && sliceLength > longestMatch) {
            longestMatch = sliceLength;
            bestMatch = item;
            break;
          }
        }
      } else {
        // Handle cases where keystrokes are 2 or fewer
        const recentInputs = updatedInputHistory.slice(-keystroke.length);
        const isMatch = keystroke.every((stroke, index) => stroke === recentInputs[index]);

        if (isMatch && keystroke.length > longestMatch) {
          longestMatch = keystroke.length;
          bestMatch = item;
        }
      }
    }
  }

  return {
    bestMatch,
    longestMatch,
  };
}
