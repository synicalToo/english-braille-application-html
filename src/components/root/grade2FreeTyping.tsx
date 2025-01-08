import React, { useEffect, useState } from "react";

import Image from "next/image";
import { keyToDotMap } from "@/lib/constants";
import { ch, ch_map, num, abb, aw_map, sw_map, sc_map, sg_map, lw_map, sfw_map, ilc_map, flg_map, punc, indicator, indicators } from "@/contents/en/grade2BrailleData";
import { Button } from "../ui/button";

interface FeaturesFlag {
  candidate: any[];
  prepos: number;
  dicidedflg: boolean;
  didflg: boolean;
  ilcflg: boolean;
  flgflg: boolean;
  falflg: boolean;
  numflg: boolean;
  grdflg: boolean;
  capflg: boolean;
  capflg2: boolean;
  capflg3: boolean;
  itaflg: boolean;
  itaflg2: boolean;
  itaflg3: boolean;
  bolflg: boolean;
  bolflg2: boolean;
  bolflg3: boolean;
  undflg: boolean;
  undflg2: boolean;
  undflg3: boolean;
  cap_list: any[];
  ita_list: any[];
  bol_list: any[];
  und_list: any[];
  temp: string;
}

interface GameAudio {
  limit_reached: HTMLAudioElement;
  next_line: HTMLAudioElement;
}

