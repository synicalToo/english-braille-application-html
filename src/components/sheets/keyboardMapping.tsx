"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { FaRegKeyboard } from "react-icons/fa6";

export function KeyboardMappingSheet() {
  const [showKeyboardMap, setShowKeyboardMap] = useState(false);

  return (
    <div>
      <Sheet open={showKeyboardMap} onOpenChange={setShowKeyboardMap} modal>
        <SheetTrigger asChild>
          <Button className="text-lg text-white bg-gray-600">
            <FaRegKeyboard /> Keyboard Map
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="flex flex-col items-start p-4 text-black dark:text-white bg-white dark:bg-gray-700">
          <h2 className="text-lg font-semibold mb-2">Keyboard Map</h2>
          <div className="flex justify-center w-full">
            <img src="/images/keyboard_mapping.png" alt="Braille keyboard mappings" className="max-w-full h-auto" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
