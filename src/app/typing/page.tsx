"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Gameplay from "@/components/root/gameplay";
import { Sidebar } from "@/components/root/sidebar";
import { BottomBar } from "@/components/root/bottomBar";
import { FreeTyping } from "@/components/root/freeTyping";
import CustomGrade2FreeTyping from "@/components/root/customGrade2FreeTyping";

type ApplicationMode = "" | "freeTyping" | "gameplay";
export default function TypingPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("1");
  const [selectedMode, setSelectedMode] = useState<ApplicationMode>("");

  useEffect(() => {
    const storedGradeSelected = localStorage.getItem("gradeSelect");
    if (storedGradeSelected) {
      setSelectedGrade(storedGradeSelected);
    }

    const handleGradeSelectedChange = (event: CustomEvent) => {
      setSelectedGrade(event.detail);
    };
    window.addEventListener("gradeSelectedChanged", handleGradeSelectedChange as EventListener);
    return () => {
      window.removeEventListener("gradeSelectedChanged", handleGradeSelectedChange as EventListener);
    };
  }, []);

  return (
    <main className="flex flex-wrap gap-4 p-4">
      <div className="w-full md:w-2/6">
        <Sidebar />
      </div>

      <div className="w-full md:[width:55%] p-4">
        {!selectedMode ? (
          <>
            <div className="flex flex-col items-center justify-center border-2 rounded-sm">
              <h1 className="pt-2 text-3xl font-semibold">Braille Typing Excercise</h1>
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
            {selectedMode === "freeTyping" && selectedGrade === "1" && <FreeTyping onBack={() => setSelectedMode("")} />}
            {selectedMode === "freeTyping" && selectedGrade === "2" && <CustomGrade2FreeTyping onBack={() => setSelectedMode("")} />}
            {selectedMode === "gameplay" && <Gameplay onBack={() => setSelectedMode("")} />}
            <BottomBar />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/6"></div>
    </main>
  );
}