export default function grade2FreeTyping({ onBack }: { onBack: () => void }) {
  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));
  const [inputs, setInputs] = useState<number[]>([]);

  const [displayBoard, setDisplayBoard] = useState<{ text: string }[]>([]);
  const [inputPosition, setinputPosition] = useState(0);

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [gameAudio] = useState<GameAudio>({
    limit_reached: new Audio("/audio/default/incorrect.mp3"),
    next_line: new Audio("/audio/_typing.mp3"),
  });

  const [featuresFlag, setFeaturesFlag] = useState<FeaturesFlag>({
    candidate: [],
    prepos: 0b000000,

    dicidedflg: false,
    didflg: false,
    ilcflg: false,
    flgflg: false,
    falflg: false,
    numflg: false,
    grdflg: false,

    capflg: false,
    capflg2: false,
    capflg3: false,

    itaflg: false,
    itaflg2: false,
    itaflg3: false,

    bolflg: false,
    bolflg2: false,
    bolflg3: false,

    undflg: false,
    undflg2: false,
    undflg3: false,

    cap_list: [],
    ita_list: [],
    bol_list: [],
    und_list: [],

    temp: "",
  });

  const MAX_TYPING_LIMIT = 20;

  function playSound(audio: HTMLAudioElement) {
    if (!audio.paused) {
      return;
    }
    audio.currentTime = 0;
    audio.play();
  }
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

  function initValue() {
    setFeaturesFlag({
      candidate: [],
      prepos: 0b000000,

      dicidedflg: false,
      didflg: false,
      ilcflg: false,
      flgflg: false,
      falflg: false,
      numflg: false,
      grdflg: false,

      capflg: false,
      capflg2: false,
      capflg3: false,

      itaflg: false,
      itaflg2: false,
      itaflg3: false,

      bolflg: false,
      bolflg2: false,
      bolflg3: false,

      undflg: false,
      undflg2: false,
      undflg3: false,

      cap_list: [],
      ita_list: [],
      bol_list: [],
      und_list: [],

      temp: "",
    });
  }

  function searchCapital() {
    featuresFlag.capflg = false;
    featuresFlag.capflg2 = false;
    featuresFlag.cap_list = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] === indicator[2]["ptn"][0]) {
        featuresFlag.capflg = true;
        featuresFlag.cap_list.push(i);
      }
    }

    if (featuresFlag.capflg) {
      for (let i = 0; i < featuresFlag.cap_list.length; i++) {
        inputs.splice(featuresFlag.cap_list[i] - i, 1);
      }

      if (featuresFlag.cap_list.length > 1) {
        if (featuresFlag.cap_list[0] === featuresFlag.cap_list[1] - 1) {
          featuresFlag.capflg2 = true;
          featuresFlag.capflg = false;
          if (featuresFlag.cap_list.length > 2) {
            if (featuresFlag.cap_list[1] === featuresFlag.cap_list[2] - 1) {
              featuresFlag.capflg3 = true;
              featuresFlag.capflg2 = false;
            }
          }
        }
      }
    }
  }

  function removePatterns(inputs: any, patterns: any) {
    for (const pattern of patterns) {
      const positions = [];
      for (let i = 0; i < inputs.length - 1; i++) {
        if (inputs.slice(i, i + 2).join("") === pattern["ptn"].join("")) {
          positions.push(i);
        }
      }
      for (let i = 0; i < positions.length; i++) {
        inputs.splice(positions[i] - i * 2, 1);
        inputs.splice(positions[i] - i * 2, 1);
      }
    }
  }

  function searchInputWord(candidate: any, inputs: any, target: any) {
    for (const map of candidate) {
      const entries = Array.from(map.entries()) as [any, any][];
      const result = entries.find(([pattern, item]) => item.ptn[target] === inputs);
      if (result) {
        if (target === 1 && featuresFlag.prepos === result[1].ptn[0]) {
          return result[1].wd;
        } else if (target === 0) {
          return result[1].wd;
        }
      }
    }
    return -1;
  }

  function whenInputLenIsOne() {
    const candidate = [aw_map, sw_map, sc_map, lw_map];
    const les = searchInputWord(candidate, inputs[0], 0);
    if (les === -1) {
      featuresFlag.falflg = true;
    } else {
      featuresFlag.temp += les;
      featuresFlag.dicidedflg = true;
    }
  }

  function isInitialLetterContractions() {
    if (inputs[0] in [0b000010, 0b000110, 0b000111]) {
      featuresFlag.prepos = inputs[0];
      const les = searchInputWord(abb[7], inputs[1], 1);
      featuresFlag.prepos = 0b000000;
      if (les === -1) {
        featuresFlag.falflg = true;
      } else {
        featuresFlag.temp += les;
        featuresFlag.dicidedflg = true;
      }
    }
  }

  function isShortformWords() {
    const result = Array.from(sfw_map.entries()).find(([pattern]) => {
      return pattern.every((val, index) => val === inputs[index]) && pattern.length === inputs.length;
    });

    if (result) {
      featuresFlag.temp += result[1].wd;
      featuresFlag.dicidedflg = true;
    }
  }

  function whenNumflgIsTrue(i: any) {
    let les: any = -1;
    for (const n of num) {
      if (inputs[i] === n["ptn"][0]) {
        les = n["wd"];
      }
    }
    if (les === -1) {
      featuresFlag.numflg = false;
    } else {
      featuresFlag.temp += les;
      featuresFlag.didflg = true;
    }
  }

  function whenGrdflgIsTrue(i: any) {
    let les: any = -1;
    for (const c of ch) {
      if (inputs[i] === c["ptn"][0]) {
        les = c["wd"];
      }
    }
    if (les === -1) {
      featuresFlag.grdflg = false;
      featuresFlag.falflg = true;
    } else {
      featuresFlag.temp += les;
      featuresFlag.didflg = true;
    }
  }

  function whenIlcflgIsTrue(i: any) {
    for (const ilcs of abb[7]) {
      if (inputs[i] === ilcs["ptn"][1] && featuresFlag.prepos === ilcs["ptn"][0]) {
        const les = searchInputWord(ilc_map, inputs[i], 1);
        if (les === -1) {
          featuresFlag.falflg = true;
        } else {
          featuresFlag.temp += les;
          featuresFlag.didflg = true;
        }
      }
    }
    featuresFlag.ilcflg = false;
    featuresFlag.prepos = 0b000000;
  }

  function whenFlgflgIsTrue(i: any) {
    for (const flgs of abb[8]) {
      if (inputs[i] === flgs["ptn"][1] && featuresFlag.prepos === flgs["ptn"][0]) {
        const les = searchInputWord(flg_map, inputs[i], 1);
        if (les === -1) {
          featuresFlag.falflg = true;
        } else {
          featuresFlag.temp += les;
          featuresFlag.didflg = true;
        }
      }
    }
    featuresFlag.flgflg = false;
    featuresFlag.prepos = 0b000000;
  }

  function whenInputIsLowerGroupsigns1(i: any) {
    for (const lgs of abb[5]) {
      if (inputs[i] === lgs["ptn"][0] && "type" in lgs && (lgs["type"] === "fst" || lgs["type"] === "ever")) {
        featuresFlag.temp += lgs["wd"];
        featuresFlag.didflg = true;
      }
    }
  }

  function whenInputIsLowerGroupsigns2(i: any) {
    for (const lgs of abb[5]) {
      if (inputs[i] === lgs["ptn"][0] && "type" in lgs && (lgs["type"] === "mid" || lgs["type"] === "ever")) {
        featuresFlag.temp += lgs["wd"];
        featuresFlag.didflg = true;
      }
    }
  }

  function whenInputIsLowerGroupsigns3(i: any) {
    for (const lgs of abb[5]) {
      if (inputs[i] === lgs["ptn"][0] && "type" in lgs && lgs["type"] === "ever") {
        featuresFlag.temp += lgs["wd"];
        featuresFlag.didflg = true;
      }
    }
  }

  function whenInputIsPunctions(i: any) {
    for (const puncs of punc) {
      if (inputs[i] === puncs["ptn"][0]) {
        if (i === inputs.length - 1 && puncs["type"] === "lst") {
          featuresFlag.temp += puncs["wd"];
          featuresFlag.didflg = true;
        } else if (i !== 0 && puncs["type"] === "notfst") {
          featuresFlag.temp += puncs["wd"];
          featuresFlag.didflg = true;
        } else if (puncs["type"] === "ever") {
          featuresFlag.temp += puncs["wd"];
          featuresFlag.didflg = true;
        }
      }
    }
  }

  function whenInputIsOthers(i: any) {
    const candidate = [ch_map, sc_map, sg_map];
    const les = searchInputWord(candidate, inputs[i], 0);
    if (les === -1) {
      featuresFlag.falflg = true;
    } else {
      featuresFlag.temp += les;
    }
  }

  function wrongInput() {
    console.log("wrong input");
  }

  function tocapital(temp: string, cap_list: number[]): string {
    for (let i = 0; i < cap_list.length; i++) {
      const new_text = temp.slice(0, cap_list[i] - i) + temp.slice(cap_list[i] - i, cap_list[i] + 1 - i).toUpperCase() + temp.slice(cap_list[i] + 1 - i);
      temp = new_text;
    }
    return temp;
  }

  function tocapital2(temp: string): string {
    return temp.toUpperCase();
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (!gameAudio.limit_reached.paused) {
        gameAudio.limit_reached.pause();
        gameAudio.limit_reached.currentTime = 0;
      }

      switch (event.key) {
        case " ":
          event.preventDefault();
          if (inputPosition < MAX_TYPING_LIMIT) {
            setinputPosition(inputPosition + 1);
            featuresFlag.temp += " ";
            setDisplayBoard((prev) => [...prev, { text: featuresFlag.temp }]);
          }
          break;
        case "Enter":
          event.preventDefault();
          searchCapital();
          for (const keys in indicators) {
            removePatterns(inputs, indicators[keys as keyof typeof indicators]);
          }

          if (inputs.length === 1) {
            whenInputLenIsOne();
          } else if (inputs.length === 2) {
            isInitialLetterContractions();
          }
          if (inputs.length > 1) {
            isShortformWords();
          }

          if (!featuresFlag.dicidedflg && !featuresFlag.falflg) {
            for (let i = 0; i < inputs.length; i++) {
              featuresFlag.didflg = false;
              let les = -1;
              if (featuresFlag.numflg) {
                whenNumflgIsTrue(i);
              }
              if (featuresFlag.grdflg) {
                whenGrdflgIsTrue(i);
              }
              if (featuresFlag.ilcflg) {
                whenIlcflgIsTrue(i);
              } else if (featuresFlag.flgflg) {
                whenFlgflgIsTrue(i);
              } else if (inputs[i] === indicator[0]["ptn"][0]) {
                featuresFlag.numflg = true;
                featuresFlag.didflg = true;
              } else if (inputs[i] === indicator[1]["ptn"][0] && (i === 0 || featuresFlag.numflg === true || featuresFlag.capflg === true)) {
                featuresFlag.grdflg = true;
                featuresFlag.numflg = false;
                featuresFlag.didflg = true;
              } else if (i != inputs.length - 1 && inputs[i] in [0b000010, 0b000110, 0b000111]) {
                featuresFlag.ilcflg = true;
                featuresFlag.prepos = inputs[i];
                featuresFlag.didflg = true;
              } else if (i === inputs.length - 2 && inputs[i] in [0b000101, 0b000011] && inputs.length > 2) {
                featuresFlag.flgflg = true;
                featuresFlag.prepos = inputs[i];
                featuresFlag.didflg = true;
              } else if (i === 0 && inputs.length !== 1) {
                whenInputIsLowerGroupsigns1(i);
              } else if (i != inputs.length - 1 && inputs.length >= 3) {
                whenInputIsLowerGroupsigns2(i);
              } else if (i === inputs.length - 1 && inputs.length >= 2) {
                whenInputIsLowerGroupsigns3(i);
              }
              if (!featuresFlag.didflg) {
                whenInputIsPunctions(i);
              }
              if (!featuresFlag.didflg) {
                whenInputIsOthers(i);
              }
            }
          }

          if (featuresFlag.falflg) {
            wrongInput();
          } else {
            if (featuresFlag.temp !== "") {
              if (featuresFlag.capflg) {
                featuresFlag.temp = tocapital(featuresFlag.temp, featuresFlag.cap_list);
              } else if (featuresFlag.capflg2) {
                featuresFlag.temp = tocapital2(featuresFlag.temp);
              } else if (featuresFlag.capflg3) {
                featuresFlag.temp = tocapital2(featuresFlag.temp);
              }
            }
          }

          setDisplayBoard((prev) => {
            const newBoard = [...prev, { text: featuresFlag.temp }];
            return newBoard.slice(-8);
          });
          initValue();

          setCurrentInput(new Set());
          setRegisteredInput(Array(6));
          setInputs([]);
          setinputPosition(0);
          playSound(gameAudio.next_line);
          break;
        default:
          break;
      }

      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase()) && inputPosition <= MAX_TYPING_LIMIT) {
        setCurrentInput((prev) => new Set([...Array.from(prev), event.key.toLowerCase()]));
        setRegisteredInput((prev) => {
          const dotIndex = keyToDotMap[event.key.toLowerCase()];
          if (dotIndex !== undefined) {
            const newRegisteredInput = [...prev];
            newRegisteredInput[dotIndex] = (dotIndex + 1).toString();
            return newRegisteredInput;
          }
          return prev;
        });
      }
    };

    const handleKeyup = (event: KeyboardEvent): void => {
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(event.key.toLowerCase());
        setCurrentInput(updatedInput);

        if (registeredInput.every((input) => !input)) {
          return;
        }

        if (updatedInput.size != 0) return;

        if (inputPosition == MAX_TYPING_LIMIT) {
          event.preventDefault();
          playSound(gameAudio.limit_reached);
          return;
        } else {
          const combinedEncoding = parseInt(registeredInput.map((num) => (num ? "1" : "0")).join(""), 2);

          setInputs((prev) => [...prev, combinedEncoding]);
          setRegisteredInput(Array(6));
          setinputPosition(inputPosition + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [currentInput, registeredInput]);

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
                  <div key={lineIndex} className="w-full flex flex-col items-start">
                    {line.text}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div /*{ typing board }*/ className="flex flex-col w-full py-4 px-2 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 ml-2">Typing Board</h2>
        <div className="flex flex-wrap items-start pb-2 px-4 border-b border-gray-300 gap-2">
          {inputs.map((input, index) => (
            <div key={index} className="flex flex-col items-center justify-end">
              {input}
            </div>
          ))}
        </div>
      </div>
      <div id="typing-mode" className="mt-2 flex items-center gap-2 p-2 rounded">
        <div className="flex gap-2"></div>
      </div>
    </div>
  );
}
