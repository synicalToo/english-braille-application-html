"use client";

import React, { useRef, useEffect } from "react";

interface CanvasProps {
  imageSrc: string;
}

const Canvas: React.FC<CanvasProps> = ({ imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          if (canvasRef.current) {
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        };
      }
    }
  }, [mounted, imageSrc]);

  if (!mounted) return null; // Prevent rendering until mounted

  return (
    <canvas ref={canvasRef} className="w-full" width={800} height={600} />
  );
};

export default Canvas;