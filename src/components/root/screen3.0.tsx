"use client";

import { BrailleFont } from "@/components/customUI/brailleFont";
import { useState } from "react";

export function ScreenThree() {
  const [inputHistory, setInputHistory] = useState();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Braille Typing Game 3.0</h1>
      </div>

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-4">Display Board 3.0</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">Braille</div>
            <p className="text-sm pl-1 whitespace-pre">Display text</p>
          </div>
        </div>
      </div>

      <div id="typing-board" className="w-full max-w-4xl p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 min-h-[60px] border-b border-gray-300">
          <div className="flex flex-col items-center">
            <BrailleFont>⠁</BrailleFont>
            <span className="text-sm text-center mt-1">a</span>
          </div>
          <BrailleFont showCursor>⠀</BrailleFont>
        </div>
      </div>

      <div id="typing-mode" className="mt-2 flex items-center gap-2 p-2 rounded">
        <div className="flex gap-2"></div>
      </div>
    </div>
  );
}
