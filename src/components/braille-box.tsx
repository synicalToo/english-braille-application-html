import React from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

interface BrailleBoxProps {
  children: React.ReactNode;
}

const brailleFont = localFont({ src: "../app/fonts/sixbraille20.woff2" });

export default function BrailleBox({ children }: BrailleBoxProps) {
  return (
    <div className={cn("p-0 m-0 text-sm bg-white border border-gray-600 rounded-sm shadow-md", brailleFont.className)}>
      {children}
    </div>
  );
}
