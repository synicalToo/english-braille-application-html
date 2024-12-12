import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { CiTimer } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FaCheck, FaForward, FaTrophy } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { keyToDotMap } from "@/lib/constants";
import { WordList } from "@/contents/en/wordList";
import { BrailleMappings, BrailleUnicode } from "@/contents/en/customBrailleData";

type GameState = "countdown" | "gameplay" | "gameover";

interface PlayerData {
  points: number;
  skipped: number;
  correct: number;
  incorrect: number;
}

interface GameplayData {
  countdown: number;
  progressBar: number;
  timer: number;
  maxGameTimer: number;
}

type TextToSpeechOptions = "Google US English" | "Google 日本語";
type displayIntervalOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type gameLengthOptions = 1 | 2 | 3 | 4 | 5;
type practiceTopicOptions = "Alphabet" | "Number" | "Capital Letters" | "Capital Word" | "Capital Passage";
type soundEffectsOptions = "None" | "Quiz" | "Cyber";

interface GameplaySettings {
  audioEnabled: boolean;
  tts: TextToSpeechOptions;
  displayInterval: displayIntervalOptions;
  gameLength: gameLengthOptions;
  practiceTopic: practiceTopicOptions;
  soundEffects: soundEffectsOptions;
}

interface GameAudio {
  clear: HTMLAudioElement;
  skip: HTMLAudioElement;
  correct: HTMLAudioElement;
  incorrect: HTMLAudioElement;
  countdown: HTMLAudioElement;
}

interface CharacterList {
  character: string;
  keystroke: string;
}

interface ActiveCharacter {
  keystroke: string;
  timeToLive: number;
  timestamp: number;
  completed: boolean;
}

