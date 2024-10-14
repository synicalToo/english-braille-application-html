"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
          {["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"].map((item, index) => (
            <AccordionItem key={item} value={item} className="w-full">
              <AccordionTrigger
                onClick={() => toggleItem(item)}
                className={cn(
                  "custom-accordion-trigger text-lg font-semibold p-3 w-full",
                  `${openItems.includes(item) ? "bg-blue-300" : "bg-white"}`,
                  `${openItems.includes(item) ? "dark:bg-gray-700" : "dark:bg-gray-800"}`
                )}
              >
                Section {index + 1}
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <ul className="pl-6 py-2 w-full">
                  {[1, 2, 3, 4, 5, 6].map((subItem) => (
                    <li key={subItem} className="py-1">
                      Item {subItem + index * 3}
                    </li>
                  ))}
                </ul>
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

  return (
    <div className="flex flex-col">
      <div className="flex-grow p-4 border border-gray-300 rounded">
        <h2 className="text-4xl text-center">Braille Typing Game</h2>

        <div className="mb-4">
          <canvas ref={canvasRef} className="w-full" width={800} height={600} />
        </div>

        <div className="flex items-center justify-center space-x-10">
          <Button>Free Typing</Button>
          <Button>Start Game</Button>
        </div>
      </div>
      <div className="p-4 flex justify-center items-center space-x-5">
        <Dialog open={showKeyboardMap} onOpenChange={setShowKeyboardMap}>
          <DialogTrigger asChild>
            <Button className="mr-2">Keyboard Map</Button>
          </DialogTrigger>
          <DialogContent>
            <img src="/path-to-keyboard-map-image.png" alt="Keyboard Map" />
          </DialogContent>
        </Dialog>
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetTrigger asChild>
            <Button className="mr-2">Settings</Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            {/* Add your settings options here */}
          </SheetContent>
        </Sheet>
        {/* <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} /> */}
        <Switch
          id="theme-toggle"
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <label htmlFor="theme-toggle">{theme === "dark" ? "Dark Mode" : "Light Mode"}</label>
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
