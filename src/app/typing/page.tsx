"use client";

import Image from "next/image";
import { useState } from "react";

import Gameplay from "@/components/root/gameplay";
import { Sidebar } from "@/components/root/sidebar";
import { BottomBar } from "@/components/root/bottomBar";
import { FreeTyping } from "@/components/root/freeTyping";
import { Button } from "@/components/ui/button";

type ApplicationMode = "" | "freeTyping" | "gameplay";
export default function TypingPage() {
  const [selectedMode, setSelectedMode] = useState<ApplicationMode>("");

  return (
    <main className="flex flex-wrap gap-4 p-4">
      <div className="w-full md:w-2/6">
        <Sidebar />
      </div>

      <div className="w-full md:[width:55%] p-4">
        {!selectedMode ? (
          <>
            <div className="flex flex-col items-center justify-center border-2 rounded-sm">
              <h1 className="text-2xl font-semibold">Braille Typing Excercise</h1>
              <Image src="/images/perkins_brailler.png" alt="Braille Typing" width={600} height={400} />
              <div className="space-x-2 mb-2">
                <Button className="text-xl" variant="secondary" onClick={() => setSelectedMode("freeTyping")}>
                  Free Typing
                </Button>
                <Button className="text-xl" variant="secondary" onClick={() => setSelectedMode("gameplay")}>
                  Start Game
                </Button>
              </div>
            </div>
            <BottomBar />
          </>
        ) : (
          <div className="">
            {selectedMode === "freeTyping" && <FreeTyping onBack={() => setSelectedMode("")} />}
            {selectedMode === "gameplay" && <Gameplay onBack={() => setSelectedMode("")} />}
            <BottomBar />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/6"></div>
    </main>
  );
}
