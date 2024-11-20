"use client";

import { useEffect, useState } from "react";

import { keyToDotMap, typingMode } from "@/lib/constants";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { brailleUnicode } from "@/contents/en/customBrailleData";

import { speakText } from "@/utils/audioUtils";
import { findBrailleMatch } from "@/utils/gameUtils";

const debug = true;

export function ScreenThree() {
  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  const [currentTypingMode, setCurrentTypingMode] = useState<string>(typingMode.alphabet);
  const [typingModeHistory, setTypingModeHistory] = useState<string[]>([typingMode.alphabet]);

  const [combinedPatternHistory, setCombinedPatternHistory] = useState<string[]>([]);
  const [typingBoard, setTypingBoard] = useState<{ unicode: string; text: string }[]>([]);
  const [displayBoard, setDisplayBoard] = useState<{ unicode: string; text: string }[][]>([]);

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  useEffect(() => {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    if (storedAudioEnabled) {
      setAudioEnabled(storedAudioEnabled === "true");
    }

    const handleAudioSettingsChange = (event: CustomEvent) => {
      setAudioEnabled(event.detail);
    };

    window.addEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    return () => {
      window.removeEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      switch (event.key.toLowerCase()) {
        case "enter":
          if (typingBoard.length > 0) {
            const sentence = typingBoard.map((item) => item.text).join(" ");
            setDisplayBoard((prev) => {
              const newBoard = [...prev, [...typingBoard]];
              return newBoard.slice(-5);
            });

            setTypingBoard([]);
            setInputHistory([]);
            setCombinedPatternHistory([]);

            speakText(sentence, audioEnabled);
          }
          break;
        case "backspace":
          if (typingBoard.length > 0) {
            setCombinedPatternHistory((prev) => prev.slice(0, -1));
            setTypingBoard((prev) => prev.slice(0, -1));
            setInputHistory((prev) => prev.slice(0, -1));

            speakText("backspace", audioEnabled);
          }
          break;
        case " ":
          event.preventDefault();
          if (typingBoard.length > 0) {
            setInputHistory((prev) => [...prev, "0"]);
            setCombinedPatternHistory((prev) => [...prev, "0"]);
            setTypingBoard((prev) => [
              ...prev,
              {
                unicode: brailleUnicode["0"],
                text: " ",
              },
            ]);

            speakText("space", audioEnabled);
          }
          break;
        default:
          break;
      }

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

    const handleKeyup = (event: KeyboardEvent): void => {
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(event.key.toLowerCase());
        setCurrentInput(updatedInput);

        // start checking for potential braille match when user releases all keys
        if (updatedInput.size != 0) return;

        const combinedEncoding = registeredInput.join("");
        setRegisteredInput(Array(6));
        setInputHistory((prev) => [...prev, combinedEncoding]);

        const newCombinedHistory = [...combinedPatternHistory, combinedEncoding];
        let potentialCombination: string = "";
        let matchingResult: { title: string; keystroke: string[]; symbol?: string } | null = null;

        for (let i = newCombinedHistory.length - 1; i >= 0; i--) {
          potentialCombination = newCombinedHistory.slice(i).join(",");
          matchingResult = findBrailleMatch(potentialCombination, inputHistory);
          if (matchingResult) break;
        }

        if (matchingResult) {
          setCombinedPatternHistory((prev) => [...prev, potentialCombination]);
          setTypingBoard((prev) => [
            ...prev,
            {
              unicode: brailleUnicode[combinedEncoding],
              text: matchingResult.symbol || matchingResult.title,
            },
          ]);

          // TODO: handle repeating patterns that has a previous entry (captial word -> capital passage)
          if (matchingResult.keystroke.length > 1) {
            // for multi-stroke characters
            setCombinedPatternHistory((prev) => prev.slice(0, -matchingResult.keystroke.length));
            setInputHistory((prev) => prev.slice(0, -matchingResult.keystroke.length));
            setTypingBoard((prev) => prev.slice(0, -matchingResult.keystroke.length));

            setCombinedPatternHistory((prev) => [...prev, matchingResult.keystroke.join("")]);
            setInputHistory((prev) => [...prev, matchingResult.keystroke.join("")]);
            setTypingBoard((prev) => [
              ...prev,
              {
                unicode: matchingResult.keystroke.map((dots) => brailleUnicode[dots]).join(""),
                text: matchingResult.symbol || matchingResult.title,
              },
            ]);
          }

          speakText(matchingResult.title, audioEnabled);
        } else {
          setCombinedPatternHistory((prev) => [...prev, combinedEncoding]);
          setTypingBoard((prev) => [
            ...prev,
            {
              unicode: brailleUnicode[combinedEncoding],
              text: "",
            },
          ]);
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [currentInput]);

  return (
    <div className="flex flex-col items-center gap-4 rounded-md border-gray-400 border-2 min-w-[800px] max-w-[800px] min-h-[600px]">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game 3.0</h1>
      </div>

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board 3.0</h2>
        <div className="space-y-6">
          {displayBoard.map((line, lineIndex) => (
            <div key={lineIndex} className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {line.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col items-center justify-end">
                    <BrailleFont>{item.unicode}</BrailleFont>
                  </div>
                ))}
              </div>
              <p className="text-sm pl-1">{line.map((item) => item.text).join("")}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="typing-board" className="w-full max-w-4xl p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 border-b border-gray-300 items-start pb-2">
          {typingBoard.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end">
              <BrailleFont>{item.unicode}</BrailleFont>
              <p className="text-xs">{item.text}</p>
            </div>
          ))}
          <BrailleFont showCursor>⠀</BrailleFont>
        </div>
      </div>

      <div id="typing-mode" className="mt-2 flex items-center gap-2 p-2 rounded">
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

      {debug && (
        <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg mt-4 mb-4">
          <h2 className="text-xl text-center font-semibold mb-4">Debugger</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg">Registered Input:</h3>
              <div className="flex gap-2">
                {/* display braille font */}
                <BrailleFont>{brailleUnicode[registeredInput.join("")]}</BrailleFont>

                {/* display number representation */}
                {/* <div className="flex flex-col">
                  {registeredInput.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  {registeredInput.slice(3, 6).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
            <div>
              <h3 className="text-lg">Input History:</h3>
              <p>{combinedPatternHistory.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-lg">Typing Mode History:</h3>
              <p>{typingModeHistory.join(" | ")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
