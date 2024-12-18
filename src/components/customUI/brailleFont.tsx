import { cn } from "@/lib/utils";
import localFont from "next/font/local";

interface BrailleBoxProps {
  children: React.ReactNode;
  showCursor?: boolean;
  isDisplayBoard?: boolean; // New prop to differentiate styles
}

const brailleFont = localFont({ src: "../../app/fonts/SixBraille20.woff2" });

export function BrailleFont({ children, showCursor = false, isDisplayBoard = false }: BrailleBoxProps) {
  return (
    <div
      className={cn(
        "flex",
        brailleFont.className,
        isDisplayBoard
          ? "text-3xl" // Smaller font size for display board
          : "text-4xl border border-gray-600 rounded-sm" // Styles with border for typing mode
      )}
    >
      {children}
      {showCursor && <span className="border-r-2 border-black animate-pulse" />}
    </div>
  );
}
