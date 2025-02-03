// Default utils functions when install shadcn/ui
// Merges tailwind classes together
// i.e. cn("bg-red-500", "text-white") => "bg-red-500 text-white"

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
