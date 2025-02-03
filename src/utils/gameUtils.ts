// This script is used for Grade 1 Braille Free Typing Excersise

import { BrailleData } from "@/contents/en/BrailleData";

// Loops through all the braille data
// Get the highest matching pattern based on input
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

// Loops through all the braille numbers data
// Get the number match based on input
// Returns braille item when match is found
export function findNumberMatch(pattern: string): { title: string; symbol?: string; keystroke: string[] } | null {
  for (const item in BrailleData.numbers.content) {
    if (BrailleData.numbers.content[item].keystroke[0] === pattern) {
      return BrailleData.numbers.content[item];
    }
  }

  return null;
}

// The brain behind the matching algorithm`
export function findBrailleMatch(
  pattern: string,
  inputHistory: string[]
): {
  bestMatch: { title: string; symbol?: string; keystroke: string[] } | null;
  longestMatch: number;
} {
  // Add the latest input to the input history
  const updatedInputHistory = [...inputHistory, pattern];
  let bestMatch: { title: string; symbol?: string; keystroke: string[] } | null = null;
  let longestMatch = 0;

  // Determine maximum slice length based on grade
  const maxSliceLength = 3;

  for (const category in BrailleData) {
    const mapping = BrailleData[category];

    // Skip grade 2 and numbers
    if (mapping.compatibility == 2 || category == "Numbers") continue;

    const { content } = mapping;

    for (const entry in content) {
      const item = content[entry];
      const { keystroke } = item;

      // Check for braille patterns that has more than 2 keystroke
      if (keystroke.length > 2) {
        // Loop through the keystroke length
        for (let sliceLength = Math.min(maxSliceLength, keystroke.length); sliceLength >= 1; sliceLength--) {
          const mergedInput = updatedInputHistory.slice(-sliceLength).join("");
          const joinedKeystrokes = keystroke.join("");

          // Check if the joined keystrokes is the same as the merged input (previous input + new input)
          // And if the slice length is greater than the longest match
          if (joinedKeystrokes === mergedInput && sliceLength > longestMatch) {
            longestMatch = sliceLength;
            bestMatch = item;
            break;
          }
        }
      } else {
        // Handle cases where keystrokes are 2 or fewer
        const recentInputs = updatedInputHistory.slice(-keystroke.length);
        // Check if the recent inputs is the same as all the keystroke
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
