import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { WordList } from "@/contents/en/wordList";
import { BrailleMappings, BrailleUnicode } from "@/contents/en/customBrailleData";

import { CiTimer } from "react-icons/ci";
import { FaTrophy, FaCheck, FaTimes, FaForward } from "react-icons/fa";

export function Gameplay({ onBack }: { onBack: () => void }) {
  const [points, setPoints] = useState<number>(0);
  const [skipped, setSkipped] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedWordList, setSelectedWordList] = useState<string[]>([]);

  const [progressBar, setProgressBar] = useState<number>(100);
  const [gameLengthLeft, setGameLengthLeft] = useState<number>(60);
  const [maxGameLength, setMaxGameLength] = useState<number>(gameLengthLeft);
  const [isGameplayStarted, setIsGameplayStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [countdown, setCountdown] = useState<number>(1);
  const [isCountdownComplete, setIsCountdownComplete] = useState<boolean>(false);

  const [countdownAudio, setCountdownAudio] = useState(new Audio("/audio/countdown.wav"));

  useEffect(() => {
    countdownAudio.currentTime = 0;
    countdownAudio.play();
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (countdown <= 0) {
      setIsCountdownComplete(true);
      countdownAudio.pause();
    }
  }, [countdown, countdownAudio]);

  useEffect(() => {
    const storedGameLength = localStorage.getItem("gameLength");
    if (storedGameLength) {
      setGameLengthLeft(parseInt(storedGameLength) * 60);
      setMaxGameLength(parseInt(storedGameLength) * 60);
    }

    const handleGameLengthChange = (event: CustomEvent) => {
      if (!isGameplayStarted) {
        setGameLengthLeft(event.detail);
        setMaxGameLength(event.detail);
      }
    };

    window.addEventListener("gameLengthChanged", handleGameLengthChange as EventListener);
    return () => {
      window.removeEventListener("gameLengthChanged", handleGameLengthChange as EventListener);
    };
  }, [isGameplayStarted]);

  useEffect(() => {
    if (gameLengthLeft > 0 && isCountdownComplete) {
      setIsGameplayStarted(true);
      const timer = setInterval(() => {
        setGameLengthLeft((prev) => prev - 1);
        setProgressBar((gameLengthLeft / maxGameLength) * 100);
      }, 50);
      return () => clearInterval(timer);
    } else if (gameLengthLeft === 0 && isCountdownComplete) {
      setIsGameOver(true);
      setProgressBar(0);
    }
  }, [gameLengthLeft, isCountdownComplete]);

  useEffect(() => {
    if (isCountdownComplete && !selectedWord) {
      generateNewWord();
    }
  }, [isCountdownComplete]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function handleCloseGameOver() {
    setIsGameOver(false);
  }

  function handleRestart() {
    setCountdown(3);
    setIsCountdownComplete(false);
    setIsGameOver(false);

    setPoints(0);
    setSkipped(0);
    setCorrect(0);
    setIncorrect(0);
    setSelectedWord(null);

    setGameLengthLeft(parseInt(localStorage.getItem("gameLength") || "60") * 60);
    setProgressBar(100);
    setIsGameplayStarted(false);
  }

  function generateNewWord() {
    const word = WordList[Math.floor(Math.random() * WordList.length)];
    setSelectedWord(word);

    const wordKeystrokesList = word.split("").map((char) => BrailleMappings.Alphabet.content[char].keystroke.join(""));
    setSelectedWordList(wordKeystrokesList);
    console.log(wordKeystrokesList);
  }

  function getBrailleUnicode(text: string | null): string {
    if (!text) return "";
    return text.split("").reduce((result, char) => result + BrailleUnicode[BrailleMappings.Alphabet.content[char].keystroke.join("")], "");
  }

  return (
    <div className="flex flex-col gap-4">
      {!isCountdownComplete && (
        <div className="flex justify-center items-center fixed inset-0 bg-slate-500/50 dark:bg-slate-900/50">
          <div className="text-white text-8xl font-bold">{countdown}</div>
        </div>
      )}

      {isGameOver && (
        <div className="flex justify-center items-center fixed inset-0 bg-slate-500/50 dark:bg-slate-900/50">
          <div className="flex flex-col items-center gap-6 p-8 rounded-lg bg-white dark:bg-slate-800">
            <h2 className="font-bold text-center text-3xl mb-2 dark:text-white">Game Over!</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <FaTrophy className="text-yellow-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Final Score</p>
                  <p className="text-2xl font-bold">{points}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Correct</p>
                  <p className="text-2xl font-bold">{correct}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTimes className="text-red-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Incorrect</p>
                  <p className="text-2xl font-bold">{incorrect}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaForward className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Skipped</p>
                  <p className="text-2xl font-bold">{skipped}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleRestart}>Restart</Button>
              <Button onClick={onBack}>Back to Menu</Button>
              <Button variant="outline" onClick={handleCloseGameOver}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center border-2 border-slate-200 dark:border-slate-700 rounded-md gap-4">
        <div className="flex justify-between items-center w-full p-2 bg-slate-200 dark:bg-slate-800">
          <div className="flex justify-start">
            <Button className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200" size="sm" onClick={onBack}>
              Back
            </Button>
          </div>
          <div className="flex justify-center items-center gap-2 p-2 w-1/2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm">
            <CiTimer size="24" className="text-slate-700 dark:text-slate-200" />
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{formatTime(gameLengthLeft)}</p>
            <Progress className="bg-slate-200 dark:bg-slate-600" value={progressBar} />
          </div>
          <p className="flex justify-end p-2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm font-medium text-slate-800 dark:text-slate-200">Points: {points}</p>
        </div>

        <div className="flex justify-center items-center p-4 w-full border-y-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          {selectedWord && (
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {selectedWord} <span className="text-slate-600 dark:text-slate-400">({getBrailleUnicode(selectedWord)})</span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end items-end gap-4 p-8 h-[60vh] w-full bg-orange-100">{selectedWordList}</div>
      </div>
    </div>
  );
}
