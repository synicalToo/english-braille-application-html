"use client";

import React, { useEffect, useState } from "react";
import { IoSettingsOutline as SettingIcon } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { CustomRadio } from "@/components/customUI/customRadio";
import { CustomSwitch } from "@/components/customUI/customSwitch";
import { CustomSelect } from "@/components/customUI/customSelect";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  AUDIO_EFFECT_OPTIONS,
  AUDIO_LANGUAGE_OPTIONS,
  BRAILLE_DISPLAY_INTERVAL_OPTIONS,
  GRADE_OPTIONS,
  PRACTICE_TOPIC_OPTIONS,
  LANGUAGE_CODE_MAP,
  GAME_LENGTH_OPTIONS,
  Grade,
  AudioLanguage,
  BrailleDisplayInterval,
  AudioEffect,
  PracticeTopic,
  GameLength,
} from "@/lib/constants";

export function SettingsSheet() {
  const [showSettingsSheet, setShowSettingsSheet] = useState<boolean>(false);

  const [selectedGrade, setSelectedGrade] = useState<Grade>("1");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [audioLanguage, setAudioLanguage] = useState<AudioLanguage>("Google US English");

  const [displayInterval, setDisplayInterval] = useState<BrailleDisplayInterval>("3");
  const [gameLength, setGameLength] = useState<GameLength>("1");
  const [practiceTopic, setPracticeTopic] = useState<PracticeTopic>("Alphabetical");
  const [audioEffect, setAudioEffect] = useState<AudioEffect>("None");

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const filteredVoices = availableVoices.filter((voice) => voice.name.includes("Google") && AUDIO_LANGUAGE_OPTIONS.some((lang) => voice.lang.startsWith(LANGUAGE_CODE_MAP[lang])));
      setVoices(filteredVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const voiceOptions = voices.map((voice) => `${voice.name}`);

  useEffect(() => {
    const storedGradeSelected = localStorage.getItem("gradeSelect");
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedAudioLanguage = localStorage.getItem("audioLanguage");

    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    if (storedGradeSelected) {
      setSelectedGrade(storedGradeSelected as Grade);
    }

    if (storedAudioEnabled) {
      setAudioEnabled(storedAudioEnabled === "true");
    }

    if (storedAudioLanguage) {
      setAudioLanguage(storedAudioLanguage as AudioLanguage);
    }

    if (storedDisplayInterval) {
      setDisplayInterval(storedDisplayInterval as BrailleDisplayInterval);
    }

    if (storedGameLength) {
      setGameLength(storedGameLength as GameLength);
    }

    if (storedPracticeTopic) {
      setPracticeTopic(storedPracticeTopic as PracticeTopic);
    }

    if (storedAudioEffect) {
      setAudioEffect(storedAudioEffect as AudioEffect);
    }
  }, []);

  function handleGradeChange(grade: string) {
    setSelectedGrade(grade as Grade);
    localStorage.setItem("gradeSelect", grade);
    window.dispatchEvent(new CustomEvent("gradeSelectedChanged", { detail: grade }));
  }

  function handleAudioEnabledChange(value: boolean) {
    setAudioEnabled(value);
    localStorage.setItem("audioEnabled", value.toString());
    window.dispatchEvent(new CustomEvent("audioSettingsChanged", { detail: value }));
  }

  function handleAudioLanguageChange(value: string) {
    setAudioLanguage(value as AudioLanguage);
    localStorage.setItem("audioLanguage", value);
    window.dispatchEvent(new CustomEvent("audioLanguageChanged", { detail: value }));
  }

  function handleDisplayIntervalChange(value: string) {
    setDisplayInterval(value as BrailleDisplayInterval);
    localStorage.setItem("displayInterval", value.toString());
    window.dispatchEvent(new CustomEvent("displayIntervalChanged", { detail: value }));
  }

  function handleGameLengthChange(value: string) {
    setGameLength(value as GameLength);
    localStorage.setItem("gameLength", value.toString());
    window.dispatchEvent(new CustomEvent("gameLengthChanged", { detail: value }));
  }

  function handlePracticeTopicChange(value: string) {
    setPracticeTopic(value as PracticeTopic);
    localStorage.setItem("practiceTopic", value);
    window.dispatchEvent(new CustomEvent("practiceTopicChanged", { detail: value }));
  }

  function handleAudioEffectChange(value: string) {
    setAudioEffect(value as AudioEffect);
    localStorage.setItem("audioEffect", value);
    window.dispatchEvent(new CustomEvent("audioEffectChanged", { detail: value }));
  }

  return (
    <div>
      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet} modal>
        <SheetTrigger asChild>
          <Button className="text-lg text-white bg-gray-600">
            <SettingIcon className="self-center" /> Settings
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col gap-2 text-black dark:text-white bg-white dark:bg-gray-700 h-screen max-h-screen overflow-y-auto">
          <h2 className="text-3xl font-bold">Settings</h2>
          <hr /> <br />
          <div className="flex flex-col space-y-4">
            <span className="flex text-lg font-semibold">
              <SettingIcon className="self-center mr-2" /> General
            </span>
            <CustomRadio header="Grade Select: " defaultValue={selectedGrade} selectedValue={selectedGrade} onValueChange={handleGradeChange} options={GRADE_OPTIONS} />
            <CustomSwitch id="audio-toggle" text="Enable Audio" checked={audioEnabled} onCheckedChange={handleAudioEnabledChange} />
            <CustomSelect header="Language: " placeHolder={audioLanguage} selectedValue={audioLanguage} onValueChange={handleAudioLanguageChange} options={voiceOptions} />
          </div>
          <br />
          <div className="flex flex-col space-y-4">
            <span className="flex text-lg font-semibold">
              <SettingIcon className="self-center mr-2" /> Gameplay
            </span>
            <CustomRadio header="Braille display interval (seconds):" defaultValue={displayInterval} selectedValue={displayInterval} onValueChange={handleDisplayIntervalChange} options={BRAILLE_DISPLAY_INTERVAL_OPTIONS} />
            <CustomRadio header="Game length (mintues):" defaultValue={gameLength} selectedValue={gameLength} onValueChange={handleGameLengthChange} options={GAME_LENGTH_OPTIONS} />
            <CustomSelect header="Practice Topic:" placeHolder={practiceTopic} selectedValue={practiceTopic} onValueChange={handlePracticeTopicChange} options={PRACTICE_TOPIC_OPTIONS} />
            <CustomSelect header="Audio Effect:" placeHolder={audioEffect} selectedValue={audioEffect} onValueChange={handleAudioEffectChange} options={AUDIO_EFFECT_OPTIONS} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
