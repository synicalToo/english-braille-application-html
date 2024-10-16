"use client";

import React, { useEffect, forwardRef } from "react";

interface CanvasProps {
  imageSrc: string;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ imageSrc }, ref) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && ref && "current" in ref && ref.current) {
      const ctx = ref.current.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          if (ref.current) {
            ctx.clearRect(0, 0, ref.current.width, ref.current.height);
            ctx.drawImage(img, 0, 0, ref.current.width, ref.current.height);
          }
        };
      }
    }
  }, [mounted, imageSrc, ref]);

  if (!mounted) return null;

  return (
    <div className="relative w-[800px] h-[600px]">
      <canvas id="main-canvas" ref={ref} className="absolute top-0 left-0" width={800} height={600} />
    </div>
  );
});

export default Canvas;
