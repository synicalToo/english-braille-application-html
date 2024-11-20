import { brailleMappings } from "@/contents/en/customBrailleData";

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

  for (const category in brailleMappings) {
    const content = brailleMappings[category].content;
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

export function findBrailleMatch(pattern: string, inputHistory: string[]): { title: string; symbol?: string; keystroke: string[] } | null {
  const updatedInputHistory = [...inputHistory, pattern];
  let bestMatch = null;
  let longestMatch = 0;

  // work around for repeating patterns that has a match previously (capital wor)
  if (updatedInputHistory.slice(-2).join("") === brailleMappings.Indicators.content.capital_passage.keystroke.join("")) {
    return brailleMappings.Indicators.content.capital_passage;
  }

  for (const category in brailleMappings) {
    const content = brailleMappings[category].content;
    for (const entry in content) {
      const item = content[entry];
      const keystrokes = item.keystroke;

      const recentInputs = updatedInputHistory.slice(-keystrokes.length);
      if (keystrokes.length > longestMatch && keystrokes.every((stroke, index) => stroke === recentInputs[index])) {
        longestMatch = keystrokes.length;
        bestMatch = item;
      }
    }
  }

  return bestMatch;
}
