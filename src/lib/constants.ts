import { WordList } from "@/contents/en/wordList";

export const GRADE_OPTIONS = ["1", "2"] as const;
export const AUDIO_LANGUAGE_OPTIONS = ["Google US English", "Google 日本語"] as const;
export const LANGUAGE_CODE_MAP: { [key: string]: string } = {
  "Google US English": "en-US",
  "Google 日本語": "ja-JP",
};

export const BRAILLE_DISPLAY_INTERVAL_OPTIONS = ["1", "2", "3", "4", "5", "6", "7"] as const;
export const GAME_LENGTH_OPTIONS = ["1", "2", "3", "4", "5"] as const;
export const PRACTICE_TOPIC_OPTIONS = ["Alphabetical", "Numbers", "3-syllable words", "4-syllable words", "5-syllable words", "Short sentences", "All"] as const;
export const AUDIO_EFFECT_OPTIONS = ["None", "Default", "Cute", "Cyber", "Fight", "Support"] as const;
export const TYPING_MODE_OPTIONS = ["Alphabet", "Number", "Capital letter", "Capital word", "Capital passage"] as const;

export type GameState = "countdown" | "gameplay" | "gameover";
export type TypingMode = (typeof TYPING_MODE_OPTIONS)[number];

export const keyToDotMap: { [key: string]: number } = {
  f: 0,
  d: 1,
  s: 2,
  j: 3,
  k: 4,
  l: 5,
};

export type Grade = (typeof GRADE_OPTIONS)[number];
export type AudioLanguage = (typeof AUDIO_LANGUAGE_OPTIONS)[number];
export type BrailleDisplayInterval = (typeof BRAILLE_DISPLAY_INTERVAL_OPTIONS)[number];
export type GameLength = (typeof GAME_LENGTH_OPTIONS)[number];
export type PracticeTopic = (typeof PRACTICE_TOPIC_OPTIONS)[number];
export type AudioEffect = (typeof AUDIO_EFFECT_OPTIONS)[number];
