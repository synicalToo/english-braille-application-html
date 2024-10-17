"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider"; // Ensure this path is correct

import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";

import { initializeCanvas } from "@/utils/script";

export const MainContent = () => {
  const [showKeyboardMap, setShowKeyboardMap] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { theme, setTheme } = useTheme(); // Use the correct hook
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("Theme changed to:", theme);
    const canvas = canvasRef.current;
    initializeCanvas(canvas, theme || "light");
  }, [theme]);

  return (
    <div className="flex flex-col relative">
      <div className="mb-4">
        <canvas
          id="canvas"
          ref={canvasRef}
          className="border-2 rounded-lg dark:bg-black dark:border-gray-500"
          width={800}
          height={600}
        />
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
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle theme
        />
        <label htmlFor="theme-toggle" className="text-lg text-black dark:text-white">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </label>
      </div>
    </div>
  );
};
