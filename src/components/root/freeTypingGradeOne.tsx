"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { keyToDotMap, TYPING_MODE_OPTIONS } from "@/lib/constants";
import { BrailleData, BrailleUnicode } from "@/contents/en/BrailleData";

import { speakText } from "@/utils/audioUtils";
import { findBrailleMatch, findNumberMatch } from "@/utils/gameUtils";

// set limit for typing board
const MAX_TYPING_LIMIT = 16;
interface GameAudio {
  limit_reached: HTMLAudioElement;
  next_line: HTMLAudioElement;
}

// change to true for debug menu
const DEBUG = false;

export default function FreeTypingGradeOne({ onBack }: { onBack: () => void }) {
  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [combinedPatternHistory, setCombinedPatternHistory] = useState<string[]>([]);
  const [inputPosition, setinputPosition] = useState(0);

  const [currentTypingMode, setCurrentTypingMode] = useState<string>("Alphabet");
  const [typingModeHistory, setTypingModeHistory] = useState<string[]>(["Alphabet"]);

  const [typingBoard, setTypingBoard] = useState<{ unicode: string; text: string; tts: string }[]>([]);
  const [displayBoard, setDisplayBoard] = useState<{ unicode: string; text: string }[][]>([]);

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const [gameAudio] = useState<GameAudio>({
    // initialise audio files for sound effects:
    limit_reached: new Audio("/audio/default/incorrect.mp3"), //hitting character limit on typing board
    next_line: new Audio("/audio/_typing.mp3"), //pushing typing board to display board ( enter key)
  });

  function playSound(audio: HTMLAudioElement) {
    if (!audio.paused) {
      return; // Do not play again if audio file already playing
    }
    audio.currentTime = 0; // Reset to the start
    audio.play(); // play audio
  }

  useEffect(() => {
    // retrieve audio settings stored
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    if (storedAudioEnabled) {
      setAudioEnabled(storedAudioEnabled === "true");
    }

    const handleAudioSettingsChange = (event: CustomEvent) => {
      //determine if user changed settings
      setAudioEnabled(event.detail);
    };

    window.addEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    return () => {
      window.removeEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (!gameAudio.limit_reached.paused) {
        gameAudio.limit_reached.pause();
        gameAudio.limit_reached.currentTime = 0;
      }

      switch (event.key.toLowerCase()) {
        case "enter":
          event.preventDefault();
          if (typingBoard.length > 0) {
            const sentence = typingBoard.map((item) => item.tts).join(""); // string inputs together for text-to-speech
            setDisplayBoard((prev) => {
              const newBoard = [...prev, [...typingBoard]];
              //set limit on how many lines display board shows
              return newBoard.slice(-4);
            });
            setRegisteredInput([]);
            setInputHistory([]);
            setCombinedPatternHistory([]);
            setTypingBoard([]);
            setTypingModeHistory([]);
            setinputPosition(0);

            setCurrentTypingMode("Alphabet");
            setTypingModeHistory((prev) => [...prev, "Alphabet"]);

            speakText(sentence, audioEnabled); // audio tts for stringed inputs
          }
          playSound(gameAudio.next_line);
          break;
        //Handle deletion of normal characters, and adjust typing mode based on indicators
        case "backspace":
          if (typingBoard.length > 0) {
            switch (typingBoard[inputHistory.length - 1].text) {
              case " ":
                if (typingModeHistory.length > 1) {
                  setTypingModeHistory((prev) => prev.slice(0, -1));
                  setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 2]);
                }
                break;
              case "Numeric":
              case "Capital letter":
                setTypingModeHistory((prev) => prev.slice(0, -1));
                if (currentTypingMode == "Number" || currentTypingMode == "Capital letter") {
                  setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 2]);
                }
                break;
              case "Capital word":
                setTypingModeHistory((prev) => prev.slice(0, -2));
                if (currentTypingMode == "Capital word") {
                  setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 3]);
                }
                break;
              case "Capital passage":
                setTypingModeHistory((prev) => prev.slice(0, -3));
                if (currentTypingMode == "Capital passage") {
                  setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 4]);
                }
                break;
              case "Capital terminator":
                setTypingModeHistory((prev) => prev.slice(0, -2));
                if (currentTypingMode == "Alphabet") {
                  setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 3]);
                }
                break;
              default:
                break;
            }
            //Handle capital letter: after backspace and if previous input is capital letter, set current typing mode to capital letter
            if (typingBoard[inputHistory.length - 2]?.text == "Capital letter" && currentTypingMode == "Alphabet" && typingBoard[inputHistory.length - 1].text != " ") {
              setTypingModeHistory((prev) => prev.slice(0, -1));
              setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 2]);
            }
            //Handle number mode: after backspace of e.g. comma, and the previous typing mode is number, set the current typing mode to number
            const content = BrailleData.numbers.content;
            for (const i in content) {
              if (typingBoard[inputHistory.length - 2]?.text == content[i].title && currentTypingMode == "Alphabet" && typingBoard[inputHistory.length - 1].text != " ") {
                setTypingModeHistory((prev) => prev.slice(0, -1));
                setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 2]);
              }
            }
            if (inputPosition >= 0) {
              //since 1st character cannot be space
              setinputPosition(inputPosition - typingBoard[inputHistory.length - 1]?.unicode.length);
            }
            setInputHistory((prev) => prev.slice(0, -1));
            setCombinedPatternHistory((prev) => prev.slice(0, -1));
            setTypingBoard((prev) => prev.slice(0, -1));

            if (typingBoard.length === 1) {
              setinputPosition(0);
              setTypingModeHistory([]);
              setTypingModeHistory((prev) => [...prev, "Alphabet"]);
            }
            speakText("backspace", audioEnabled);
          }
          break;
        // Handles space, adjust tying mode based on indicator rules
        case " ":
          event.preventDefault();
          if (typingBoard.length > 0 && inputPosition < MAX_TYPING_LIMIT) {
            setinputPosition(inputPosition + 1);
            setInputHistory((prev) => [...prev, "0"]);
            setCombinedPatternHistory((prev) => [...prev, "0"]);
            setTypingBoard((prev) => [
              ...prev,
              {
                unicode: BrailleUnicode["0"],
                text: " ",
                tts: "",
              },
            ]);
            if (currentTypingMode == "Capital passage") {
              setCurrentTypingMode("Capital passage");
              setTypingModeHistory((prev) => [...prev, "Capital passage"]);
            } else {
              setCurrentTypingMode("Alphabet");
              setTypingModeHistory((prev) => [...prev, "Alphabet"]);
            }
            speakText("space", audioEnabled);
          }
          break;
        default:
          break;
      }
      if (Object.keys(keyToDotMap).includes(event.key) && inputPosition <= MAX_TYPING_LIMIT) {
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

        if (registeredInput.every((input) => !input)) {
          return;
        }

        if (updatedInput.size != 0) return;
        //Handle max character inputted into typing board
        if (inputPosition == MAX_TYPING_LIMIT) {
          event.preventDefault();
          playSound(gameAudio.limit_reached);
          return;
        } else {
          const combinedEncoding = registeredInput.join("");
          setRegisteredInput(Array(6));

          setInputHistory((prev) => [...prev, combinedEncoding]);

          const newCombinedHistory = [...combinedPatternHistory, combinedEncoding];
          let potentialCombination: string = "";
          let matchingResult: { title: string; keystroke: string[]; symbol?: string } | null = null;
          let longestMatch: number = 1;

          for (let i = newCombinedHistory.length - 1; i >= 0; i--) {
            potentialCombination = newCombinedHistory.slice(i).join(",");
            const result = findBrailleMatch(potentialCombination, inputHistory); // refer to gameUtils.ts, determines matching braille
            matchingResult = result.bestMatch;
            longestMatch = result.longestMatch;

            if (matchingResult) break;
          }
          setinputPosition(inputPosition + 1);
          //set displayed braille character with its unicode, displayed text and speech
          if (matchingResult) {
            let displayText: string = matchingResult.symbol || matchingResult.title;
            let ttsText: string = matchingResult.title;
            //adjust displayed text and speech based on typing mode
            switch (currentTypingMode) {
              case "Number":
                const numberMatch = findNumberMatch(combinedEncoding);
                if (numberMatch) {
                  displayText = numberMatch.symbol || numberMatch.title;
                  ttsText = displayText;
                } else if (!isIndicator(matchingResult)) {
                  setCurrentTypingMode("Alphabet");
                  setTypingModeHistory((prev) => [...prev, "Alphabet"]);
                }
                break;
              case "Capital letter":
                if (!isIndicator(matchingResult)) {
                  if (matchingResult != BrailleData.indicators.content.capital_terminator) {
                    displayText = displayText.toUpperCase();
                  } else {
                    setTypingModeHistory((prev) => prev.slice(0, -1));
                    setCurrentTypingMode(typingModeHistory[typingModeHistory.length - 2]);
                  }
                  setCurrentTypingMode("Alphabet");
                  setTypingModeHistory((prev) => [...prev, "Alphabet"]);
                }
                break;
              case "Capital word":
                if (!isIndicator(matchingResult)) {
                  displayText = displayText.toUpperCase();
                }
                break;
              case "Capital passage":
                if (matchingResult == BrailleData.indicators.content.capital_terminator) {
                  setCurrentTypingMode("Alphabet");
                  setTypingModeHistory((prev) => [...prev, "Alphabet"]);
                } else if (!isIndicator(matchingResult)) {
                  displayText = displayText.toUpperCase();
                }
                break;
              default:
                break;
            }
            //set typing mode based on indicators matched, taking note of indicator rules
            switch (matchingResult) {
              case BrailleData.indicators.content.number:
                setCurrentTypingMode("Number");
                setTypingModeHistory((prev) => [...prev, "Number"]);
                ttsText = "";
                break;
              case BrailleData.indicators.content.capital_letter:
                if (currentTypingMode != "Capital passage") {
                  setCurrentTypingMode("Capital letter");
                }
                setTypingModeHistory((prev) => [...prev, "Capital letter"]);
                ttsText = "";
                break;
              case BrailleData.indicators.content.capital_word:
                if (currentTypingMode != "Capital passage") {
                  setCurrentTypingMode("Capital word");
                }
                setTypingModeHistory((prev) => [...prev, "Capital word"]);
                ttsText = "";
                break;
              case BrailleData.indicators.content.capital_passage:
                setCurrentTypingMode("Capital passage");
                setTypingModeHistory((prev) => [...prev, "Capital passage"]);
                ttsText = "";
                break;
              default:
                break;
            }
            setCombinedPatternHistory((prev) => [...prev, potentialCombination]);
            setTypingBoard((prev) => [
              ...prev,
              {
                unicode: BrailleUnicode[combinedEncoding],
                text: displayText,
                tts: ttsText,
              },
            ]);
            // slicing of braille characters based on matched input
            if (matchingResult.keystroke.length >= 2 && currentTypingMode != "Number") {
              let sliceOffset: number | undefined;
              if (matchingResult.keystroke.length === 3 && matchingResult.keystroke.length > longestMatch) {
                sliceOffset = -matchingResult.keystroke.length + 1;
              } else {
                sliceOffset = -matchingResult.keystroke.length;
              }

              setInputHistory((prev) => prev.slice(0, sliceOffset));
              setCombinedPatternHistory((prev) => prev.slice(0, sliceOffset));
              setTypingBoard((prev) => prev.slice(0, sliceOffset));

              setInputHistory((prev) => [...prev, matchingResult.keystroke.join("")]);
              setCombinedPatternHistory((prev) => [...prev, matchingResult.keystroke.join("")]);
              setTypingBoard((prev) => [
                ...prev,
                {
                  unicode: matchingResult.keystroke.map((dots) => BrailleUnicode[dots]).join(""),
                  text: displayText,
                  tts: displayText,
                },
              ]);
            }

            speakText(ttsText.length > 0 ? ttsText : displayText, audioEnabled);
          }
          //if no combinations are found, return input braille unicode only
          if (!matchingResult) {
            setCombinedPatternHistory((prev) => [...prev, combinedEncoding]);
            setTypingBoard((prev) => [
              ...prev,
              {
                unicode: BrailleUnicode[combinedEncoding],
                text: "",
                tts: "",
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
  }, [currentInput, inputHistory, combinedPatternHistory, typingBoard, currentTypingMode, typingModeHistory, audioEnabled]);

  function isIndicator(matchingResult: { title: string; keystroke: string[]; symbol?: string }): boolean {
    return (
      // capital terminator not included as it clashes with the capital letter indicator
      matchingResult == BrailleData.indicators.content.number ||
      matchingResult == BrailleData.indicators.content.capital_letter ||
      matchingResult == BrailleData.indicators.content.capital_word ||
      matchingResult == BrailleData.indicators.content.capital_passage
    );
  }

  return (
    <div className="flex flex-col items-center border-2 rounded-md gap-4">
      <div className="flex justify-between items-center w-full p-2">
        <div className="w-24"></div>
        <h1 className="text-3xl font-semibold">Free Typing</h1>
        <div className="flex justify-end">
          <Button size="sm" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
      {/* Display Board */}
      <div className="flex flex-col w-full py-2 px-1 rounded-lg min-h-[200px]">
        <div className="relative w-full h-72">
          <Image src="/images/brailler_paper.png" alt="Brailler Paper" layout="fill" />
          <div className="absolute bottom-10 left-8 w-full h-full flex flex-col-reverse items-center justify-start px-5 py-3">
            <div className="w-full max-w-[458px] pt-3 flex flex-col-reverse items-start p-2 max-h-[220px] overflow-y-auto">
              {displayBoard
                .slice()
                .reverse()
                .map((line, lineIndex) => (
                  <div key={lineIndex} className="w-full flex flex-col items-start dark:invert">
                    {/* Braille container */}
                    <div className="flex gap-x-0.2">
                      {line.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex flex-col items-center justify-end">
                          <BrailleFont isDisplayBoard>{item.unicode}</BrailleFont>
                        </div>
                      ))}
                    </div>
                    {/* Text container */}
                    <div className="w-full text-xs text-left break-words mt-[-0.4rem]">
                      {line.map((item, itemIndex) => (
                        <p key={itemIndex} className="inline">
                          {item.text}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/*{ typing board }*/}
      <div className="flex flex-col w-full py-4 px-2 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 ml-2">Typing Board</h2>
        <div className="flex flex-wrap items-start pb-2 px-4 border-b border-gray-300 gap-2">
          {typingBoard.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end">
              <BrailleFont>{item.unicode}</BrailleFont>
              <p className="text-xs">{item.text}</p>
            </div>
          ))}
          {inputPosition < MAX_TYPING_LIMIT && <BrailleFont showCursor>⠀</BrailleFont>}
        </div>
      </div>
      <div id="typing-mode" className="mt-2 flex items-center gap-2 p-2 rounded">
        <div className="flex gap-2">
          {TYPING_MODE_OPTIONS.map((value) => (
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

      {DEBUG && (
        <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg mt-4 mb-4">
          <h2 className="text-xl text-center font-semibold mb-4">Debugger</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg">Registered Input:</h3>
              <div className="flex gap-2">
                <BrailleFont>{BrailleUnicode[registeredInput.join("")]}</BrailleFont>
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
