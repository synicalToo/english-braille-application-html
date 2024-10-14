"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import BrailleBox from "@/components/braille-box";
import BrailleData from "@/components/data/braille-data";

const Sidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="p-4 flex items-center justify-center">
        <Image src="/logo.png" alt="AT&D Lab Logo" width={36} height={36} className="mr-2" />
        <span className="text-lg font-semibold">AT&D Lab</span>
      </div>
      <div className="flex-1">
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
          {BrailleData.map((section) => (
            <AccordionItem key={section.heading} value={section.heading} className="w-full border-b dark:border-gray-600">
              <AccordionTrigger
                onClick={() => toggleItem(section.heading)}
                className={cn(
                  "custom-accordion-trigger text-lg font-semibold p-3 w-full",
                  `${openItems.includes(section.heading) ? "bg-blue-300" : "bg-white"}`,
                  `${openItems.includes(section.heading) ? "dark:bg-gray-700" : "dark:bg-gray-800"}`
                )}
              >
                {section.heading}
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="p-4 flex flex-wrap">
                  {section.items.map((item) => (
                    <div key={item.title} className="flex flex-col mb-2 mr-4 bg-blue-200">
                      <span className="text-lg font-bold">{item.title}</span>
                      <BrailleBox>
                        <span className="text-black text-2xl">{item.content}</span>
                      </BrailleBox>
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
  const [mounted, setMounted] = useState(false); // New state to track if the component is mounted

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component mounts
  }, []);

  if (!mounted) return null; // Prevent rendering until mounted

  return (
    <div className="flex flex-col">
      <div className="flex-grow p-4 border rounded border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
        <h2 className="text-4xl text-center pb-3 text-black dark:text-white">Braille Typing Game</h2>

        <div className="mb-4">
          <canvas ref={canvasRef} className="w-full" width={800} height={600} />
        </div>

        <div className="flex items-center justify-center space-x-10">
          <Button className="text-lg bg-blue-500 text-black dark:bg-blue-600 dark:text-white ">Free Typing</Button>
          <Button className="text-lg bg-blue-500 text-black dark:bg-blue-600 dark:text-white">Start Game</Button>
        </div>
      </div>
      <div className="p-4 flex justify-center items-center space-x-5">
        <Sheet open={showKeyboardMap} onOpenChange={setShowKeyboardMap} modal>
          <SheetTrigger asChild>
            <Button className="text-lg bg-blue-500 text-black dark:bg-blue-600 dark:text-white">Keyboard Map</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="flex flex-col items-start p-4">
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
          <SheetContent>
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
    <div className="flex h-screen bg-background bg-white dark:bg-gray-800">
      <div className="flex-grow max-w-[600px] min-w-[200px]">
        <Sidebar />
      </div>
      <div className="w-[800px] p-4">
        <MainContent />
      </div>
      <div className="w-64"></div>
    </div>
  );
};

export default Page;
