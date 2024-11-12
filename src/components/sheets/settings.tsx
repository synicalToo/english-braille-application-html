"use client";

import React, { useEffect, useState } from "react";
import { IoSettingsOutline as SettingIcon } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { CustomSwitch } from "@/components/customUI/customSwitch";
import { CustomSelect } from "@/components/customUI/customSelect";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { audioEffectOptions, audioLangugeOptions, brailleDisplayIntervalOptions, practiceTopicOptions } from "@/lib/constants";
import { CustomRadio } from "../customUI/customRadio";

interface GeneralSettingProps {
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  audioLanguage: string;
  setAudioLanguage: (lang: string) => void;
}

interface GameplaySettingProps {
  displayInterval: string;
  setDisplayInterval: (value: string) => void;
  gameLength: string;
  setGameLength: (value: string) => void;
  practiceTopic: string;
  setPracticeTopic: (topic: string) => void;
  audioEffect: string;
  setAudioEffect: (effect: string) => void;
}

const GeneralSettings = ({ audioEnabled, setAudioEnabled, audioLanguage, setAudioLanguage }: GeneralSettingProps) => {
  return (
    <div id="general-settings">
      <div className="flex text-lg">
        <SettingIcon className="mr-2 self-center" /> General
      </div>
      <br /> <hr /> <br />
      <CustomSwitch id="audio-toggle" text="Enable Audio" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
      <CustomSelect placeholder={audioLanguage} options={audioLangugeOptions} value={audioLanguage} onValueChange={setAudioLanguage} />
    </div>
  );
};

const GameplaySettings = ({ displayInterval, setDisplayInterval, gameLength, setGameLength, practiceTopic, setPracticeTopic, audioEffect, setAudioEffect }: GameplaySettingProps) => {
  return (
    <div id="gameplay-settings">
      <div className="flex text-lg">
        <SettingIcon className="mr-2 self-center" /> Gameplay
      </div>
      <br /> <hr /> <br />
      <CustomRadio title="Braille display interval (seconds): " defaultValue={displayInterval} options={brailleDisplayIntervalOptions} value={displayInterval} onValueChange={setDisplayInterval} />
      <br />
      <CustomRadio title="Game length (minutes): " defaultValue={gameLength} options={["1", "2", "3", "4", "5"]} value={gameLength} onValueChange={setGameLength} />
      <br />
      <CustomSelect title="Practice topic: " placeholder="Select a language" options={practiceTopicOptions} value={practiceTopic} onValueChange={setPracticeTopic} />
      <br />
      <CustomSelect title="Sound effect: " placeholder="Select an effect" options={audioEffectOptions} value={audioEffect} onValueChange={setAudioEffect} />
    </div>
  );
};

export function SettingsSheet() {
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [audioLanguage, setAudioLanguage] = useState<string>("English");

  const [displayInterval, setDisplayInterval] = useState<string>("3");
  const [gameLength, setGameLength] = useState<string>("1");
  const [practiceTopic, setPracticeTopic] = useState<string>("Words");
  const [audioEffect, setAudioEffect] = useState<string>("None");

  useEffect(() => {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedAudioLanguage = localStorage.getItem("audioLanguage");
    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    if (storedAudioEnabled) {
      setAudioEnabled(storedAudioEnabled === "true");
    }

    if (storedAudioLanguage) {
      setAudioLanguage(storedAudioLanguage);
    }

    if (storedDisplayInterval) {
      setDisplayInterval(storedDisplayInterval);
    }

    if (storedGameLength) {
      setGameLength(storedGameLength);
    }

    if (storedPracticeTopic) {
      setPracticeTopic(storedPracticeTopic);
    }

    if (storedAudioEffect) {
      setAudioEffect(storedAudioEffect);
    }
  }, []);

  const handleAudioEnabledChange = (enabled: boolean) => {
    setAudioEnabled(enabled);
    localStorage.setItem("audioEnabled", enabled.toString());
  };

  const handleAudioLanguageChange = (lang: string) => {
    setAudioLanguage(lang);
    localStorage.setItem("audioLanguage", lang);
  };

  const handleDisplayIntervalChange = (value: string) => {
    setDisplayInterval(value);
    localStorage.setItem("displayInterval", value.toString());
  };

  const handleGameLengthChange = (value: string) => {
    setGameLength(value);
    localStorage.setItem("gameLength", value.toString());
  };

  const handlePracticeTopicChange = (topic: string) => {
    setPracticeTopic(topic);
    localStorage.setItem("practiceTopic", topic);
  };

  const handleAudioEffectChange = (effect: string) => {
    setAudioEffect(effect);
    localStorage.setItem("audioEffect", effect);
  };

  return (
    <div>
      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet} modal>
        <SheetTrigger asChild>
          <Button className="text-lg text-white bg-gray-600">
            <SettingIcon className="self-center" /> Settings
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className=" text-black dark:text-white bg-white dark:bg-gray-700">
          <h2 className="text-2xl font-semibold mb-2">Settings</h2>
          <br />

          <GeneralSettings audioEnabled={audioEnabled} setAudioEnabled={handleAudioEnabledChange} audioLanguage={audioLanguage} setAudioLanguage={handleAudioLanguageChange} />

          <br />

          <GameplaySettings
            displayInterval={displayInterval}
            setDisplayInterval={handleDisplayIntervalChange}
            gameLength={gameLength}
            setGameLength={handleGameLengthChange}
            practiceTopic={practiceTopic}
            setPracticeTopic={handlePracticeTopicChange}
            audioEffect={audioEffect}
            setAudioEffect={handleAudioEffectChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