export default function Gameplay({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<GameState>("countdown");
  const [playerData, setPlayerData] = useState<PlayerData>({ points: 0, skipped: 0, correct: 0, incorrect: 0 });
  const [gameplaySettings, setGameplaySettings] = useState<GameplaySettings>({
    audioEnabled: true,
    tts: "Google US English",
    displayInterval: 3,
    gameLength: 1,
    practiceTopic: "Alphabet",
    soundEffects: "None",
  });
  const [gameplayData, setGameplayData] = useState<GameplayData>({ countdown: 3, progressBar: 100, timer: gameplaySettings.gameLength * 60, maxGameTimer: gameplaySettings.gameLength * 60 });

  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [highlightedCharacter, setHighlightedCharacter] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [characterList, setCharacterList] = useState<CharacterList[]>([]);

  const [activeCharacters, setActiveCharacters] = useState<ActiveCharacter[]>([]);

  const [gameAudio] = useState<GameAudio>({
    clear: new Audio("/audio/clear.mp3"),
    skip: new Audio("/audio/skip.mp3"),
    correct: new Audio("/audio/correct.mp3"),
    incorrect: new Audio("/audio/incorrect.mp3"),
    countdown: new Audio("/audio/countdown.wav"),
  });

  function playSound(audio: HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  // handles user input
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (gameState !== "gameplay") return;
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
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
      if (gameState !== "gameplay") return;
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(event.key.toLowerCase());
        setCurrentInput(updatedInput);

        if (updatedInput.size != 0) return;
        if (!activeCharacters[currentIndex]) return;

        const combinedEncoding = registeredInput.join("");
        setRegisteredInput(Array(6));

        if (combinedEncoding === activeCharacters[currentIndex].keystroke) {
          setActiveCharacters((prev) => {
            const newActiveCharacters = [...prev];
            newActiveCharacters[currentIndex].completed = true;

            if (currentIndex + 1 < characterList.length) {
              newActiveCharacters.splice(currentIndex + 1);

              newActiveCharacters.push({
                keystroke: characterList[currentIndex + 1].keystroke,
                timeToLive: 6000,
                timestamp: Date.now(),
                completed: false,
              });
            }

            return newActiveCharacters;
          });

          setCurrentIndex((prev) => prev + 1);
          setHighlightedCharacter((prev) => [...prev, currentIndex]);
          setPlayerData((prev) => ({ ...prev, points: prev.points + 10 }));
          setPlayerData((prev) => ({ ...prev, correct: prev.correct + 1 }));

          if (currentIndex === characterList.length - 1) {
            playSound(gameAudio.clear);
            generateNewWord();
          } else {
            playSound(gameAudio.correct);
          }
        } else {
          playSound(gameAudio.incorrect);
          setPlayerData((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
          setPlayerData((prev) => ({ ...prev, points: prev.points - 10 }));
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [currentInput, registeredInput, currentIndex, characterList, activeCharacters]);

  // handles intital countdown
  useEffect(() => {
    if (gameState !== "countdown") return;
    if (gameplayData.countdown <= 0) {
      setGameState("gameplay");
      generateNewWord();
      return;
    }

    gameAudio.countdown.currentTime = 1.9;
    if (gameAudio.countdown.paused && !gameAudio.countdown.ended) {
      playSound(gameAudio.countdown);
    }

    const timer = setInterval(() => {
      setGameplayData((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [gameState, gameplayData.countdown]);

  // handles gameplay timer
  useEffect(() => {
    if (gameState !== "gameplay") return;
    if (gameplayData.timer <= 0) {
      setGameState("gameover");
      return;
    }

    const timer = setInterval(() => {
      setGameplayData((prev) => ({ ...prev, timer: prev.timer - 1 }));
      setGameplayData((prev) => ({ ...prev, progressBar: (prev.timer / prev.maxGameTimer) * 100 }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [gameState, gameplayData.timer]);

  // handles braille character display
  useEffect(() => {
    if (gameState !== "gameplay") return;
    if (characterList.length === 0) return;

    setActiveCharacters([
      {
        keystroke: characterList[0].keystroke,
        timeToLive: 6000,
        timestamp: Date.now(),
        completed: false,
      },
    ]);

    const displayInterval = setInterval(() => {
      setActiveCharacters((current) => {
        if (current[current.length - 1]?.completed) return current;

        const nextIndex = current.length;

        if (nextIndex >= characterList.length) return current;

        return [
          ...current,
          {
            keystroke: characterList[nextIndex].keystroke,
            timeToLive: 6000,
            timestamp: Date.now(),
            completed: false,
          },
        ];
      });
    }, gameplaySettings.displayInterval * 1000);

    return () => {
      clearInterval(displayInterval);
    };
  }, [gameState, selectedWord, characterList, gameplaySettings.displayInterval]);

  // handles time to live for active characters
  useEffect(() => {
    if (gameState !== "gameplay") return;
    if (activeCharacters.length === 0) return;

    const checkInterval = setInterval(() => {
      const currentTime = Date.now();
      const hasExpiredCharacter = activeCharacters.some((character) => !character.completed && currentTime - character.timestamp >= character.timeToLive);

      if (hasExpiredCharacter) {
        skipWord();
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
    };
  }, [gameState, activeCharacters]);

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function getBrailleUnicode(text: string | null): string {
    if (!text) return "";
    return text.split("").reduce((result, char) => result + BrailleUnicode[BrailleMappings.Alphabet.content[char].keystroke.join("")], "");
  }

  function generateNewWord(): void {
    setHighlightedCharacter([]);
    setActiveCharacters([]);
    setCharacterList([]);
    setCurrentIndex(0);

    const word = WordList[Math.floor(Math.random() * WordList.length)];
    setSelectedWord(word);

    const list = [];
    for (let i = 0; i < word.length; i++) {
      list.push({ character: word[i], keystroke: BrailleMappings.Alphabet.content[word[i]].keystroke.join("") });
    }
    setCharacterList(list);
  }

  function skipWord(): void {
    playSound(gameAudio.skip);
    setPlayerData((prev) => ({ ...prev, points: prev.points - 10 }));
    setPlayerData((prev) => ({ ...prev, skipped: prev.skipped + 1 }));

    generateNewWord();
  }

  function handleRestart(): void {
    setGameState("countdown");
    setPlayerData({ points: 0, skipped: 0, correct: 0, incorrect: 0 });
    setGameplayData({ countdown: 3, progressBar: 100, timer: gameplaySettings.gameLength * 60, maxGameTimer: gameplaySettings.gameLength * 60 });
  }

  function renderBrailleText(): ReactNode {
    if (!selectedWord) return null;

    return (
      <div className="flex gap-2">
        <p>
          {selectedWord.split("").map((char, index) => (
            <span key={index} className={`${highlightedCharacter.includes(index) ? "text-green-500" : "text-slate-800 dark:text-slate-200"}`}>
              {char}
            </span>
          ))}
        </p>

        <p>
          (
          {getBrailleUnicode(selectedWord)
            .split("")
            .map((char, index) => (
              <span key={index} className={`${highlightedCharacter.includes(index) ? "text-green-500" : "text-slate-800 dark:text-slate-200"}`}>
                {char}
              </span>
            ))}
          )
        </p>
      </div>
    );
  }

  function BrailleDot({ active, number }: { active: boolean; number: number }) {
    return (
      <motion.div
        initial={{
          scale: active ? 1 : 0.8,
          backgroundColor: active ? "rgb(60, 60, 60)" : "rgb(226 232 240)",
        }}
        animate={{
          scale: active ? 1 : 0.8,
          backgroundColor: active ? "rgb(60, 60, 60)" : "rgb(226 232 240)",
        }}
        transition={{ duration: 0.2 }}
        className={cn("w-8 h-8 rounded-full", "border-2 border-slate-300", "flex items-center justify-center")}
      ></motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {gameState === "countdown" && (
        <div className="flex flex-col items-center border-2 border-slate-200 dark:border-slate-700 rounded-md gap-4 w-full">
          <div className="flex justify-center items-center w-full h-[70vh] bg-slate-100 dark:bg-slate-800">
            <span className="text-8xl font-bold text-slate-800 dark:text-slate-200">{gameplayData.countdown}</span>
          </div>
        </div>
      )}

      {gameState === "gameplay" && (
        <div className="flex flex-col items-center border-2 border-slate-200 dark:border-slate-700 rounded-md gap-4">
          <div className="flex justify-between items-center space-x-2 w-full p-2 bg-slate-200 dark:bg-slate-800">
            <Button className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200" size="sm" onClick={onBack}>
              Back
            </Button>
            <Button className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200" size="sm" onClick={generateNewWord}>
              New word
            </Button>

            <div className="flex justify-center items-center gap-2 p-2 w-1/2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm">
              <CiTimer size="24" className="text-slate-700 dark:text-slate-200" />
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{formatTime(gameplayData.timer)}</p>
              <Progress className="bg-slate-200 dark:bg-slate-600" value={gameplayData.progressBar} />
            </div>

            <Button className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200" size="sm" onClick={handleRestart}>
              Restart
            </Button>
            <p className="flex p-2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm font-medium text-slate-800 dark:text-slate-200">Points: {playerData.points}</p>
          </div>

          <div className="flex justify-center items-center p-4 w-full border-y-2 font-semibold text-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">{renderBrailleText()}</div>

          <div className="flex gap-4 p-8 h-[60vh] w-full bg-slate-100 dark:bg-slate-800">
            {activeCharacters.map(
              (character, index) =>
                !character.completed && (
                  <div key={index} className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        {[1, 2, 3].map((dotNumber) => (
                          <BrailleDot key={dotNumber} number={dotNumber} active={character.keystroke.includes(dotNumber.toString())} />
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        {[4, 5, 6].map((dotNumber) => (
                          <BrailleDot key={dotNumber} number={dotNumber} active={character.keystroke.includes(dotNumber.toString())} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {gameState === "gameover" && (
        <div className="flex justify-center items-center w-full h-[70vh] bg-slate-200 dark:bg-slate-800 z-50">
          <div className="flex flex-col items-center gap-6 p-8 rounded-lg bg-white dark:bg-slate-800">
            <h2 className="font-bold text-center text-3xl mb-2 dark:text-white">Game Over!</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <FaTrophy className="text-yellow-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Final Score</p>
                  <p className="text-2xl font-bold">{playerData.points}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Correct</p>
                  <p className="text-2xl font-bold">{playerData.correct}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTimes className="text-red-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Incorrect</p>
                  <p className="text-2xl font-bold">{playerData.incorrect}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaForward className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Skipped</p>
                  <p className="text-2xl font-bold">{playerData.skipped}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleRestart}>Restart</Button>
              <Button onClick={onBack}>Back to Menu</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
