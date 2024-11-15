"use client";

import { useState, useEffect } from "react";
import { typingMode } from "@/lib/constants";
import { AllBrailleUnicode, combinedEncoding, uebEncoding } from "@/contents/en/brailleData";

const keyToDotMap: { [key: string]: number } = {
  f: 0,
  d: 1,
  s: 2,
  j: 3,
  k: 4,
  l: 5,
};

function getHighestMatchingBrailleCount(pattern: string, userInputHistory: string[]) {
  let highestMatch = 1;
  for (const category in uebEncoding) {
    for (const entry in uebEncoding[category].content) {
      const item = uebEncoding[category].content[entry];
      const keystroke = item.keystroke;

      let count = 0;
      for (let i = 0; i < keystroke.length; i++) {
        if (keystroke[0] !== pattern) break;
        if (keystroke[i] === pattern) {
          count++;
        }
      }
      highestMatch = Math.max(highestMatch, count);
    }
  }
  return highestMatch;
}

function encodeUserInput(key: string, inputMapping: string[]): string[] {
  const dotIndex = keyToDotMap[key.toLowerCase()];
  if (dotIndex !== undefined) {
    const newEncodedInput = [...inputMapping];
    newEncodedInput[dotIndex] = "1";
    return newEncodedInput;
  }
  return inputMapping;
}

function findBrailleMatch(pattern: string, userInputHistory: string[]) {
  const historyToCheck = [...userInputHistory, pattern];
  // const highestMatch = getHighestMatchingBrailleCount(pattern, userInputHistory);

  for (const entry in combinedEncoding) {
    const keystroke = combinedEncoding[entry].keystroke;

    const lastInputs = historyToCheck.slice(-keystroke.length);

    if (lastInputs.length === keystroke.length) {
      if (keystroke.every((k, i) => k === lastInputs[i])) {
        return combinedEncoding[entry];
      }
    }
  }
  return null;
}

export function ScreenTwo() {
  const [inputMapping, setInputMapping] = useState<string[]>(Array(6).fill("0"));
  const [savedUserInput, setSavedUserInput] = useState<Set<string>>(new Set());
  const [currentUserInput, setCurrentUserInput] = useState<Set<string>>(new Set());
  const [currentTypingMode, setCurrentTypingMode] = useState<string>(typingMode.alphabet);

  const [typingModeHistory, setTypingModeHistory] = useState<string[]>([typingMode.alphabet]);
  const [userInputHistory, setUserInputHistory] = useState<string[]>([]);

  const [typingBoard, setTypingBoard] = useState();
  const [displayBoard, setDisplayBoard] = useState();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        setCurrentUserInput((prev) => new Set([...Array.from(prev), event.key.toLowerCase()]));
        setSavedUserInput((prev) => new Set([...Array.from(prev), event.key.toLowerCase()]));
        setInputMapping((prevMapping) => encodeUserInput(event.key, prevMapping));
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedUserInput = new Set(currentUserInput);
        updatedUserInput.delete(event.key.toLowerCase());
        setCurrentUserInput(updatedUserInput);

        if (updatedUserInput.size === 0) {
          const encodedInputString = inputMapping.join("");

          const brailleMatch = findBrailleMatch(encodedInputString, userInputHistory);

          setUserInputHistory((prev) => [...prev, encodedInputString]);

          if (brailleMatch) {
            console.log("Match found:", brailleMatch.title);
          }

          setInputMapping(Array(6).fill("0"));
          setSavedUserInput(new Set());
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [inputMapping, userInputHistory, currentUserInput]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game 2.0</h1>
      </div>

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board 2.0</h2>
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-mono">Currently pressed keys: {Array.from(currentUserInput).join(", ")}</p>
            <p className="font-mono">key pressed: {savedUserInput}</p>
            <p className="font-mono">Input mapping: {inputMapping.join("")}</p>
            <p className="font-mono">History: {userInputHistory.join(" | ")}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 rounded-lg"></div>

      <div className="mt-2 flex items-center gap-2 p-2 rounded">
        <div className="flex gap-2">
          {Object.values(typingMode).map((value) => (
            <span
              key={value}
              className={`px-3 py-1 rounded-md text-sm cursor-default
                  ${currentTypingMode === value ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
