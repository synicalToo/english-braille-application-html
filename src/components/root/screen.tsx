"use client";

import { useState, useEffect } from "react";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { findBrailleMatch, keyToDotMap, updateBinaryPattern, findCombinedBrailleMatch } from "@/utils/gameplayUtils";
import { BrailleEncodings } from "@/contents/en/brailleData";
import { speakText } from "@/utils/audioUtils";

export default function Screen() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [currentPattern, setCurrentPattern] = useState<string[]>(Array(6).fill("0"));
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [keystrokeHistory, setKeystrokeHistory] = useState<Array<{ pattern: string; match: any }>>([]);
  const [completedText, setCompletedText] = useState<Array<{ pattern: string; match: any }>>([]);
  const [displayBoard, setDisplayBoard] = useState<Array<Array<{ pattern: string; match: any }>>>([]);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("audioEnabled");
      return stored ? stored === "true" : true;
    }
    return true;
  });

  // Helper function to get speech text
  const getSpeechText = (match: any) => {
    if (!match) return "";
    // Always use title for indicators, punctuation, and symbols
    if (match.title && (match.symbol || match.title.includes("indicator") || match.title.includes("parentheses") || match.title.includes("bracket") || match.title.includes("quotation"))) {
      return match.title;
    }
    // Use symbol or fallback to title for other cases
    return match.symbol || match.title;
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("audioEnabled");
      setAudioEnabled(stored === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (keystrokeHistory.length > 0) {
          // Speak the entire line before pushing to display board
          if (audioEnabled) {
            const lineText = keystrokeHistory.map((entry) => getSpeechText(entry.match)).join(" ");
            speakText(lineText, audioEnabled);
          }
          setDisplayBoard((prev) => [...prev, keystrokeHistory]);
          setKeystrokeHistory([]);
        }
        return;
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setKeystrokeHistory((prev) => prev.slice(0, -1));
        if (audioEnabled && keystrokeHistory.length > 0) {
          speakText("backspace", audioEnabled);
        }
        return;
      } else if (e.key === " ") {
        e.preventDefault();
        // Only allow space if it's not the first character
        if (keystrokeHistory.length === 0) return;

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
          if (audioEnabled) {
            speakText("space", audioEnabled);
          }
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
      if (e.key === " ") return;
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
        const newPressedKeys = new Set(pressedKeys);
        newPressedKeys.delete(e.key.toLowerCase());
        setPressedKeys(newPressedKeys);

        // Speak immediately when all keys are released
        if (newPressedKeys.size === 0) {
          const currentPatternStr = currentPattern.join("");
          const match = findBrailleMatch(currentPatternStr);

          if (match && audioEnabled) {
            const textToSpeak = getSpeechText(match);
            console.log("textToSpeak", textToSpeak);

            if (textToSpeak) {
              speakText(textToSpeak, audioEnabled);
            }
          }

          // Continue with existing pattern matching logic
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
            const textToSpeak = getSpeechText(singleMatch);
            if (textToSpeak) {
              speakText(textToSpeak, audioEnabled);
            }
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
  }, [pressedKeys, currentPattern, keystrokeHistory, audioEnabled]);

  const getLineText = (line: Array<{ pattern: string; match: any }>) => {
    return line
      .map((entry) => {
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

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board</h2>
        <div className="space-y-6">
          {displayBoard.map((line, lineIndex) => (
            <div key={lineIndex} className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {line.map((entry, charIndex) => (
                  <BrailleFont key={`${lineIndex}-${charIndex}`}>{entry.match.brailleText}</BrailleFont>
                ))}
              </div>
              <p className="text-sm pl-1 whitespace-pre">{getLineText(line)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 rounded-lg min-h-[200px]">
        {completedText.map((entry, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap gap-2 mb-2">
            <BrailleFont>{entry.match.brailleText}</BrailleFont>
            <span className="text-sm self-end">{entry.match.symbol || entry.match.title}</span>
          </div>
        ))}

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
