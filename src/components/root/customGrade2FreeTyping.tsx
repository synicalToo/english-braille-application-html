import {
  BrailleData,
  BrailleItem,
  alphabet_mapping,
  alphabetic_wordsigns_mapping,
  strong_contractions_mapping,
  strong_wordsigns_mapping,
  strong_groupsigns_mapping,
  lower_wordsigns_mapping,
  lower_groupsigns_mapping,
  initial_letter_contractions_mapping,
  shortform_words_mapping,
  final_letter_groupsigns_mapping,
  number_mapping,
} from "@/contents/en/refinedBrailleData";
import React, { useState, useEffect } from "react";

const keyToDotMap: { [key: string]: number } = {
  f: 1,
  d: 2,
  s: 3,
  j: 4,
  k: 5,
  l: 6,
};

export default function customGrade2FreeTyping({ onBack }: { onBack: () => void }) {
  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));

  const [displayBoard, setDisplayBoard] = useState<string[]>([]);
  const [typingBoard, setTypingBoard] = useState<string[]>([]);

  const [currentInputHistory, setCurrentInputHistory] = useState<string[]>([]);
  const [tempString, setTempString] = useState<string[]>([]);
  const itemList: { position: number; item: BrailleItem }[] = [];

  function resetInput() {
    setTypingBoard([]);
    setCurrentInputHistory([]);
    setTempString([]);
    itemList.length = 0;
  }

  function addToFinalString(text: string) {
    switch (itemList[0]?.item) {
      case BrailleData.indicators.content.capital_letter:
        setTempString((prev) => [...prev, text.charAt(0).toUpperCase() + text.slice(1)]);
        break;
      case BrailleData.indicators.content.capital_word:
        setTempString((prev) => [...prev, text.toUpperCase()]);
        break;
      default:
        setTempString((prev) => [...prev, text]);
        break;
    }
  }

  function checkIndicators(input: string[], patterns: BrailleItem[]) {
    patterns.sort((a, b) => b.keystroke.length - a.keystroke.length);

    for (let i = 0; i < input.length; ) {
      let matched = false;

      for (const pattern of patterns) {
        const compare = input.slice(i, i + pattern.keystroke.length);
        if (compare.join("") === pattern.keystroke.join("")) {
          itemList.push({ position: i, item: pattern });
          input.splice(i, pattern.keystroke.length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        i++;
      }
    }
  }

  function checkSingleInput(input: string[]) {
    if (itemList.find((item) => item.item === BrailleData.indicators.content.number)) return false;

    const findKey = [parseInt(input[0])];

    const searchInputs = [alphabetic_wordsigns_mapping, strong_contractions_mapping, strong_wordsigns_mapping, lower_wordsigns_mapping];
    for (const mapping of searchInputs) {
      const found = Array.from(mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
      if (found) {
        addToFinalString(found[1].symbol || found[1].title);
        input.splice(0, 1);
        return true;
      }
    }
    return false;
  }

  function checkInitialLetterContractions(input: string[]) {
    const findKey = [parseInt(input[0]), parseInt(input[1])];

    if (findKey[0] === 5 || findKey[0] === 45 || findKey[0] === 456) {
      const found = Array.from(initial_letter_contractions_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
      if (found) {
        addToFinalString(found[1].symbol || found[1].title);
        input.splice(0, 2);
      }
    }
  }

  function checkShortformWords(input: string[]) {
    const findKey = [...input.map((val) => parseInt(val))];

    const shortformWordFound = Array.from(shortform_words_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
    if (shortformWordFound) {
      addToFinalString(shortformWordFound[1].symbol || shortformWordFound[1].title);
      input.splice(0, findKey.length);
      return true;
    }
    return false;
  }

  function checkNumbers(input: string[], startIndex: number) {
    const findKey = [parseInt(input[startIndex])];

    const numberFound = Array.from(number_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
    if (numberFound) {
      addToFinalString(numberFound[1].symbol || numberFound[1].title);
      input.splice(startIndex, 1);
      return true;
    }

    return false;
  }

  function checkSpecialCharacters(input: string[], startIndex: number) {
    const findKey = [parseInt(input[startIndex])];

    const alphabetFound = Array.from(alphabet_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
    if (alphabetFound) {
      addToFinalString(alphabetFound[1].symbol || alphabetFound[1].title);
      input.splice(startIndex, 1);
      return true;
    }

    const strongContractionFound = Array.from(strong_contractions_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
    if (strongContractionFound) {
      addToFinalString(strongContractionFound[1].symbol || strongContractionFound[1].title);
      input.splice(startIndex, 1);
      return true;
    }

    const strongGroupFound = Array.from(strong_groupsigns_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
    if (strongGroupFound) {
      addToFinalString(strongGroupFound[1].symbol || strongGroupFound[1].title);
      input.splice(startIndex, 1);
      return true;
    }

    const maxLength = Math.min(input.length - startIndex, 3);

    for (let keyLength = maxLength; keyLength > 0; keyLength--) {
      const findKey = input.slice(startIndex, startIndex + keyLength).map((val) => parseInt(val));

      const lowerGroupMatches = Array.from(lower_groupsigns_mapping.entries()).filter(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));

      const numberIndicator = itemList.find((item) => item.item === BrailleData.indicators.content.number);
      if (!numberIndicator) {
        for (const [_, item] of lowerGroupMatches) {
          if (startIndex === 0 && input.length !== 1 && (item.type === "first" || item.type === "every")) {
            addToFinalString(item.symbol || item.title);
            input.splice(startIndex, keyLength);
            return true;
          }

          if (startIndex !== input.length - 1 && input.length >= 3 && (item.type === "middle" || item.type === "every")) {
            addToFinalString(item.symbol || item.title);
            input.splice(startIndex, keyLength);
            return true;
          }

          if (startIndex === input.length - 1 && input.length >= 2 && item.type === "every") {
            addToFinalString(item.symbol || item.title);
            input.splice(startIndex, keyLength);
            return true;
          }
        }
      }

      const searchCategories = [BrailleData.punctuation.content, BrailleData.signs_of_operation_and_comparison.content, BrailleData.currency_and_measurement.content, BrailleData.special_symbols.content, BrailleData.grouping_punctuation.content];
      for (const category of searchCategories) {
        const found = Object.entries(category).find(([_, item]) => {
          const keystroke = item.keystroke.map((k) => parseInt(k));
          return keystroke.length === findKey.length && keystroke.every((val, i) => val === findKey[i]);
        });

        if (found) {
          addToFinalString(found[1].symbol || found[1].title);
          input.splice(startIndex, keyLength);
          return true;
        }
      }
    }

    return false;
  }

  function processInput(input: string[]) {
    checkIndicators(input, [BrailleData.indicators.content.capital_letter, BrailleData.indicators.content.capital_word, BrailleData.indicators.content.capital_passage, BrailleData.indicators.content.number]);

    if (input.length === 1 && checkSingleInput(input)) {
      setTempString((prev) => [...prev, " "]);
      setTypingBoard((prev) => [...prev, " "]);
      setCurrentInputHistory([]);
      return;
    }

    if (input.length === 2) {
      checkInitialLetterContractions(input);
    }

    if (input.length > 0 && checkShortformWords(input)) {
      setTempString((prev) => [...prev, " "]);
      setTypingBoard((prev) => [...prev, " "]);
      setCurrentInputHistory([]);
      return;
    }

    if (input.length === 0) {
      setTempString((prev) => [...prev, " "]);
      setTypingBoard((prev) => [...prev, " "]);
      setCurrentInputHistory([]);
      return;
    }

    const numberIndicator = itemList.find((item) => item.item === BrailleData.indicators.content.number);

    if (numberIndicator) {
      let i = numberIndicator.position;
      while (i < input.length) {
        if (!checkNumbers(input, i)) {
          if (!checkSpecialCharacters(input, i)) {
            i++;
          }
        }
      }
    } else {
      let i = 0;
      while (i < input.length) {
        if (!checkSpecialCharacters(input, i)) {
          i++;
        }
      }
    }

    setTempString((prev) => [...prev, " "]);
    setTypingBoard((prev) => [...prev, " "]);
    setCurrentInputHistory([]);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();

          processInput(currentInputHistory);

          break;
        case "enter":
          e.preventDefault();

          setDisplayBoard((prev) => [...prev, ...tempString]);
          resetInput();
          break;
        case "backspace":
          setCurrentInputHistory((prev) => prev.slice(0, -1));
          setTypingBoard((prev) => prev.slice(0, -1));
          tempString.pop();
          break;
        default:
          break;
      }

      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
        setCurrentInput((prev) => new Set([...Array.from(prev), e.key.toLowerCase()]));
        setRegisteredInput((prev) => {
          const dotIndex = keyToDotMap[e.key.toLowerCase()];
          if (dotIndex !== undefined) {
            const newRegisteredInput = [...prev];
            newRegisteredInput[dotIndex] = dotIndex.toString();
            return newRegisteredInput;
          }
          return prev;
        });
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (Object.keys(keyToDotMap).includes(e.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(e.key.toLowerCase());

        setCurrentInput(updatedInput);

        if (registeredInput.every((input) => !input)) {
          return;
        }
        if (updatedInput.size != 0) return;

        const combinedEncoding = registeredInput.join("");
        setCurrentInputHistory((prev) => [...prev, combinedEncoding]);
        setRegisteredInput(Array(6));

        let results: { title: string; symbol: string } | null = null;

        setTypingBoard((prev) => [...prev, combinedEncoding]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentInput, registeredInput, typingBoard, displayBoard, currentInputHistory, itemList, tempString]);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div>Display board: {displayBoard.join("")}</div>
      <div>Current input history: {currentInputHistory.join("")}</div>
      <div>Typing board: {typingBoard.join("")}</div>
      <div>Registered input: {registeredInput.join("")}</div>
      <div>Current input: {Array.from(currentInput).join("")}</div>
      <div>Temp string: {tempString.join("")}</div>
    </div>
  );
}
