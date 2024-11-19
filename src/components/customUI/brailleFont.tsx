import { cn } from "@/lib/utils";

import localFont from "next/font/local";

interface BrailleBoxProps {
  children: React.ReactNode;
  showCursor?: boolean;
}

const brailleFont = localFont({ src: "../../app/fonts/SixBraille20.woff2" });

export function BrailleFont({ children, showCursor = false }: BrailleBoxProps) {
  return (
    <div className={cn("text-4xl border border-gray-600 rounded-sm flex", brailleFont.className)}>
      {children}
      {showCursor && <span className="border-r-2 border-black animate-pulse ml-[2px]" />}
    </div>
  );
}
