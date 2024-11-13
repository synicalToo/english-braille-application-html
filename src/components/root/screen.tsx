"use client";

import { useState, useEffect } from "react";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { createBraillePattern, findBrailleMatch, keyToDotMap, updateBinaryPattern, findCombinedBrailleMatch } from "@/utils/gameplayUtils";
import { BrailleEncodings } from "@/contents/en/brailleData";

export default function Screen() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [currentPattern, setCurrentPattern] = useState<string[]>(Array(6).fill("0"));
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [keystrokeHistory, setKeystrokeHistory] = useState<Array<{ pattern: string; match: any }>>([]);
  const [completedText, setCompletedText] = useState<Array<{ pattern: string; match: any }>>([]);
  const [displayBoard, setDisplayBoard] = useState<Array<Array<{ pattern: string; match: any }>>>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (keystrokeHistory.length > 0) {
          setDisplayBoard((prev) => [...prev, keystrokeHistory]);
          setKeystrokeHistory([]);
        }
        return;
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setKeystrokeHistory((prev) => prev.slice(0, -1)); // Remove last character
        return;
      } else if (e.key === " ") {
        // Handle spacebar
        e.preventDefault(); // Prevent page scrolling
        const spacePattern = "000000";
        const spaceMatch = BrailleEncodings.Alphabets.find((item) => item.keystroke[0] === spacePattern);
        if (spaceMatch) {
          setKeystrokeHistory((prev) => [
            ...prev,
            {
              pattern: spacePattern,
              match: spaceMatch,
            },
          ]);
        }
        return;
      }
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
      if (e.key === " ") return; // Ignore keyUp for spacebar
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

  // Updated helper function to properly handle spaces
  const getLineText = (line: Array<{ pattern: string; match: any }>) => {
    return line
      .map((entry) => {
        // Check if it's a space character (pattern "000000")
        if (entry.pattern === "000000") {
          return " ";
        }
        return entry.match.symbol || entry.match.title;
      })
      .join("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game</h1>
        <p className="mb-2">Use keys: S D F J K L | Space for empty character | Press Enter for new line | Backspace to delete</p>
      </div>

      {/* Display Board */}
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board</h2>
        <div className="space-y-6">
          {displayBoard.map((line, lineIndex) => (
            <div key={lineIndex} className="space-y-2">
              {/* Braille characters */}
              <div className="flex flex-wrap gap-2">
                {line.map((entry, charIndex) => (
                  <BrailleFont key={`${lineIndex}-${charIndex}`}>{entry.match.brailleText}</BrailleFont>
                ))}
              </div>
              {/* Combined text below with proper space handling */}
              <p className="text-sm pl-1 whitespace-pre">{getLineText(line)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Text Display */}
      <div className="w-full max-w-4xl p-4 rounded-lg min-h-[200px]">
        {completedText.map((entry, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap gap-2 mb-2">
            <BrailleFont>{entry.match.brailleText}</BrailleFont>
            <span className="text-sm self-end">{entry.match.symbol || entry.match.title}</span>
          </div>
        ))}

        {/* Current Line with Cursor */}
        <div className="flex flex-wrap gap-2 min-h-[60px] border-b border-gray-300">
          {keystrokeHistory.map((entry, index) => (
            <div key={index} className="flex flex-col items-center">
              <BrailleFont>{entry.match.brailleText}</BrailleFont>
              <span className="text-sm">{entry.match.symbol || entry.match.title}</span>
            </div>
          ))}
          {currentMatch ? (
            <div className="flex flex-col items-center">
              <BrailleFont showCursor>{currentMatch.brailleText}</BrailleFont>
              <span className="text-sm">{currentMatch.symbol || currentMatch.title}</span>
            </div>
          ) : (
            <BrailleFont showCursor>⠀</BrailleFont>
          )}
        </div>
      </div>
    </div>
  );
}
