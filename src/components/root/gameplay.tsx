import React, { ReactNode, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { CiTimer } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FaCheck, FaForward, FaTrophy } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { speakText } from "@/utils/audioUtils";
import { WordList } from "@/contents/en/wordList";
import { BrailleData, BrailleUnicode } from "@/contents/en/BrailleData";
import { GameState, keyToDotMap, AudioLanguage, BrailleDisplayInterval, GameLength, PracticeTopic, AudioEffect } from "@/lib/constants";

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

interface GameplaySettings {
  audioEnabled: boolean;
  tts: AudioLanguage;
  displayInterval: BrailleDisplayInterval;
  gameLength: GameLength;
  practiceTopic: PracticeTopic;
  soundEffects: AudioEffect;
}

interface GameAudio {
  None: {
    clear: HTMLAudioElement;
    skip: HTMLAudioElement;
    correct: HTMLAudioElement;
    incorrect: HTMLAudioElement;
  };

  Default: {
    clear: HTMLAudioElement;
    skip: HTMLAudioElement;
    correct: HTMLAudioElement;
    incorrect: HTMLAudioElement;
  };

  Cute: {
    clear: HTMLAudioElement;
    skip: HTMLAudioElement;
    correct: HTMLAudioElement;
    incorrect: HTMLAudioElement;
  };

  Cyber: {
    clear: HTMLAudioElement;
    skip: HTMLAudioElement;
    correct: HTMLAudioElement;
    incorrect: HTMLAudioElement;
  };

  Fight: {
    clear: HTMLAudioElement;
    skip: HTMLAudioElement;
    correct: HTMLAudioElement;
    incorrect: HTMLAudioElement;
  };

  Support: {
    clear: HTMLAudioElement;
    skip: HTMLAudioElement;
    correct: HTMLAudioElement;
    incorrect: HTMLAudioElement;
  };

