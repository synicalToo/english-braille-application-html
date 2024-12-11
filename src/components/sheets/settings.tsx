"use client";

import React, { useEffect, useState } from "react";
import { IoSettingsOutline as SettingIcon } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { CustomRadio } from "@/components/customUI/customRadio";
import { CustomSwitch } from "@/components/customUI/customSwitch";
import { CustomSelect } from "@/components/customUI/customSelect";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { audioEffectOptions, audioLangugeOptions, brailleDisplayIntervalOptions, practiceTopicOptions, languageCodeMap, gradeOptions } from "@/lib/constants";

interface GeneralSettingProps {
  gradeSelect: string;
  setSelectedGrade: (grade: string) => void;
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

const GeneralSettings = ({ gradeSelect, setSelectedGrade, audioEnabled, setAudioEnabled, audioLanguage, setAudioLanguage }: GeneralSettingProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const filteredVoices = availableVoices.filter((voice) => voice.name.includes("Google") && audioLangugeOptions.some((lang) => voice.lang.startsWith(languageCodeMap[lang])));
      setVoices(filteredVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const voiceOptions = voices.map((voice) => `${voice.name}`);

  return (
    <div id="general-settings">
      <div className="flex text-lg font-semibold">
        <SettingIcon className="mr-2 self-center" /> General
      </div>
      <br /> <hr /> <br />
      <CustomSelect title="Select Braille Grade: " placeholder={gradeSelect} options={gradeOptions} value={gradeSelect} onValueChange={setSelectedGrade} />
      <br />
      <CustomSwitch id="audio-toggle" text="Enable Audio" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
      <CustomSelect placeholder={audioLanguage} options={voiceOptions.length > 0 ? voiceOptions : audioLangugeOptions} value={audioLanguage} onValueChange={setAudioLanguage} />
    </div>
  );
};

const GameplaySettings = ({ displayInterval, setDisplayInterval, gameLength, setGameLength, practiceTopic, setPracticeTopic, audioEffect, setAudioEffect }: GameplaySettingProps) => {
  return (
    <div id="gameplay-settings">
      <div className="flex text-lg font-semibold">
        <SettingIcon className="mr-2 self-center" /> Gameplay
      </div>
      <br /> <hr /> <br />
      <CustomRadio title="Braille Display Interval (seconds): " defaultValue={displayInterval} options={brailleDisplayIntervalOptions} value={displayInterval} onValueChange={setDisplayInterval} />
      <br />
      <CustomRadio title="Game Length (minutes): " defaultValue={gameLength} options={["1", "2", "3", "4", "5"]} value={gameLength} onValueChange={setGameLength} />
      <br />
      <CustomSelect title="Practice Topic: " placeholder="Select a language" options={practiceTopicOptions} value={practiceTopic} onValueChange={setPracticeTopic} />
      <br />
      <CustomSelect title="Sound Effects: " placeholder="Select an effect" options={audioEffectOptions} value={audioEffect} onValueChange={setAudioEffect} />
    </div>
  );
};

export function SettingsSheet() {
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);

  const [gradeSelect, setSelectedGrade] = useState<string>("1");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [audioLanguage, setAudioLanguage] = useState<string>("Google US English");

  const [displayInterval, setDisplayInterval] = useState<string>("3");
  const [gameLength, setGameLength] = useState<string>("1");
  const [practiceTopic, setPracticeTopic] = useState<string>("Words");
  const [audioEffect, setAudioEffect] = useState<string>("None");

  useEffect(() => {
    const storedGradeSelected = localStorage.getItem("gradeSelect");
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedAudioLanguage = localStorage.getItem("audioLanguage");

    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    if (storedGradeSelected) {
      setSelectedGrade(storedGradeSelected);
    }

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

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    localStorage.setItem("gradeSelect", grade);
    window.dispatchEvent(new CustomEvent("gradeSelectedChanged", { detail: grade }));
  };

  const handleAudioEnabledChange = (enabled: boolean) => {
    setAudioEnabled(enabled);
    localStorage.setItem("audioEnabled", enabled.toString());
    window.dispatchEvent(new CustomEvent("audioSettingsChanged", { detail: enabled }));
  };
  //
  const handleAudioLanguageChange = (lang: string) => {
    setAudioLanguage(lang);
    localStorage.setItem("audioLanguage", lang);
    window.dispatchEvent(new CustomEvent("audioLanguageChanged", { detail: lang }));
  };

  const handleDisplayIntervalChange = (value: string) => {
    setDisplayInterval(value);
    localStorage.setItem("displayInterval", value.toString());
    window.dispatchEvent(new CustomEvent("displayIntervalChanged", { detail: value }));
  };

  const handleGameLengthChange = (value: string) => {
    setGameLength(value);
    localStorage.setItem("gameLength", value.toString());
    window.dispatchEvent(new CustomEvent("gameLengthChanged", { detail: value }));
  };

  const handlePracticeTopicChange = (topic: string) => {
    setPracticeTopic(topic);
    localStorage.setItem("practiceTopic", topic);
    window.dispatchEvent(new CustomEvent("practiceTopicChanged", { detail: topic }));
  };

  const handleAudioEffectChange = (effect: string) => {
    setAudioEffect(effect);
    localStorage.setItem("audioEffect", effect);
    window.dispatchEvent(new CustomEvent("audioEffectChanged", { detail: effect }));
  };

  return (
    <div>
      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet} modal>
        <SheetTrigger asChild>
          <Button className="text-lg text-white bg-gray-600">
            <SettingIcon className="self-center" /> Settings
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="text-black dark:text-white bg-white dark:bg-gray-700 h-screen max-h-screen overflow-y-auto">
          <h2 className="text-3xl font-bold mb-3">Settings</h2>
          <br />

          <GeneralSettings gradeSelect={gradeSelect} setSelectedGrade={handleGradeChange} audioEnabled={audioEnabled} setAudioEnabled={handleAudioEnabledChange} audioLanguage={audioLanguage} setAudioLanguage={handleAudioLanguageChange} />

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
