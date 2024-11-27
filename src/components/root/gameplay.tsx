import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/root/bottomBar";
import { Progress } from "@/components/ui/progress";

import { WordList } from "@/contents/en/wordList";

import { CiTimer } from "react-icons/ci";

export function Gameplay({ onBack }: { onBack: () => void }) {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [progress, setProgress] = useState<number>(100);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [isCountdownComplete, setIsCountdownComplete] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [countdownAudio] = useState(new Audio("/audio/countdown.wav"));

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
      setTimeLeft(parseInt(storedGameLength) * 60);
    }

    const handleGameLengthChange = (event: CustomEvent) => {
      if (!isTimerStarted) {
        setTimeLeft(event.detail);
      }
    };

    window.addEventListener("gameLengthChanged", handleGameLengthChange as EventListener);
    return () => {
      window.removeEventListener("gameLengthChanged", handleGameLengthChange as EventListener);
    };
  }, [isTimerStarted]);

  useEffect(() => {
    if (timeLeft > 0 && isCountdownComplete) {
      setIsTimerStarted(true);
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setProgress((timeLeft - 1) * (100 / 60));
      }, 50);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isCountdownComplete) {
      setIsGameOver(true);
    }
  }, [timeLeft, isCountdownComplete]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const handleRestart = () => {
    setCountdown(3);
    setIsCountdownComplete(false);
    setIsGameOver(false);
    setPoints(0);
    setTimeLeft(parseInt(localStorage.getItem("gameLength") || "60") * 60);
    setProgress(100);
    setIsTimerStarted(false);
  };

  const handleCloseGameOver = () => {
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {!isCountdownComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-8xl font-bold">{countdown}</div>
        </div>
      )}

      {isGameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Game Over!</h2>
            <p className="text-xl">Final Score: {points}</p>
            <div className="flex gap-4">
              <Button onClick={handleRestart}>Restart</Button>
              <Button onClick={onBack}>Back to Menu</Button>
              <Button variant="outline" onClick={handleCloseGameOver}>
                Exit
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center border-2 rounded-md gap-8">
        <div className="flex justify-between items-center w-full p-2">
          <div className="flex justify-start">
            <Button size="sm" onClick={onBack}>
              Back
            </Button>
          </div>
          <div className="flex justify-center items-center gap-2 p-2 rounded-sm bg-slate-200">
            <CiTimer />
            <p className="text-lg">{formatTime(timeLeft)}</p>
            <Progress value={progress} className="w-96 h-3" />
          </div>
          <p className="flex justify-end text-lg p-2 rounded-lg bg-slate-100">Points: 0</p>
        </div>

        <div className="flex justify-center items-center p-2 w-full rounded-lg bg-slate-100">
          <p className="text-2xl"> current word </p>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
