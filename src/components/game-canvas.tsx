"use client";

import { useEffect, useRef, useState } from "react";

export default function GameCanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setcontext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      setcontext(ctx);

      const img = new Image();
      img.src = "/perkins_brailler.png";

      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  });

  return (
    <div>
      <canvas ref={canvasRef} className="bg-red-200 mt-3 rounded-md"></canvas>
    </div>
  );
}
