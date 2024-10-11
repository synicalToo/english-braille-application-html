"use client";

import { useEffect, useRef, useState } from "react";

export default function GameCanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setcontext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800 * (3 / 4);
      canvas.height = 600 * (3 / 4);
      const ctx = canvas.getContext("2d");
      setcontext(ctx);

      const img = new Image();
      img.src = "/perkins_brailler.png";

      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, canvas.width / 2 - 464 / 2, canvas.height / 2 - 328 / 2, 464, 328);
        }
      };
    }
  });

  return (
    <div>
      <canvas id="game-canvas" ref={canvasRef} className="mt-3 rounded-md w-1/4"></canvas>
    </div>
  );
}
