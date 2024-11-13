import { cn } from "@/lib/utils";

import localFont from "next/font/local";

interface BrailleBoxProps {
  children: React.ReactNode;
  showCursor?: boolean;
}

const brailleFont = localFont({ src: "../../app/fonts/SixBraille20.woff2" });

export function BrailleFont({ children, showCursor = false }: BrailleBoxProps) {
  return <div className={cn("text-4xl border border-gray-600 rounded-sm inline-block", showCursor && "border-r-4 border-r-black animate-pulse", brailleFont.className)}>{children}</div>;
}
