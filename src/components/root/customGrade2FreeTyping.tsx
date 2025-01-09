import { keyToDotMap } from "@/lib/constants";
import React, { useState, useEffect } from "react";

export default function customGrade2FreeTyping({ onBack }: { onBack: () => void }) {
  const [displayBoard, setDisplayBoard] = useState<string[]>([]);
  const [typingBoard, setTypingBoard] = useState<string[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      console.log(e.key);
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      console.log(e.key);
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div>
      <div>Display board: </div>
      <div>Typing board: </div>
      <div>Input history: </div>
    </div>
  );
}
