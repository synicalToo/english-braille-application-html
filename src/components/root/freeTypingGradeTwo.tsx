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
  BrailleUnicode,
  punctuation_mapping,
  signs_of_operation_and_comparison_mapping,
  currency_and_measurement_mapping,
  special_symbols_mapping,
  grouping_punctuation_mapping,
} from "@/contents/en/BrailleData";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Button } from "../ui/button";
import { BrailleFont } from "../customUI/brailleFont";
import { speakText } from "@/utils/audioUtils";

const DEBUG = false;

const keyToDotMap: { [key: string]: number } = {
  f: 1,
  d: 2,
  s: 3,
  j: 4,
  k: 5,
  l: 6,
};

export default function FreeTypingGradeTwo({ onBack }: { onBack: () => void }) {
  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));

  const [displayBoard, setDisplayBoard] = useState<string[]>([]);
  const [typingBoard, setTypingBoard] = useState<string[]>([]);

  const [currentInputHistory, setCurrentInputHistory] = useState<string[]>([]);
  const [tempString, setTempString] = useState<string>("");
  const itemList: { position: number; item: BrailleItem }[] = [];

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  useEffect(() => {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    if (storedAudioEnabled) {
      setAudioEnabled(storedAudioEnabled === "true");
    }

    const handleAudioSettingsChange = (event: CustomEvent) => {
      setAudioEnabled(event.detail);
    };

    window.addEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    return () => {
      window.removeEventListener("audioSettingsChanged", handleAudioSettingsChange as EventListener);
    };
  }, []);

  function resetInput() {
    setTypingBoard([]);
    setCurrentInputHistory([]);
    setTempString("");
    itemList.length = 0;
  }

  // Adds the processed result text to temp string
  // Temp string is palceholder for the final string
  // Final string is displayed when user presses enter key
  // Symbol always takes precedences over title in order to display
  // special chaarcters like !@#$,./?
  function addToFinalString(text: string) {
    const capitalIndicator = itemList.find((item) => item.item === BrailleData.indicators.content.capital_letter || item.item === BrailleData.indicators.content.capital_word || item.item === BrailleData.indicators.content.capital_passage);

    // Only proceed to add capitalize first character or capitalize entire word
    // if the capital indicator is in the first possible
    if (capitalIndicator && capitalIndicator.position === 0) {
      switch (capitalIndicator.item) {
        case BrailleData.indicators.content.capital_letter:
          setTempString((prev) => prev + text.charAt(0).toUpperCase() + text.slice(1));
          itemList.splice(itemList.indexOf(capitalIndicator), 1);
          break;
        case BrailleData.indicators.content.capital_word:
          setTempString((prev) => prev + text.toUpperCase());
          break;
        default:
          setTempString((prev) => prev + text);
          break;
      }
    } else {
      setTempString((prev) => prev + text);
    }
  }

  // Reset the string and typing board when user presses the spacebar
  // to simulate the end of a input
  function handleSpaceBarPressed() {
    setTempString((prev) => prev + " ");
    setTypingBoard((prev) => [...prev, "0"]);
    setCurrentInputHistory([]);
  }

  // Checks for all the indicator that can be present in the input
  // and remove them from the input while storing them into a list
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

  // Ran when the user only has one input remaining after
  // removing all the indicators
  function checkSingleInput(input: string[]) {
    let searchInputs;
    const findKey = [parseInt(input[0])];

    if (itemList.find((item) => item.item === BrailleData.indicators.content.number)) {
      searchInputs = [number_mapping];
    } else {
      searchInputs = [alphabetic_wordsigns_mapping, strong_contractions_mapping, strong_wordsigns_mapping, lower_wordsigns_mapping];
    }

    // Loops through all the search inputs and find all the entries whose
    // all keystroke matches the findKey
    for (const mapping of searchInputs) {
      const found = Array.from(mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
      if (found) {
        addToFinalString(found[1].symbol || found[1].title);
        return true;
      }
    }
    return false;
  }

  // Check for initial letter contractions of the number of input
  // after removing indicators is 2
  function checkInitialLetterContractions(input: string[]) {
    const findKey = [parseInt(input[0]), parseInt(input[1])];

    // Checks if the first inout matches the starting for initial letter contractions
    if (findKey[0] === 5 || findKey[0] === 45 || findKey[0] === 456) {
      // Returns a braille item if the keystrokes matches the inputs keystrokes
      const found = Array.from(initial_letter_contractions_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
      if (found) {
        addToFinalString(found[1].symbol || found[1].title);
        return true;
      }
    }
    return false;
  }

  // Checks for short form words if the input length is
  // more than or equals to 2 after removing indicators

  function checkShortformWords(input: string[]) {
    const findKey = [...input.map((val) => parseInt(val))];

    // Returns a braille item if the keystrokes matches the inputs keystrokes
    const shortformWordFound = Array.from(shortform_words_mapping.entries()).find(([key]) => key.length === findKey.length && key.every((val, i) => val === findKey[i]));
    if (shortformWordFound) {
      addToFinalString(shortformWordFound[1].symbol || shortformWordFound[1].title);
      return true;
    }
    return false;
  }

  function processInput(input: string[]) {
    const workingInput = [...input];

    checkIndicators(workingInput, [BrailleData.indicators.content.capital_letter, BrailleData.indicators.content.capital_word, BrailleData.indicators.content.capital_passage, BrailleData.indicators.content.number]);

    const numberIndicator = itemList.find((item) => item.item === BrailleData.indicators.content.number);
    let isInNumberMode = false;

    if (numberIndicator) {
      isInNumberMode = true;
    }

    if (workingInput.length === 1) {
      const tempInput = [...workingInput];
      if (isInNumberMode) {
        const numberMatch = Array.from(number_mapping.entries()).find(([key]) => key.length === 1 && key[0] === parseInt(tempInput[0]));
        if (numberMatch) {
          addToFinalString(numberMatch[1].symbol || numberMatch[1].title);
          handleSpaceBarPressed();
          return;
        }
      } else if (checkSingleInput(tempInput)) {
        handleSpaceBarPressed();
        return;
      }
    }

    if (workingInput.length === 2) {
      const tempInput = [...workingInput];
      if (checkInitialLetterContractions(tempInput)) {
        handleSpaceBarPressed();
        return;
      }
    }

    if (workingInput.length >= 2) {
      const tempInput = [...workingInput];
      if (checkShortformWords(tempInput)) {
        handleSpaceBarPressed();
        return;
      }
    }

    if (workingInput.length > 0) {
      const searchInputs = [
        initial_letter_contractions_mapping,
        strong_groupsigns_mapping,
        final_letter_groupsigns_mapping,
        lower_groupsigns_mapping,
        punctuation_mapping,
        grouping_punctuation_mapping,
        signs_of_operation_and_comparison_mapping,
        currency_and_measurement_mapping,
        special_symbols_mapping,
        alphabet_mapping,
      ];

      let currentIndex = 0;
      while (currentIndex < workingInput.length) {
        let matchFound = false;
        let matchLength = 0;
        const remainingLength = workingInput.length - currentIndex;

        const maxLength = Math.min(remainingLength, Math.max(...searchInputs.flatMap((mapping) => Array.from(mapping.keys()).map((key) => key.length))));

        for (let tryLength = maxLength; tryLength > 0 && !matchFound; tryLength--) {
          const matchSlice = workingInput.slice(currentIndex, currentIndex + tryLength).map((val) => parseInt(val));

          if (isInNumberMode) {
            if (tryLength === 1) {
              const numberMatch = Array.from(number_mapping.entries()).find(([key]) => key.length === 1 && key[0] === matchSlice[0]);

              if (numberMatch) {
                addToFinalString(numberMatch[1].symbol || numberMatch[1].title);
                matchFound = true;
                matchLength = 1;
                continue;
              }
            }

            const operationMatch = Array.from(signs_of_operation_and_comparison_mapping.entries()).find(([key]) => key.length === matchSlice.length && key.every((val, i) => val === matchSlice[i]));

            if (operationMatch) {
              addToFinalString(operationMatch[1].symbol || operationMatch[1].title);
              matchFound = true;
              matchLength = tryLength;
              continue;
            }
          }

          for (const mapping of searchInputs) {
            const possibleKeys = Array.from(mapping.keys()).filter((key) => key.length === tryLength);

            for (const key of possibleKeys) {
              if (key.every((val, i) => val === matchSlice[i])) {
                const found = mapping.get(key);
                if (found) {
                  if (mapping === lower_groupsigns_mapping) {
                    const isFirstPosition = currentIndex === 0;
                    const isMiddlePosition = currentIndex > 0 && currentIndex < workingInput.length - 1;

                    const isValid = (found.type === "first" && isFirstPosition) || (found.type === "middle" && isMiddlePosition) || found.type === "every";

                    if (isValid) {
                      addToFinalString(found.symbol || found.title);
                      matchFound = true;
                      matchLength = tryLength;
                      break;
                    }
                  } else {
                    addToFinalString(found.symbol || found.title);
                    matchFound = true;
                    matchLength = tryLength;
                    break;
                  }
                }
              }
            }
            if (matchFound) break;
          }
        }

        if (!matchFound) {
          currentIndex++;
          isInNumberMode = false;
        } else {
          currentIndex += matchLength;
        }
      }
    }
    handleSpaceBarPressed();
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
          speakText(tempString, audioEnabled);
          if (tempString.replace(/\s/g, "") != "") {
            setDisplayBoard((prev) => {
              const newBoard = [...prev, tempString];
              return newBoard.slice(-8);
            });
          }
          resetInput();
          break;
        case "backspace":
          setCurrentInputHistory((prev) => prev.slice(0, -1));
          setTypingBoard((prev) => prev.slice(0, -1));
          setTempString((prev) => prev.slice(0, -1));
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
    <div className="flex flex-col items-center border-2 rounded-md gap-4">
      <div className="flex justify-between items-center w-full p-2">
        <div className="w-24"></div>
        <h1 className="text-3xl font-semibold">Free Typing</h1>
        <div className="flex justify-end">
          <Button size="sm" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
      {/* Display Board */}
      <div className="flex flex-col w-full py-2 px-1 rounded-lg min-h-[200px]">
        <div className="relative w-full h-72">
          <Image src="/images/brailler_paper.png" alt="Brailler Paper" layout="fill" />
          <div className="absolute bottom-10 left-8 w-full h-full flex flex-col-reverse items-center justify-start px-5 py-3">
            <div className="w-full max-w-[458px] pt-3 flex flex-col-reverse items-start p-2 max-h-[220px] overflow-y-auto">
              {displayBoard
                .slice()
                .reverse()
                .map((line, lineIndex) => (
                  <div key={lineIndex} className="w-full flex items-start dark:invert">
                    <span>{line}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div /*{ typing board }*/ className="flex flex-col w-full py-4 px-2 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 ml-2">Typing Board</h2>
        <div className="flex flex-wrap items-start pb-2 px-4 border-b border-gray-300 gap-2">
          {typingBoard.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end">
              <BrailleFont>{BrailleUnicode[item]}</BrailleFont>
            </div>
          ))}
          <div className="w-full text-center pt-2">
            <p className="text-s font-semibold">{tempString}</p>
          </div>
        </div>
      </div>

      {DEBUG && (
        <>
          <div>Display board: {displayBoard.join("")}</div>
          <div>Current input history: {currentInputHistory.join("")}</div>
          <div>Typing board: {typingBoard.join("")}</div>
          <div>Registered input: {registeredInput.join("")}</div>
          <div>Current input: {Array.from(currentInput).join("")}</div>
          <div>Temp string: {tempString}</div>
        </>
      )}
    </div>
  );
}
