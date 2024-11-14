"use client";

import { useState, useEffect } from "react";
import { typingMode } from "@/lib/constants";

export function ScreenTwo() {
  const [currentUserInput, setCurrentUserInput] = useState<string[]>(Array(6).fill("0"));
  const [currentTypingMode, setCurrentTypingMode] = useState<string>(typingMode.alphabet);

  const [userInputHistory, setUserInputHistory] = useState<string[]>();
  const [typingModeHistory, setTypingModeHistory] = useState<string[]>([typingMode.alphabet]);

  const [typingBoard, setTypingBoard] = useState();
  const [displayBoard, setDisplayBoard] = useState();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {};

    const handleKeyup = (event: KeyboardEvent) => {};

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <div className="flex flex-col items-center   gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game 2.0</h1>
      </div>

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board 2.0</h2>
        <div className="space-y-6"></div>
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
