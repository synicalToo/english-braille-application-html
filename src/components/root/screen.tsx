"use client";

import { useState, useEffect } from "react";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { createBraillePattern, findBrailleMatch, keyToDotMap, updateBinaryPattern, findCombinedBrailleMatch } from "@/utils/gameplayUtils";

export default function Screen() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [currentPattern, setCurrentPattern] = useState<string[]>(Array(6).fill("0"));
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [keystrokeHistory, setKeystrokeHistory] = useState<Array<{ pattern: string; match: any }>>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
        setPressedKeys((prev) => new Set([...Array.from(prev), e.key.toLowerCase()]));
        setCurrentPattern((prev) => updateBinaryPattern(e.key, prev));

        const pattern = currentPattern.join("");
        const match = findBrailleMatch(pattern);
        if (match) {
          setCurrentMatch(match);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
        const newPressedKeys = new Set(pressedKeys);
        newPressedKeys.delete(e.key.toLowerCase());
        setPressedKeys(newPressedKeys);

        if (newPressedKeys.size === 0) {
          const currentPatternStr = currentPattern.join("");
          const lastEntry = keystrokeHistory[keystrokeHistory.length - 1];

          if (lastEntry?.match.keystroke.length > 1) {
            const combinedMatch = findCombinedBrailleMatch(lastEntry.pattern, currentPatternStr);
            if (combinedMatch) {
              setKeystrokeHistory((prev) => [
                ...prev.slice(0, -1),
                {
                  pattern: [lastEntry.pattern, currentPatternStr].join(","),
                  match: combinedMatch,
                },
              ]);
              setCurrentPattern(Array(6).fill("0"));
              setCurrentMatch(null);
              return;
            }
          }

          const singleMatch = findBrailleMatch(currentPatternStr);
          if (singleMatch) {
            setKeystrokeHistory((prev) => [
              ...prev,
              {
                pattern: currentPatternStr,
                match: singleMatch,
              },
            ]);
          }

          setCurrentPattern(Array(6).fill("0"));
          setCurrentMatch(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys, currentPattern, keystrokeHistory]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game</h1>
        <p className="mb-2">Use keys: S D F J K L</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        {currentMatch && (
          <>
            <BrailleFont>{currentMatch.brailleText}</BrailleFont>
            <p>{currentMatch.symbol || currentMatch.title}</p>
          </>
        )}
      </div>

      <div className="mt-4">
        <p>Current Pattern: {currentPattern.join("")}</p>
        <p>Currently pressed: {Array.from(pressedKeys).join(", ")}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl mb-2">Keystroke History:</h2>
        <div className="flex flex-col gap-2">
          {keystrokeHistory.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <BrailleFont>{entry.match.brailleText}</BrailleFont>
              <span>{entry.match.symbol || entry.match.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
