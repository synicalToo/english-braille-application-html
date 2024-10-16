"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";

import { startGame, startFreeTyping, initializeCanvas, drawImage } from "@/utils/script";

export const MainContent = () => {
  const [showKeyboardMap, setShowKeyboardMap] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { theme, setTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showButtons, setShowButtons] = useState(true);
  const [currentMode, setCurrentMode] = useState<"none" | "game" | "freeTyping">("none");

  useEffect(() => {
    const canvas = canvasRef.current;
    initializeCanvas(canvas); // Initialize the canvas context

    // Load and draw the default image
    drawImage("/perkins_brailler.png");

  }, []);

  const handleStartGame = () => {
    setShowButtons(false);
    setCurrentMode("game");
    startGame();
  };

  const handleFreeTyping = () => {
    setShowButtons(false);
    setCurrentMode("freeTyping");
    startFreeTyping();
  };

  const handleClose = () => {
    setShowButtons(true);
    setCurrentMode("none");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentMode === "none") {
        if (event.key === "g") {
          handleStartGame();
        } else if (event.key === "e") {
          handleFreeTyping();
        }
      } else if (currentMode === "game" || currentMode === "freeTyping") {
        if (event.key === "x") {
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentMode]);

  return (
    <div className="flex flex-col relative">
      {!showButtons && (
        <button onClick={handleClose} className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded">
          Close (x)
        </button>
      )}
      <div className="flex-grow p-4 border rounded border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700">
        <h2 className="text-4xl text-center pb-3 text-black dark:text-white">Braille Typing Game</h2>

        <div className="mb-4">
          <canvas id="main-canvas" ref={canvasRef} className="border" width={800} height={600} />
        </div>

        {showButtons && (
          <div className="flex items-center justify-center space-x-10">
            <Button onClick={handleFreeTyping} className="text-lg bg-red-400 text-black dark:bg-yellow-300">
              Free Typing (e)
            </Button>
            <Button onClick={handleStartGame} className="text-lg bg-gray-300 text-black dark:bg-white">
              Start Game (g)
            </Button>
          </div>
        )}
      </div>
      <div className="p-4 flex justify-center items-center space-x-5">
        <Sheet open={showKeyboardMap} onOpenChange={setShowKeyboardMap} modal>
          <SheetTrigger asChild>
            <Button className="text-lg bg-blue-500 text-black dark:bg-blue-600 dark:text-white">Keyboard Map</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="flex flex-col items-start p-4 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">Keyboard Map</h2>
            <div className="flex justify-center w-full">
              <img src="/keyboard_mapping.png" alt="Keyboard Map" className="max-w-full h-auto" />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetTrigger asChild>
            <Button className="text-lg bg-blue-500 text-black dark:bg-blue-600 dark:text-white">Settings</Button>
          </SheetTrigger>
          <SheetContent className="bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Settings</h2>
            {/* Add your settings options here */}
          </SheetContent>
        </Sheet>

        <Switch
          id="theme-toggle"
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <label htmlFor="theme-toggle" className="text-lg text-black dark:text-white">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </label>
      </div>
    </div>
  );
};