  Countdown: HTMLAudioElement;
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
  const [gameState, setGameState] = useState<GameState>("countdown"); // Keep tracks of whether the game is starting, playing, ended
  const [playerData, setPlayerData] = useState<PlayerData>({
    points: 0,
    skipped: 0,
    correct: 0,
    incorrect: 0,
  });
  const [gameplaySettings, setGameplaySettings] = useState<GameplaySettings>({
    audioEnabled: true,
    tts: "Google US English",
    displayInterval: "3",
    gameLength: "1",
    practiceTopic: "Alphabetical",
    soundEffects: "Default",
  });
  const [gameplayData, setGameplayData] = useState<GameplayData>({
    countdown: 3,
    progressBar: 100,
    timer: parseInt(gameplaySettings.gameLength) * 60,
    maxGameTimer: parseInt(gameplaySettings.gameLength) * 60,
  });

  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set()); // Register the current key presses by the user
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6)); // Stores the pressed key after the user has released all keys

  const [selectedWord, setSelectedWord] = useState<string | null>(null); // Randomly chosen word to be displayed
  const [highlightedCharacter, setHighlightedCharacter] = useState<number[]>([]); // Tracks the position of the character in the chosen word to be highlighted when correct
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Position of the current character to be processed when user inputs keystroke
  const [characterList, setCharacterList] = useState<CharacterList[]>([]); // Breaks the word into individual element to keep track based on index

  const [activeCharacters, setActiveCharacters] = useState<ActiveCharacter[]>([]); // Falling braille dots
  const [animationCompleted, setAnimationCompleted] = useState<{ [key: number]: boolean }>({}); // Mark braille dots as finished animation

  // Store the game audio elements
  const gameAudio = useRef<GameAudio>({
    None: {
      clear: new Audio(),
      skip: new Audio(),
      correct: new Audio(),
      incorrect: new Audio(),
    },
    Default: {
      clear: new Audio(),
      skip: new Audio(),
      correct: new Audio(),
      incorrect: new Audio(),
    },
    Cute: {
      clear: new Audio(),
      skip: new Audio(),
      correct: new Audio(),
      incorrect: new Audio(),
    },
    Cyber: {
      clear: new Audio(),
      skip: new Audio(),
      correct: new Audio(),
      incorrect: new Audio(),
    },
    Fight: {
      clear: new Audio(),
      skip: new Audio(),
      correct: new Audio(),
      incorrect: new Audio(),
    },
    Support: {
      clear: new Audio(),
      skip: new Audio(),
      correct: new Audio(),
      incorrect: new Audio(),
    },
    Countdown: new Audio("/audio/countdown.wav"),
  });

  // handle initial settings on load
  useEffect(() => {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    const initialSettings = {
      ...gameplaySettings,
      audioEnabled: storedAudioEnabled ? storedAudioEnabled === "true" : gameplaySettings.audioEnabled,
      displayInterval: storedDisplayInterval ? (storedDisplayInterval as BrailleDisplayInterval) : gameplaySettings.displayInterval,
      gameLength: storedGameLength ? (storedGameLength as GameLength) : gameplaySettings.gameLength,
      practiceTopic: storedPracticeTopic ? (storedPracticeTopic as PracticeTopic) : gameplaySettings.practiceTopic,
      soundEffects: storedAudioEffect ? (storedAudioEffect as AudioEffect) : gameplaySettings.soundEffects,
    };

    setGameplaySettings(initialSettings);
    setGameplayData((prev) => ({
      ...prev,
      timer: parseInt(initialSettings.gameLength) * 60,
      maxGameTimer: parseInt(initialSettings.gameLength) * 60,
    }));

    loadAudioFiles(initialSettings.soundEffects);
  }, []);

  // handles user input
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (gameState !== "gameplay") return;

      if (event.code === "Space") {
        event.preventDefault();
        if (activeCharacters[currentIndex]?.keystroke === "0") {
          setActiveCharacters((prev) => {
            const newActiveCharacters = [...prev];
            newActiveCharacters[currentIndex].completed = true;

            const nextIndex = currentIndex + 1;
            if (nextIndex < characterList.length && !newActiveCharacters[nextIndex]) {
              newActiveCharacters[nextIndex] = {
                keystroke: characterList[nextIndex].keystroke,
                timeToLive: 6000,
                timestamp: Date.now(),
                completed: false,
              };
            }

            return newActiveCharacters;
          });

          setCurrentIndex((prev) => prev + 1);
          setHighlightedCharacter((prev) => [...prev, currentIndex]);
          setPlayerData((prev) => ({ ...prev, points: prev.points + 10 }));
          setPlayerData((prev) => ({ ...prev, correct: prev.correct + 1 }));

          if (currentIndex === characterList.length - 1) {
            playSound(gameAudio.current[gameplaySettings.soundEffects].clear);
            generateNewWord();
          } else {
            playSound(gameAudio.current[gameplaySettings.soundEffects].correct);
            const nextChar = characterList[currentIndex + 1].character;
            speakText(nextChar === " " ? "space" : nextChar, true, false);
          }
          return;
        } else {
          playSound(gameAudio.current[gameplaySettings.soundEffects].incorrect);
          setPlayerData((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
          setPlayerData((prev) => ({ ...prev, points: prev.points - 10 }));
          return;
        }
      }

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
      if (event.code === "Space") return;

      // Make sure the user inputs are valid key within the KeyToDotMap dictionary
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(event.key.toLowerCase());
        setCurrentInput(updatedInput);

        // Only process the input when the user has released all keys
        if (updatedInput.size != 0) return;
        // Makes sure the game is displaying words
        // Prevents the game from minus points when the word has not been chosen yet
        if (!activeCharacters[currentIndex]) return;

        // Combined input ["1","3","6"] -> "136"
        const combinedEncoding = registeredInput.join("");
        // Clear the registered input
        setRegisteredInput(Array(6));

        // If user input matches the displayed failling braille dot
        if (combinedEncoding === activeCharacters[currentIndex].keystroke) {
          // Update the displayed braille dots
          setActiveCharacters((prev) => {
            const newActiveCharacters = [...prev];
            newActiveCharacters[currentIndex].completed = true;

            // Display the next braille dot when the user completes the braille dot
            // faster than the time to live expires
            const nextIndex = currentIndex + 1;
            if (nextIndex < characterList.length && !newActiveCharacters[nextIndex]) {
              newActiveCharacters[nextIndex] = {
                keystroke: characterList[nextIndex].keystroke,
                timeToLive: 6000,
                timestamp: Date.now(),
                completed: false,
              };
            }

            return newActiveCharacters;
          });

          // Update player data and highlight the character
          setCurrentIndex((prev) => prev + 1);
          setHighlightedCharacter((prev) => [...prev, currentIndex]);
          setPlayerData((prev) => ({ ...prev, points: prev.points + 10 }));
          setPlayerData((prev) => ({ ...prev, correct: prev.correct + 1 }));

          // Play the clear sound when the current index matches the
          // length of the character list
          if (currentIndex === characterList.length - 1) {
            playSound(gameAudio.current[gameplaySettings.soundEffects].clear);
            generateNewWord();
          } else {
            playSound(gameAudio.current[gameplaySettings.soundEffects].correct);
            const nextChar = characterList[currentIndex + 1].character;
            speakText(nextChar === " " ? "space" : nextChar, true, false);
          }
        } else {
          playSound(gameAudio.current[gameplaySettings.soundEffects].incorrect);
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

    const countdownAudio = gameAudio.current.Countdown;
    countdownAudio.currentTime = 1.9;
    if (countdownAudio.paused && !countdownAudio.ended) {
      playSound(countdownAudio);
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

    if (activeCharacters.length === 0) {
      setActiveCharacters([
        {
          keystroke: characterList[0].keystroke,
          timeToLive: 6000,
          timestamp: Date.now(),
          completed: false,
        },
      ]);
      setAnimationCompleted({ 0: false });
      speakText(characterList[0].character, true, true);
    }

    const displayInterval = setInterval(() => {
      setActiveCharacters((current) => {
        if (current.length === 0) return current;
        if (current[current.length - 1]?.completed) return current;

        const nextIndex = current.length;
        if (nextIndex >= characterList.length) return current;

        if (nextIndex === 0) {
          setAnimationCompleted((prev) => ({
            ...prev,
            [nextIndex]: false,
          }));

          return [
            {
              keystroke: characterList[nextIndex].keystroke,
              timeToLive: 6000,
              timestamp: Date.now(),
              completed: false,
            },
          ];
        }

        const lastCharacter = current[current.length - 1];
        const timeSinceLastChar = Date.now() - lastCharacter.timestamp;

        if (timeSinceLastChar < parseInt(gameplaySettings.displayInterval) * 1000 || !animationCompleted[nextIndex - 1]) {
          return current;
        }

        setAnimationCompleted((prev) => ({
          ...prev,
          [nextIndex]: false,
        }));

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
    }, 100);

    return () => {
      clearInterval(displayInterval);
    };
  }, [gameState, selectedWord, characterList, gameplaySettings.displayInterval, animationCompleted]);

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

    // Regex text for any numbers
    const containsNumbers = /\d/.test(text);
    let result = containsNumbers ? BrailleUnicode[BrailleData.indicators.content.number.keystroke.join("")] : "";

    // Map each character in the text to a braille unicode
    return text.split("").reduce((result, char) => {
      if (char === " ") {
        return result + BrailleUnicode["0"];
      }
      if (char === ",") {
        return result + BrailleUnicode[BrailleData.punctuation.content.comma.keystroke.join("")];
      }
      if (char === ".") {
        return result + BrailleUnicode[BrailleData.punctuation.content.period.keystroke.join("")];
      }
      if (char !== char.toLowerCase()) {
        return result + BrailleUnicode[BrailleData.indicators.content.capital_letter.keystroke.join("")] + BrailleUnicode[BrailleData.alphabet.content[char.toLowerCase()].keystroke.join("")];
      }
      if (containsNumbers) {
        return result + BrailleUnicode[BrailleData.numbers.content[char].keystroke.join("")];
      }
      if (BrailleData.alphabet.content[char]) {
        return result + BrailleUnicode[BrailleData.alphabet.content[char].keystroke.join("")];
      }
      console.warn(`Character ${char} not found in mappings`);
      return result + char;
    }, result);
  }

  function generateNewWord(): void {
    setHighlightedCharacter([]);
    setActiveCharacters([]);
    setCharacterList([]);
    setCurrentIndex(0);

    let word: string;
    if (gameplaySettings.practiceTopic === "All") {
      const topics = Object.keys(WordList).filter((topic) => topic !== "All") as PracticeTopic[];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      word = WordList[randomTopic][Math.floor(Math.random() * WordList[randomTopic].length)];
    } else {
      word = WordList[gameplaySettings.practiceTopic][Math.floor(Math.random() * WordList[gameplaySettings.practiceTopic].length)];
    }

    setSelectedWord(word);
    speakText(word, true, true);
    const list = [];

    const containsNumbers = /\d/.test(word);
    if (containsNumbers) {
      list.push({
        character: BrailleData.indicators.content.number.title,
        keystroke: BrailleData.indicators.content.number.keystroke.join(""),
      });
    }

    for (let i = 0; i < word.length; i++) {
      if (word[i].toLowerCase() === " ") {
        list.push({
          character: word[i],
          keystroke: "0",
        });
      } else if (word[i].toLowerCase() === ",") {
        list.push({
          character: word[i],
          keystroke: BrailleData.punctuation.content.comma.keystroke.join(""),
        });
      } else if (word[i].toLowerCase() === ".") {
        list.push({
          character: word[i],
          keystroke: BrailleData.punctuation.content.period.keystroke.join(""),
        });
      } else if (word[i] !== word[i].toLowerCase()) {
        list.push({
          character: BrailleData.indicators.content.capital_letter.title,
          keystroke: BrailleData.indicators.content.capital_letter.keystroke.join(""),
        });
        list.push({
          character: word[i],
          keystroke: BrailleData.alphabet.content[word[i].toLowerCase()].keystroke.join(""),
        });
      } else if (/\d/.test(word[i])) {
        list.push({
          character: word[i],
          keystroke: BrailleData.numbers.content[word[i]].keystroke.join(""),
        });
      } else if (BrailleData.alphabet.content[word[i]]) {
        list.push({
          character: word[i],
          keystroke: BrailleData.alphabet.content[word[i]].keystroke.join(""),
        });
      }
    }

    setCharacterList(list);
  }

  function skipWord(): void {
    playSound(gameAudio.current[gameplaySettings.soundEffects].skip);
    setPlayerData((prev) => ({ ...prev, points: prev.points - 10 }));
    setPlayerData((prev) => ({ ...prev, skipped: prev.skipped + 1 }));

    generateNewWord();
  }

  // Update user settings if it was change mid game
  // Reset player data
  function handleRestart(): void {
    window.speechSynthesis.cancel();
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    const updatedSettings = {
      ...gameplaySettings,
      audioEnabled: storedAudioEnabled ? storedAudioEnabled === "true" : gameplaySettings.audioEnabled,
      displayInterval: storedDisplayInterval ? (storedDisplayInterval as BrailleDisplayInterval) : gameplaySettings.displayInterval,
      gameLength: storedGameLength ? (storedGameLength as GameLength) : gameplaySettings.gameLength,
      practiceTopic: storedPracticeTopic ? (storedPracticeTopic as PracticeTopic) : gameplaySettings.practiceTopic,
      soundEffects: storedAudioEffect ? (storedAudioEffect as AudioEffect) : gameplaySettings.soundEffects,
    };

    loadAudioFiles(updatedSettings.soundEffects);

    setGameplaySettings(updatedSettings);
    setGameState("countdown");
    setPlayerData({ points: 0, skipped: 0, correct: 0, incorrect: 0 });
    setGameplayData({
      countdown: 3,
      progressBar: 100,
      timer: parseInt(updatedSettings.gameLength) * 60,
      maxGameTimer: parseInt(updatedSettings.gameLength) * 60,
    });
  }

  function playSound(audio: HTMLAudioElement | null) {
    const isCountdown = audio === gameAudio.current.Countdown;

    if (!audio && !isCountdown) {
      const effect = gameplaySettings.soundEffects;
      const type = Object.entries(gameAudio.current[effect]).find(([key, value]) => {
        return value === null || value === undefined;
      })?.[0];

      if (type) {
        audio = new Audio(`/audio/${effect.toLowerCase()}/${type}.mp3`);
        gameAudio.current[effect][type as keyof (typeof gameAudio.current)[typeof effect]] = audio;
      }
    }

    if (!isCountdown && (gameplaySettings.soundEffects === "None" || !gameplaySettings.audioEnabled)) return;
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((error) => console.warn("Audio playback failed:", error));
    } catch (error) {
      console.warn("Error playing sound effect:", error);
    }
  }

  function renderBrailleText(): ReactNode {
    if (!selectedWord) return null;

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 w-full">
        <p className="break-words text-center">
          {selectedWord.split("").map((char, index) => {
            let adjustedIndex = index;

            if (gameplaySettings.practiceTopic === "Numbers" || char !== char.toLowerCase()) {
              adjustedIndex++;
            }

            if (gameplaySettings.practiceTopic !== "Numbers") {
              for (let i = 0; i < index; i++) {
                if (selectedWord[i] !== selectedWord[i].toLowerCase()) {
                  adjustedIndex++;
                }
              }
            }

            const shouldHighlight = highlightedCharacter.includes(adjustedIndex);
            return (
              <span key={index} className={`${shouldHighlight ? "text-green-500" : "text-slate-800 dark:text-slate-200"}`}>
                {char}
              </span>
            );
          })}
        </p>

        <p className="break-words text-center">
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
          backgroundColor: active ? "rgb(60, 60, 60)" : "rgb(226 232 240)",
        }}
        transition={{ duration: 0.2 }}
        className={cn("w-6 h-6 rounded-full", "border-2 border-slate-300", "flex items-center justify-center")}
      ></motion.div>
    );
  }

  function renderBrailleCharacter(character: ActiveCharacter, index: number) {
    const dots = character.keystroke
      .split("")
      .map(Number)
      .filter((n) => n > 0);

    return (
      <div key={`character-${index}`} className="absolute left-1/2 -translate-x-1/2">
        {/* 
          Handles the animation of the failling braille dots
          Animation is done using position which is scaled to device width and height
        */}
        <motion.div initial={{ y: 0 }} animate={{ y: "60vh" }} transition={{ duration: 6, ease: "linear", delay: 0 }} className="flex items-center justify-center">
          <div className="flex flex-col space-x-2">
            <div className="absolute right-[2rem]">
              <motion.div
                initial={{ x: 0, y: "5rem" }}
                animate={{ x: "-5rem", y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                onAnimationComplete={() => {
                  setAnimationCompleted((prev) => ({
                    ...prev,
                    [index]: true,
                  }));
                }}
                className="absolute"
              >
                <BrailleDot number={3} active={dots.includes(3)} />
              </motion.div>
              <motion.div initial={{ x: 0, y: "2.5rem" }} animate={{ x: "-2.5rem", y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="absolute">
                <BrailleDot number={2} active={dots.includes(2)} />
              </motion.div>
              <div className="absolute">
                <BrailleDot number={1} active={dots.includes(1)} />
              </div>
            </div>
            <div className="absolute left-[1rem]">
              <div className="absolute">
                <BrailleDot number={4} active={dots.includes(4)} />
              </div>
              <motion.div initial={{ x: 0, y: "2.5rem" }} animate={{ x: "2.5rem", y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="absolute">
                <BrailleDot number={5} active={dots.includes(5)} />
              </motion.div>
              <motion.div initial={{ x: 0, y: "5rem" }} animate={{ x: "5rem", y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="absolute">
                <BrailleDot number={6} active={dots.includes(6)} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Stop any TTS when the game is over
  useEffect(() => {
    if (gameState === "gameover") {
      window.speechSynthesis.cancel();
    }
  }, [gameState]);

  // Handles the loading of the selected audio
  function loadAudioFiles(effect: AudioEffect) {
    if (effect === "None") return;

    const audioTypes = ["clear", "skip", "correct", "incorrect"];
    audioTypes.forEach((type) => {
      const audio = new Audio(`/audio/${effect.toLowerCase()}/${type}.mp3`);
      gameAudio.current[effect][type as keyof (typeof gameAudio.current)[typeof effect]] = audio;
    });
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
            <Button
              className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200"
              size="sm"
              onClick={() => {
                window.speechSynthesis.cancel();
                onBack();
              }}
            >
              Back
            </Button>

            <div className="flex justify-center items-center gap-2 p-2 w-1/2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm">
              <CiTimer size="24" className="text-slate-700 dark:text-slate-200" />
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{formatTime(gameplayData.timer)}</p>
              <Progress className="bg-slate-200 dark:bg-slate-600" value={gameplayData.progressBar} />
            </div>

            <p className="flex p-2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm font-medium text-slate-800 dark:text-slate-200">Points: {playerData.points}</p>
          </div>

          <div className="flex justify-center items-center p-4 w-full border-y-2 font-semibold text-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">{renderBrailleText()}</div>

          <div className="items-start justify-center h-[60vh] w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">{activeCharacters.map((character, index) => !character.completed && renderBrailleCharacter(character, index))}</div>
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
