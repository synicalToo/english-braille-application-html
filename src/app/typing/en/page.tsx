"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import BrailleBox from "@/components/braille-box";
import BrailleData from "@/components/data/braille-data";
import Canvas from "@/components/canvas";
import { startGame, startFreeTyping } from "@/utils/script";

const Sidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <Image src="/logo.png" alt="AT&D Lab Logo" width={36} height={36} className="mr-2" />
        <a href="https://atdlab.jp/index.html#contact" className="text-lg font-semibold">
          AT&D Lab.
        </a>
      </div>
      <div className="flex-1 px-3 ">
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
          {BrailleData.map((section) => (
            <AccordionItem key={section.heading} value={section.heading} className="w-full border-b dark:border-gray-600">
              <AccordionTrigger
                onClick={() => toggleItem(section.heading)}
                className={cn(
                  "custom-accordion-trigger text-lg font-semibold p-3 w-full hover:border-4 hover:border-blue-300",
                  `${openItems.includes(section.heading) ? "bg-blue-200 dark:bg-gray-700" : "bg-white dark:bg-gray-700"}`
                )}
              >
                {section.heading}
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="p-4 flex flex-wrap">
                  {section.items.map((item) => (
                    <div key={item.title} className={cn("flex flex-col mb-2", item.className)}>
                      <span className="text-base font-bold text-center bg-gray-200">{item.title}</span>
                      <div className="flex p-2 items-center justify-center">
                        {item.content.split("").map((char, index) => (
                          <BrailleBox key={index}>
                            <span className="text-black text-2xl">{char}</span>
                          </BrailleBox>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const MainContent = () => {
  const [showKeyboardMap, setShowKeyboardMap] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { theme, setTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState("/perkins_brailler.png");
  const [showButtons, setShowButtons] = useState(true);

  const handleStartGame = () => {
    startGame(canvasRef, setImageSrc);
    setShowButtons(false);
  };

  const handleFreeTyping = () => {
    startFreeTyping(canvasRef, setImageSrc);
    setShowButtons(false);
  };

  const handleClose = () => {
    setShowButtons(true);
    setImageSrc("/perkins_brailler.png");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "g") {
        handleStartGame();
      } else if (event.key === "e") {
        handleFreeTyping();
      } else if (event.key === "x") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
          <Canvas imageSrc={imageSrc} />
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

const Page = () => {
  return (
    <div className="flex h-screen flex-col lg:flex-row bg-background bg-white dark:bg-gray-700">
      <div className="flex-grow max-w-[600px] min-w-[600px]">
        <Sidebar />
      </div>
      <div className="w-full lg:w-[800px] p-4">
        <MainContent />
      </div>
    </div>
  );
};

export default Page;
