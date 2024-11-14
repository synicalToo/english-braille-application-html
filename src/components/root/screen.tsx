"use client";

import { useState, useEffect } from "react";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { findBrailleMatch, keyToDotMap, updateBinaryPattern, findCombinedBrailleMatch } from "@/utils/gameplayUtils";
import { AllBrailleUnicode, BrailleEncodings } from "@/contents/en/brailleData";
import { speakText } from "@/utils/audioUtils";
import { TypingMode } from "@/lib/constants";

const MAX_DISPLAY_ROWS = 5;

export default function Screen() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [currentPattern, setCurrentPattern] = useState<string[]>(Array(6).fill("0"));
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [keystrokeHistory, setKeystrokeHistory] = useState<Array<{ pattern: string; match: any; mode: TypingMode }>>([]);
  const [completedText, setCompletedText] = useState<Array<{ pattern: string; match: any; mode: TypingMode }>>([]);
  const [displayBoard, setDisplayBoard] = useState<Array<Array<{ pattern: string; match: any; mode: TypingMode }>>>([]);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("audioEnabled");
      return stored ? stored === "true" : true;
    }
    return true;
  });
  const [currentTypingMode, setCurrentTypingMode] = useState<TypingMode>(TypingMode.Alphabets);
  const [modeHistory, setModeHistory] = useState<TypingMode[]>([TypingMode.Alphabets]);

  const getSpeechText = (match: any) => {
    if (!match) return "";
    if (match.title?.includes("Capital Word") || match.title?.includes("Capital Passage")) {
      return match.title + " indicator";
    }
    if (match.title && (match.symbol || match.title.includes("indicator") || match.title.includes("parentheses") || match.title.includes("bracket") || match.title.includes("quotation"))) {
      return match.title;
    }
    return match.title;
  };

  const findMatchForCurrentMode = (pattern: string, checkCombined = false) => {
    const brailleText = AllBrailleUnicode[pattern] || "⠀";

    if (checkCombined) {
      const lastEntries = keystrokeHistory.slice(-2); // Get last 2 entries
      const patterns = lastEntries.map((entry) => entry.pattern);
      patterns.push(pattern); // Add current pattern

      // Check for multi-keystroke patterns (3 or more)
      for (const category in BrailleEncodings) {
        const multiMatch = BrailleEncodings[category].find((item) => {
          if (item.keystroke.length >= 3) {
            // Check if the last N patterns match the keystroke sequence
            const lastN = patterns.slice(-item.keystroke.length);
            return item.keystroke.every((k, i) => k === lastN[i]);
          }
          return false;
        });

        if (multiMatch) {
          return { ...multiMatch, brailleText };
        }

        // Check for 2-keystroke patterns
        const combinedMatch = BrailleEncodings[category].find((item) => item.keystroke.length === 2 && item.keystroke[0] === lastEntries[lastEntries.length - 1]?.pattern && item.keystroke[1] === pattern);

        if (combinedMatch) {
          return { ...combinedMatch, brailleText };
        }
      }
      return null;
    }

    // Check indicators first
    const indicatorMatch = BrailleEncodings.Indicators.find((item) => item.keystroke.length === 1 && item.keystroke[0] === pattern);
    if (indicatorMatch) {
      return {
        ...indicatorMatch,
        brailleText,
      };
    }

    // Check punctuation
    const punctuationMatch = BrailleEncodings.Punctuation.find((item) => item.keystroke.length === 1 && item.keystroke[0] === pattern);
    if (punctuationMatch) {
      return { ...punctuationMatch, brailleText };
    }

    // Check currency and measurement
    const currencyMatch = BrailleEncodings["Currency and Measurement"].find((item) => item.keystroke.length === 1 && item.keystroke[0] === pattern);
    if (currencyMatch) {
      return { ...currencyMatch, brailleText };
    }

    // Check special symbols
    const specialMatch = BrailleEncodings["Special Symbols"].find((item) => item.keystroke.length === 1 && item.keystroke[0] === pattern);
    if (specialMatch) {
      return { ...specialMatch, brailleText };
    }

    // Check current mode matches
    if (currentTypingMode === TypingMode.Numbers) {
      const numberMatch = BrailleEncodings.Numbers.find((item) => item.keystroke.length === 1 && item.keystroke[0] === pattern);
      if (numberMatch) {
        return {
          ...numberMatch,
          brailleText,
        };
      }
    }

    // Check alphabets
    const alphabetMatch = BrailleEncodings.Alphabets.find((item) => item.keystroke.length === 1 && item.keystroke[0] === pattern);
    if (alphabetMatch) {
      if (currentTypingMode === TypingMode.Capital || currentTypingMode === TypingMode["Capital Word"]) {
        return {
          ...alphabetMatch,
          symbol: undefined,
          title: alphabetMatch.title?.toUpperCase(),
          brailleText,
        };
      }
      return {
        ...alphabetMatch,
        brailleText,
      };
    }

    // If no match found, return pattern with unicode
    return {
      keystroke: [pattern],
      brailleText,
      isUnmatched: true,
      title: "",
    };
  };

  const getDisplayText = (entry: { pattern: string; match: any; mode: TypingMode }) => {
    if (entry.match.isUnmatched) return "";
    if (entry.pattern === "000000") return " ";

    // Show indicators without capitalization
    if (entry.match.title?.includes("indicator") || entry.pattern === "000001") {
      return entry.match.title;
    }

    // For Capital Word indicator, show the title without capitalizing
    if (entry.pattern === "000001000001") {
      return entry.match.title;
    }

    // Use the stored mode from when the character was typed
    if (entry.mode === TypingMode.Numbers) {
      const numberMatch = BrailleEncodings.Numbers.find((item) => item.keystroke[0] === entry.pattern);
      if (numberMatch) return numberMatch.title;
    }

    const text = entry.match.symbol || entry.match.title;
    if ((entry.mode === TypingMode.Capital || entry.mode === TypingMode["Capital Word"]) && !entry.match.title?.includes("indicator")) {
      return text.toUpperCase();
    }
    return text;
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
          // Always reset to Alphabets mode on Enter
          setCurrentTypingMode(TypingMode.Alphabets);
          setModeHistory([TypingMode.Alphabets]);
          if (audioEnabled) {
            const lineText = keystrokeHistory.map((entry) => getSpeechText(entry.match)).join(" ");
            speakText(lineText, audioEnabled);
          }
          updateDisplayBoard(keystrokeHistory);
          setKeystrokeHistory([]);
        }
        return;
      } else if (e.key === "Backspace") {
        e.preventDefault();
        // Remove the last entry from keystroke history
        setKeystrokeHistory((prev) => {
          const newHistory = prev.slice(0, -1);

          // Determine the mode based on remaining keystrokes
          if (newHistory.length > 0) {
            const lastEntry = newHistory[newHistory.length - 1];
            if (lastEntry.pattern === "000001") {
              // If last keystroke is capital indicator, set to Capital mode
              setCurrentTypingMode(TypingMode.Capital);
              setModeHistory((prev) => [...prev.slice(0, -1), TypingMode.Capital]);
            } else if (lastEntry.pattern === "001111") {
              // If last keystroke is number indicator, set to Numbers mode
              setCurrentTypingMode(TypingMode.Numbers);
              setModeHistory((prev) => [...prev.slice(0, -1), TypingMode.Numbers]);
            } else {
              // Check for Caps Lock (two consecutive capital indicators)
              const secondLastEntry = newHistory.length > 1 ? newHistory[newHistory.length - 2] : null;
              if (secondLastEntry?.pattern === "000001" && lastEntry.pattern === "000001") {
                setCurrentTypingMode(TypingMode["Capital Word"]);
                setModeHistory((prev) => [...prev.slice(0, -1), TypingMode["Capital Word"]]);
              }
            }
          } else {
            // Reset to Alphabets if no keystrokes remain
            setCurrentTypingMode(TypingMode.Alphabets);
            setModeHistory([TypingMode.Alphabets]);
          }

          return newHistory;
        });

        if (audioEnabled && keystrokeHistory.length > 0) {
          speakText("backspace", audioEnabled);
        }
        return;
      } else if (e.key === " ") {
        e.preventDefault();
        if (keystrokeHistory.length === 0) return;

        // Always reset to Alphabets mode when space is pressed
        setCurrentTypingMode(TypingMode.Alphabets);
        setModeHistory([TypingMode.Alphabets]);

        const spacePattern = "000000";
        const spaceMatch = {
          ...BrailleEncodings.Alphabets.find((item) => item.keystroke[0] === spacePattern),
          brailleText: AllBrailleUnicode[spacePattern] || "⠀",
        };

        if (spaceMatch) {
          setKeystrokeHistory((prev) => [
            ...prev,
            {
              pattern: spacePattern,
              match: spaceMatch,
              mode: currentTypingMode,
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

        // Remove the match finding and setting during typing
        // const pattern = currentPattern.join("");
        // const match = findBrailleMatch(pattern);
        // if (match) {
        //   setCurrentMatch(match);
        // }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") return;
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
        const newPressedKeys = new Set(pressedKeys);
        newPressedKeys.delete(e.key.toLowerCase());
        setPressedKeys(newPressedKeys);

        if (newPressedKeys.size === 0) {
          const currentPatternStr = currentPattern.join("");
          const initialMatch = findMatchForCurrentMode(currentPatternStr);

          // Handle Capital modes activation
          if (currentPatternStr === "000001" && initialMatch) {
            // Get last entries to check for capital indicators
            const lastEntries = keystrokeHistory.slice(-2);
            const capitalIndicators = lastEntries.filter((entry) => entry.pattern === "000001").length;

            if (capitalIndicators === 2) {
              // Two previous capital indicators
              const newEntry = {
                pattern: "000001000001000001",
                match: {
                  ...initialMatch,
                  title: "Capital Passage",
                  groupedBraille: [...lastEntries.map((e) => e.match.brailleText), initialMatch.brailleText],
                },
                mode: TypingMode["Capital Passage"],
              };

              setKeystrokeHistory((prev) => [...prev.slice(0, -2), newEntry]);
              setCurrentTypingMode(TypingMode["Capital Passage"]);
              setModeHistory((prev) => [...prev, TypingMode["Capital Passage"]]);

              if (audioEnabled) speakText("Capital Passage", audioEnabled);
            } else if (capitalIndicators === 1) {
              // One previous capital indicator
              const newEntry = {
                pattern: "000001000001",
                match: {
                  ...initialMatch,
                  title: "Capital Word",
                  groupedBraille: [lastEntries[lastEntries.length - 1].match.brailleText, initialMatch.brailleText],
                },
                mode: TypingMode["Capital Word"],
              };

              setKeystrokeHistory((prev) => [...prev.slice(0, -1), newEntry]);
              setCurrentTypingMode(TypingMode["Capital Word"]);
              setModeHistory((prev) => [...prev, TypingMode["Capital Word"]]);

              if (audioEnabled) speakText("Capital Word", audioEnabled);
            } else {
              // Single capital indicator
              setKeystrokeHistory((prev) => [
                ...prev,
                {
                  pattern: currentPatternStr,
                  match: initialMatch,
                  mode: TypingMode.Capital,
                },
              ]);
              setCurrentTypingMode(TypingMode.Capital);
              setModeHistory((prev) => [...prev, TypingMode.Capital]);

              if (audioEnabled) speakText("Capital Letter", audioEnabled);
            }

            setCurrentPattern(Array(6).fill("0"));
            setCurrentMatch(null);
            return;
          }

          // Handle regular input in Capital modes
          if ([TypingMode.Capital, TypingMode["Capital Word"], TypingMode["Capital Passage"]].includes(currentTypingMode)) {
            const isSymbol =
              (initialMatch && "symbol" in initialMatch ? initialMatch.symbol : false) ||
              BrailleEncodings.Punctuation.some((p) => p.keystroke[0] === currentPatternStr) ||
              BrailleEncodings["Special Symbols"].some((s) => s.keystroke[0] === currentPatternStr) ||
              BrailleEncodings["Currency and Measurement"].some((c) => c.keystroke[0] === currentPatternStr);

            if (isSymbol) {
              // Don't capitalize symbols and reset mode if in Capital mode
              if (currentTypingMode === TypingMode.Capital) {
                setCurrentTypingMode(TypingMode.Alphabets);
                setModeHistory([TypingMode.Alphabets]);
              }
              setKeystrokeHistory((prev) => [
                ...prev,
                {
                  pattern: currentPatternStr,
                  match: initialMatch,
                  mode: TypingMode.Alphabets,
                },
              ]);
            } else {
              // Capitalize the character
              setKeystrokeHistory((prev) => [
                ...prev,
                {
                  pattern: currentPatternStr,
                  match: {
                    ...initialMatch,
                    title: initialMatch?.title?.toUpperCase(),
                  },
                  mode: currentTypingMode,
                },
              ]);

              // Reset mode if in Capital mode (single letter)
              if (currentTypingMode === TypingMode.Capital) {
                setCurrentTypingMode(TypingMode.Alphabets);
                setModeHistory([TypingMode.Alphabets]);
              }
            }

            if (audioEnabled && initialMatch) {
              speakText(getSpeechText(initialMatch), audioEnabled);
            }

            setCurrentPattern(Array(6).fill("0"));
            setCurrentMatch(null);
            return;
          }

          // Handle all other cases (standard input)
          const combinedMatch = findMatchForCurrentMode(currentPatternStr, true);

          if (combinedMatch) {
            // Handle combined match with speech
            const textToSpeak = getSpeechText(combinedMatch);
            if (audioEnabled && textToSpeak) {
              speakText(textToSpeak, audioEnabled);
            }
            // Continue with existing combined match handling...
            const prevEntries = keystrokeHistory.slice(-(combinedMatch.keystroke.length - 1));
            const groupedBraille = [...prevEntries.map((entry) => entry.match.brailleText), initialMatch?.brailleText ?? "⠀"];

            setKeystrokeHistory((prev) => [
              ...prev.slice(0, -(combinedMatch.keystroke.length - 1)),
              {
                pattern: currentPatternStr,
                match: {
                  ...combinedMatch,
                  groupedBraille,
                  brailleText: initialMatch?.brailleText || "⠀",
                },
                mode: currentTypingMode,
              },
            ]);
          } else {
            // Only speak the single character if no combined match was found
            if (audioEnabled && initialMatch) {
              const textToSpeak = getSpeechText(initialMatch);
              if (textToSpeak) {
                speakText(textToSpeak, audioEnabled);
              }
            }

            // Continue with existing single character handling...
            // Check for Capital modes activation
            if (currentPatternStr === "000001" && initialMatch) {
              // Get last three entries to check for triple capital indicator
              const lastThree = keystrokeHistory.slice(-2);

              // Count consecutive capital indicators
              let consecutiveCapitalCount = lastThree.filter((entry) => entry.pattern === "000001").length;
              // Add current pattern if it's a capital indicator
              if (currentPatternStr === "000001") consecutiveCapitalCount++;

              // Check for Capital Passage (three consecutive capital indicators)
              if (consecutiveCapitalCount === 3) {
                const newEntry = {
                  pattern: "000001000001000001",
                  match: {
                    ...initialMatch,
                    title: "Capital Passage",
                    groupedBraille: [...lastThree.map((e) => e.match.brailleText), initialMatch.brailleText],
                  },
                  mode: TypingMode["Capital Passage"],
                };

                setKeystrokeHistory((prev) => [...prev.slice(0, -2), newEntry]);
                setCurrentTypingMode(TypingMode["Capital Passage"]);
                setModeHistory((prev) => [...prev, TypingMode["Capital Passage"]]);

                if (audioEnabled) {
                  speakText("Capital Passage", audioEnabled);
                }

                setCurrentPattern(Array(6).fill("0"));
                setCurrentMatch(null);
                return;
              }

              // Check for Capital Word (two consecutive capital indicators)
              if (consecutiveCapitalCount === 2) {
                const newEntry = {
                  pattern: "000001000001",
                  match: {
                    ...initialMatch,
                    title: "Capital Word",
                    groupedBraille: [lastThree[lastThree.length - 1].match.brailleText, initialMatch.brailleText],
                  },
                  mode: TypingMode["Capital Word"],
                };

                setKeystrokeHistory((prev) => [...prev.slice(0, -1), newEntry]);
                setCurrentTypingMode(TypingMode["Capital Word"]);
                setModeHistory((prev) => [...prev, TypingMode["Capital Word"]]);

                if (audioEnabled) {
                  speakText("Capital Word", audioEnabled);
                }

                setCurrentPattern(Array(6).fill("0"));
                setCurrentMatch(null);
                return;
              }
            }

            // Regular input handling for Capital modes
            if ((currentTypingMode === TypingMode["Capital Word"] || currentTypingMode === TypingMode["Capital Passage"]) && initialMatch && !initialMatch.title?.includes("indicator")) {
              // Check if the match is a symbol (has symbol property or is punctuation/special/currency)
              const isSymbol =
                ("symbol" in initialMatch && initialMatch.symbol) ||
                BrailleEncodings.Punctuation.some((p) => p.keystroke[0] === currentPatternStr) ||
                BrailleEncodings["Special Symbols"].some((s) => s.keystroke[0] === currentPatternStr) ||
                BrailleEncodings["Currency and Measurement"].some((c) => c.keystroke[0] === currentPatternStr);

              if (isSymbol && currentTypingMode === TypingMode["Capital Word"]) {
                // Reset to Alphabets mode for symbols in Capital Word mode
                setCurrentTypingMode(TypingMode.Alphabets);
                setModeHistory([TypingMode.Alphabets]);
              }

              const match = {
                ...initialMatch,
                title: !isSymbol ? initialMatch.title?.toUpperCase() : initialMatch.title,
              };
              setKeystrokeHistory((prev) => [
                ...prev,
                {
                  pattern: currentPatternStr,
                  match,
                  mode: isSymbol ? TypingMode.Alphabets : currentTypingMode,
                },
              ]);
            } else {
              // Rest of the combined match handling
              if (!handleCombinedMatch(currentPatternStr, initialMatch)) {
                setKeystrokeHistory((prev) => [
                  ...prev,
                  {
                    pattern: currentPatternStr,
                    match: initialMatch,
                    mode: currentTypingMode,
                  },
                ]);

                // Handle mode switching
                if (currentPatternStr === "001111") {
                  setCurrentTypingMode(TypingMode.Numbers);
                  setModeHistory((prev) => [...prev, TypingMode.Numbers]);
                } else if (currentPatternStr === "000001") {
                  setCurrentTypingMode(TypingMode.Capital);
                  setModeHistory((prev) => [...prev, TypingMode.Capital]);
                } else if (currentTypingMode !== TypingMode["Capital Word"] && currentTypingMode !== TypingMode["Capital Passage"]) {
                  setCurrentTypingMode(TypingMode.Alphabets);
                  setModeHistory([TypingMode.Alphabets]);
                }
              }
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
  }, [pressedKeys, currentPattern, keystrokeHistory, audioEnabled, currentTypingMode, modeHistory]);

  const handleCombinedMatch = (currentPatternStr: string, initialMatch: any) => {
    const combinedMatch = findMatchForCurrentMode(currentPatternStr, true);
    if (combinedMatch) {
      const prevEntries = keystrokeHistory.slice(-(combinedMatch.keystroke.length - 1));
      const groupedBraille = [...prevEntries.map((entry) => entry.match.brailleText), initialMatch.brailleText];

      setKeystrokeHistory((prev) => [
        ...prev.slice(0, -(combinedMatch.keystroke.length - 1)),
        {
          pattern: currentPatternStr,
          match: {
            ...combinedMatch,
            groupedBraille,
            brailleText: initialMatch.brailleText,
          },
          mode: currentTypingMode,
        },
      ]);

      if (audioEnabled) {
        const textToSpeak = getSpeechText(combinedMatch);
        if (textToSpeak) {
          speakText(textToSpeak, audioEnabled);
        }
      }
      return true;
    }
    return false;
  };

  const updateDisplayBoard = (newRow: Array<{ pattern: string; match: any; mode: TypingMode }>) => {
    setDisplayBoard((prevBoard) => {
      const updatedBoard = [...prevBoard, newRow.map((entry) => ({ ...entry, mode: entry.mode || TypingMode.Alphabets }))];
      return updatedBoard.slice(-MAX_DISPLAY_ROWS);
    });
  };

  const getLineText = (line: Array<{ pattern: string; match: any; mode: TypingMode }>) => {
    return line.map((entry) => getDisplayText(entry)).join("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game</h1>
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

      <div className="w-full max-w-4xl p-4 rounded-lg">
        {completedText.map((entry, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap gap-2 mb-2">
            <BrailleFont>{entry.match.brailleText}</BrailleFont>
            <span className="text-sm self-end">{entry.match.symbol || entry.match.title}</span>
          </div>
        ))}

        <div className="flex flex-wrap gap-2 min-h-[60px] border-b border-gray-300">
          {keystrokeHistory.map((entry, index) => (
            <div key={index} className="flex flex-col items-center">
              {entry.match.groupedBraille ? (
                <div className="flex items-center gap-1">
                  {entry.match.groupedBraille.map((braille: string, i: number) => (
                    <BrailleFont key={i}>{braille}</BrailleFont>
                  ))}
                </div>
              ) : (
                <BrailleFont>{entry.match.brailleText}</BrailleFont>
              )}
              <span className="text-sm text-center mt-1">{getDisplayText(entry)}</span>
            </div>
          ))}
          <BrailleFont showCursor>⠀</BrailleFont>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 p-2 rounded">
        <div className="flex gap-2">
          {Object.keys(TypingMode)
            .filter((key) => isNaN(Number(key)))
            .map((mode) => (
              <span
                key={mode}
                className={`px-3 py-1 rounded-md text-sm cursor-default
                  ${currentTypingMode === TypingMode[mode as keyof typeof TypingMode] ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
              >
                {mode}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
