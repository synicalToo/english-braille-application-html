"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { HiOutlineMoon as MoonIcon } from "react-icons/hi";

export function ThemeSwitcher() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setIsChecked(savedTheme === "dark");
    } else {
      setIsChecked(currentTheme === "dark");
    }
  }, [setTheme, currentTheme]);

  const handleThemeChange = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setIsChecked(newTheme === "dark");
  };

  return (
    <div className="flex">
      <Switch id="theme-switcher" checked={isChecked} onCheckedChange={handleThemeChange} />
      <Label htmlFor="theme-switcher" className="text-lg">
        <div className="flex text-center justify-center cursor-pointer pl-2">
          <MoonIcon className="h-6 w-6" />
        </div>
      </Label>
    </div>
  );
}
