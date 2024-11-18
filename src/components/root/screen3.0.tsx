"use client";

import { BrailleFont } from "@/components/customUI/brailleFont";
import { useEffect, useState } from "react";
import { findBrailleMatch, findHighestMatchingPatternCount } from "@/utils/gameUtils";
import { typingMode } from "@/lib/constants";
import { brailleUnicode } from "@/contents/en/customBrailleData";

const keyToDotMap: { [key: string]: number } = {
  f: 0,
  d: 1,
  s: 2,
  j: 3,
  k: 4,
  l: 5,
};

const debug = true;

export function ScreenThree() {
  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  const [currentTypingMode, setCurrentTypingMode] = useState<string[]>([typingMode.alphabet]);
  const [typingModeHistory, setTypingModeHistory] = useState<string[]>([typingMode.alphabet]);

  const [combinedPatternHistory, setCombinedPatternHistory] = useState<string[]>([]);
  const [highestPatternCount, setHighestPatternCount] = useState<number>(0);

  // Add new state for matches
  const [matchedItems, setMatchedItems] = useState<Array<{ unicode: string; display: string }>>([]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (Object.keys(keyToDotMap).includes(event.key)) {
        setCurrentInput((prev) => new Set([...Array.from(prev), event.key.toLowerCase()]));
        setRegisteredInput((prev) => {
          const dotIndex = keyToDotMap[event.key.toLowerCase()];
          if (dotIndex !== undefined) {
            const newRegisteredInput = [...prev];
            newRegisteredInput[dotIndex] = (dotIndex + 1).toString();
            return newRegisteredInput;
          }
          return prev;
        });
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(event.key.toLowerCase());
        setCurrentInput(updatedInput);

        if (updatedInput.size === 0) {
          const combinedEncoding = registeredInput.join("");
          setRegisteredInput(Array(6));
          setInputHistory((prev) => [...prev, combinedEncoding]);

          const newCombinedHistory = [...combinedPatternHistory, combinedEncoding];
          let potentialCombination = "";
          let matchingResult;

          for (let i = newCombinedHistory.length - 1; i >= 0; i--) {
            potentialCombination = newCombinedHistory.slice(i).join(",");
            matchingResult = findBrailleMatch(potentialCombination, inputHistory);
            if (matchingResult) break;
          }

          if (matchingResult) {
            setCombinedPatternHistory((prev) => [...prev, potentialCombination]);
            // Add matched item
            setMatchedItems((prev) => [
              ...prev,
              {
                unicode: brailleUnicode[combinedEncoding],
                display: matchingResult.symbol || matchingResult.title,
              },
            ]);
            console.log(matchingResult);
          } else {
            setCombinedPatternHistory((prev) => [...prev, combinedEncoding]);
            setMatchedItems((prev) => [
              ...prev,
              {
                unicode: brailleUnicode[combinedEncoding],
                display: "",
              },
            ]);
          }

          setHighestPatternCount(findHighestMatchingPatternCount(combinedEncoding));
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [currentInput, registeredInput, combinedPatternHistory, inputHistory]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game 3.0</h1>
      </div>

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board 3.0</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">Braille</div>
            <p className="text-sm pl-1 whitespace-pre">Display text</p>
          </div>
        </div>
      </div>

      <div id="typing-board" className="w-full max-w-4xl p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 min-h-[60px] border-b border-gray-300">
          {matchedItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <BrailleFont>{item.unicode}</BrailleFont>
              <p className="text-xs">{item.display}</p>
            </div>
          ))}
          <BrailleFont showCursor>⠀</BrailleFont>
        </div>
      </div>

      <div id="typing-mode" className="mt-2 flex items-center gap-2 p-2 rounded">
        <div className="flex gap-2"></div>
      </div>

      {debug && (
        <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg mt-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Debug</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm">Registered Input</h3>
              <div className="flex space-x-2">
                {registeredInput &&
                  registeredInput.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm">Combined Patterns</h3>
              <p>{combinedPatternHistory.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm">Highest Pattern Count</h3>
              <p>{highestPatternCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
