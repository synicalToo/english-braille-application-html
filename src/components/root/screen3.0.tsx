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
  const [typingBoard, setTypingBoard] = useState<Array<{ unicode: string; display: string }>>([]);

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  useEffect(() => {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    if (storedAudioEnabled) {
      setAudioEnabled(storedAudioEnabled === "true");
    }

    const handleAudioSettingsChange = (e: CustomEvent) => {
      setAudioEnabled(e.detail);
    };

    window.addEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    return () => {
      window.removeEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
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

        if (updatedInput.size === 0) {
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
                display: matchingResult.symbol || matchingResult.title,
              },
            ]);
            speakText(matchingResult.title, audioEnabled);
          } else {
            setCombinedPatternHistory((prev) => [...prev, combinedEncoding]);
            setTypingBoard((prev) => [
              ...prev,
              {
                unicode: brailleUnicode[combinedEncoding],
                display: "",
              },
            ]);
          }
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
        <div className="flex flex-wrap gap-2 border-b border-gray-300 items-start pb-2">
          {typingBoard.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end">
              <BrailleFont>{item.unicode}</BrailleFont>
              <p className="text-xs">{item.display}</p>
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
          </div>
        </div>
      )}
    </div>
  );
}
