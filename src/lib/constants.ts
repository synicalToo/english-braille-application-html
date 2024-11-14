export const audioLangugeOptions: string[] = ["English", "Japanese"];

export const brailleDisplayIntervalOptions: string[] = ["1", "2", "3", "4", "5", "6", "7"];
export const gameLengthOptions: string[] = ["1", "2", "3", "4", "5"];
export const practiceTopicOptions: string[] = ["Words", "Numbers"];
export const audioEffectOptions: string[] = ["None", "Quiz", "Cyber"];

export enum TypingMode {
  "Alphabets",
  "Numbers",
  "Capital",
  "Capital Word",
  "Capital Passage",
}

export const typingMode: { [mode: string]: string } = {
  alphabet: "Alphabet",
  number: "Number",
  capital_letter: "Capital letter",
  capital_word: "Capital word",
  capital_passage: "Capital passage",
};
