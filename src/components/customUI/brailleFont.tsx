import { cn } from "@/lib/utils";

import localFont from "next/font/local";

interface BrailleBoxProps {
  children: React.ReactNode;
}

const brailleFont = localFont({ src: "../../app/fonts/SixBraille20.woff2" });

export function BrailleFont({ children }: BrailleBoxProps) {
  return <div className={cn("text-4xl border border-gray-600 rounded-sm inline-block", brailleFont.className)}>{children}</div>;
}
