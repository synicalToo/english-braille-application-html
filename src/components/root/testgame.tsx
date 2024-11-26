"use client";

import { useEffect, useRef, useState } from "react";
import { SettingsSheet } from "../sheets/settings";

// Helper function to draw rounded rectangles
function createRoundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, Math.PI * (3 / 2), 0, false);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * (1 / 2), false);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, Math.PI * (1 / 2), Math.PI, false);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * (3 / 2), false);
  ctx.closePath();
}

function fillRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  createRoundRectPath(ctx, x, y, w, h, r);
  ctx.fill();
}

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [brailleOffset, setBrailleOffset] = useState<number>(0);
  const [direction, setDirection] = useState<number>(-1); // -1 for up, 1 for down
  const [maxOffset, setMaxOffset] = useState<number>(0); // Max offset for animation

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Adjust canvas size to fill its parent container
        const resizeCanvas = () => {
          canvas.width = 800;
          canvas.height = 600;

          const brickImage = new Image();
          brickImage.src = "/images/brick.jpg";

          brickImage.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(brickImage, 0, 0, canvas.width, canvas.height);

            // Drawing white areas with rounded rectangles
            ctx.fillStyle = "white";
            fillRoundRect(ctx, 80, 130, 100, 170, 10);
            fillRoundRect(ctx, 10, 280, 240, 270, 10);
            fillRoundRect(ctx, 280, 130, 240, 420, 10);
            fillRoundRect(ctx, 550, 130, 240, 270, 10);
            fillRoundRect(ctx, 620, 350, 100, 200, 10);
            fillRoundRect(ctx, 510, 130, 60, 50, 10);

            ctx.fillRect(230, 500, 20, 50);
            ctx.fillRect(280, 500, 10, 50);
            ctx.fillRect(500, 130, 20, 50);
          };
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => {
          window.removeEventListener("resize", resizeCanvas);
        };
      }
    }
  }, []);

  // Set the max offset for the braille animation based on the container height
  useEffect(() => {
    if (containerRef.current) {
      // Get the container height
      const containerHeight = containerRef.current.clientHeight;

      // Set maxOffset dynamically, starting from the bottom
      setMaxOffset(containerHeight - 100); // Adjust the 200px as needed based on the braille section size

      // Initialize the brailleOffset to start from the bottom
      setBrailleOffset(containerHeight - 270);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Braille animation logic
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setBrailleOffset((prevOffset) => {
        const newOffset = prevOffset + direction * 5;
        // Toggle direction if it reaches the bounds
        if (newOffset <= 0 || newOffset >= maxOffset) {
          setDirection((prevDirection) => -prevDirection);
        }
        return Math.max(0, Math.min(newOffset, maxOffset)); // Clamp within bounds
      });
    }, 100); // Adjust speed here (e.g., 100ms for smoother animation)

    return () => clearInterval(animationInterval);
  }, [direction, maxOffset]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 rounded-md border-gray-400 border-2 min-w-[800px] max-w-[800px] min-h-[600px]">
      <div className="relative w-full rounded-lg shadow-lg min-h-[600px]">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>

        <div className="relative z-10">
          <div className="flex justify-center mt-5">
            <div className="w-[450px] bg-black/70 text-white rounded-md p-1 text-left flex items-center">
              {/* Timer Text */}
              <span className="flex-none">
                ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>

              {/* base bar */}
              <div className="flex-grow h-5 bg-slate-100 rounded-l-sm ml-2 mr-1"></div>
            </div>
          </div>

          {/* Braille & word display */}
          <div className="flex justify-center mt-3">
            <h2 className="text-lg font-semibold text-white bg-black/60 p-2 rounded-md w-11/12 text-center">EN WORD (brAille)</h2>
          </div>
        </div>

        {/* Score */}
        <div className="absolute top-4 right-4 bg-black/50 text-white rounded-md p-2">Score: 5000 pts</div>

        {/* Close Button */}
        <div className="absolute top-4 left-4">
          <button className="bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md">
            <span className="text-4xl">×</span>
          </button>
        </div>

        {/* Braille Indicator Section */}
        <div
          className="absolute z-10 transition-transform"
          style={{
            transform: `translateY(${brailleOffset}px)`,
            right: "92px", // Position the braille section to the right
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
