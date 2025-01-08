// Types for the character mappings
type CharacterMap = {
  wd: string;
  ptn: number[];
  txt: null;
  type?: string;
};

// Function to convert text to capital based on specific positions
export function toCapital(text: string, capitalPositions: number[]): string {
  let newText = text;
  for (let i = 0; i < capitalPositions.length; i++) {
    newText = newText.slice(0, capitalPositions[i] - i) + newText.slice(capitalPositions[i] - i, capitalPositions[i] + 1 - i).toUpperCase() + newText.slice(capitalPositions[i] + 1 - i);
  }
  return newText;
}

// Function to convert entire text to capital
export function toCapital2(text: string): string {
  return text.toUpperCase();
}

// Function to initialize values (can be adapted based on your state management needs)
export function initValue() {
  return {
    pushed: 0b000000,
    inputs: [],
    candidate: [],
    prepos: 0b000000,
    decidedFlag: false,
    didFlag: false,
    ilcFlag: false,
    flgFlag: false,
    falFlag: false,
    numFlag: false,
    grdFlag: false,
    capFlag: false,
    capFlag2: false,
    capFlag3: false,
    itaFlag: false,
    itaFlag2: false,
    itaFlag3: false,
    bolFlag: false,
    bolFlag2: false,
    bolFlag3: false,
    undFlag: false,
    undFlag2: false,
    undFlag3: false,
    capList: [],
    itaList: [],
    bolList: [],
    undList: [],
    temp: "",
  };
}

// Function to search for capital letters in input
export function searchCapital(inputs: number[], indicator: CharacterMap[]) {
  let capFlag = false;
  let capFlag2 = false;
  let capFlag3 = false;
  const capList: number[] = [];

  // Check for capital indicators in input
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === indicator[2].ptn[0]) {
      capFlag = true;
      capList.push(i);
    }
  }

  if (capFlag) {
    // Remove capital indicators from input
    for (let i = 0; i < capList.length; i++) {
      inputs.splice(capList[i] - i, 1);
    }

    // Check for word or passage capitalization
    if (capList.length > 1) {
      if (capList[0] === capList[1] - 1) {
        capFlag2 = true;
        capFlag = false;
        if (capList.length > 2) {
          if (capList[1] === capList[2] - 1) {
            capFlag3 = true;
            capFlag2 = false;
          }
        }
      }
    }
  }

  return {
    capFlag,
    capFlag2,
    capFlag3,
    capList,
    modifiedInputs: inputs,
  };
}

// Function to search for input word in a map
export function searchInputWord(candidate: Record<string, CharacterMap>, input: number, target: number, prepos: number = 0): string | -1 {
  for (const [pattern, item] of Object.entries(candidate)) {
    if (target === 1 && prepos === item.ptn[0]) {
      return item.wd;
    } else if (target === 0) {
      return item.wd;
    }
  }
  return -1;
}

// Function to handle wrong input
export function wrongInput(): void {
  console.log("wrong");
}

// Function to handle numeric flag
export function whenNumFlagIsTrue(i: number, inputs: number[], num: CharacterMap[]): { les: string | undefined; numFlag: boolean; temp: string; didFlag: boolean } {
  let les: string | undefined;
  for (const n of num) {
    if (inputs[i] === n.ptn[0]) {
      les = n.wd;
    }
  }
  return {
    les,
    numFlag: les === undefined ? false : true,
    temp: les || "",
    didFlag: les !== undefined,
  };
}

// Function to handle grade flag
export function whenGrdFlagIsTrue(i: number, inputs: number[], ch: CharacterMap[]): { les: string | undefined; grdFlag: boolean; falFlag: boolean; temp: string; didFlag: boolean } {
  let les: string | undefined;
  for (const c of ch) {
    if (inputs[i] === c.ptn[0]) {
      les = c.wd;
    }
  }
  return {
    les,
    grdFlag: les === undefined ? false : true,
    falFlag: les === undefined,
    temp: les || "",
    didFlag: les !== undefined,
  };
}

// Function to handle ILC flag
export function whenIlcFlagIsTrue(
  i: number,
  inputs: number[],
  ilcMap: Record<string, CharacterMap>,
  prepos: number
): {
  les: string | -1;
  falFlag: boolean;
  temp: string;
  didFlag: boolean;
  ilcFlag: boolean;
  newPrepos: number;
} {
  const les = searchInputWord(ilcMap, inputs[i], 1, prepos);
  return {
    les,
    falFlag: les === -1,
    temp: les === -1 ? "" : les,
    didFlag: les !== -1,
    ilcFlag: false,
    newPrepos: 0,
  };
}

// Function to handle FLG flag
export function whenFlgFlagIsTrue(
  i: number,
  inputs: number[],
  flgMap: Record<string, CharacterMap>,
  prepos: number
): {
  les: string | -1;
  falFlag: boolean;
  temp: string;
  didFlag: boolean;
  flgFlag: boolean;
  newPrepos: number;
} {
  const les = searchInputWord(flgMap, inputs[i], 1, prepos);
  return {
    les,
    falFlag: les === -1,
    temp: les === -1 ? "" : les,
    didFlag: les !== -1,
    flgFlag: false,
    newPrepos: 0,
  };
}

// Function to handle lower groupsigns (first position)
export function whenInputIsLowerGroupsigns1(i: number, inputs: number[], lowerGroupSigns: CharacterMap[]): { temp: string; didFlag: boolean } {
  for (const lgs of lowerGroupSigns) {
    if (inputs[i] === lgs.ptn[0] && (lgs.type === "fst" || lgs.type === "ever")) {
      return { temp: lgs.wd, didFlag: true };
    }
  }
  return { temp: "", didFlag: false };
}

// Function to handle lower groupsigns (middle position)
export function whenInputIsLowerGroupsigns2(i: number, inputs: number[], lowerGroupSigns: CharacterMap[]): { temp: string; didFlag: boolean } {
  for (const lgs of lowerGroupSigns) {
    if (inputs[i] === lgs.ptn[0] && (lgs.type === "mid" || lgs.type === "ever")) {
      return { temp: lgs.wd, didFlag: true };
    }
  }
  return { temp: "", didFlag: false };
}

// Function to handle lower groupsigns (last position)
export function whenInputIsLowerGroupsigns3(i: number, inputs: number[], lowerGroupSigns: CharacterMap[]): { temp: string; didFlag: boolean } {
  for (const lgs of lowerGroupSigns) {
    if (inputs[i] === lgs.ptn[0] && lgs.type === "ever") {
      return { temp: lgs.wd, didFlag: true };
    }
  }
  return { temp: "", didFlag: false };
}

// Function to handle punctuation
export function whenInputIsPunctions(i: number, inputs: number[], punc: CharacterMap[]): { temp: string; didFlag: boolean } {
  for (const puncs of punc) {
    if (inputs[i] === puncs.ptn[0]) {
      if (i === inputs.length - 1 && puncs.type === "lst") {
        return { temp: puncs.wd, didFlag: true };
      } else if (i !== 0 && puncs.type === "notfst") {
        return { temp: puncs.wd, didFlag: true };
      } else if (puncs.type === "ever") {
        return { temp: puncs.wd, didFlag: true };
      }
    }
  }
  return { temp: "", didFlag: false };
}

// Function to handle other inputs
export function whenInputIsOthers(
  i: number,
  inputs: number[],
  chMap: Record<string, CharacterMap>,
  scMap: Record<string, CharacterMap>,
  sgMap: Record<string, CharacterMap>
): {
  falFlag: boolean;
  temp: string;
} {
  const candidate = { ...chMap, ...scMap, ...sgMap };
  const les = searchInputWord(candidate, inputs[i], 0);
  return {
    falFlag: les === -1,
    temp: les === -1 ? "" : les,
  };
}

// Function to remove patterns from inputs
export function removePatterns(inputs: number[], patterns: CharacterMap[]): number[] {
  const newInputs = [...inputs];
  for (const pattern of patterns) {
    const positions: number[] = [];
    for (let i = 0; i < newInputs.length - 1; i++) {
      if (newInputs[i] === pattern.ptn[0] && newInputs[i + 1] === pattern.ptn[1]) {
        positions.push(i);
      }
    }
    for (let i = positions.length - 1; i >= 0; i--) {
      newInputs.splice(positions[i], 2);
    }
  }
  return newInputs;
}

// Function to check if input is shortform word
export function isShortformWords(inputs: number[], sfwMap: Record<string, CharacterMap>): { temp: string; decidedFlag: boolean } {
  for (const [pattern, item] of Object.entries(sfwMap)) {
    if (inputs.toString() === item.ptn.toString()) {
      return { temp: item.wd, decidedFlag: true };
    }
  }
  return { temp: "", decidedFlag: false };
}

// Function to check initial letter contractions
export function isInitialLetterContractions(
  inputs: number[],
  ilcMap: Record<string, CharacterMap>
): {
  falFlag: boolean;
  temp: string;
  decidedFlag: boolean;
} {
  if ([0b000010, 0b000110, 0b000111].includes(inputs[0])) {
    const prepos = inputs[0];
    const les = searchInputWord(ilcMap, inputs[1], 1, prepos);
    return {
      falFlag: les === -1,
      temp: les === -1 ? "" : les,
      decidedFlag: les !== -1,
    };
  }
  return { falFlag: false, temp: "", decidedFlag: false };
}

// Function to handle when input length is one
export function whenInputLenIsOne(
  inputs: number[],
  awMap: Record<string, CharacterMap>,
  swMap: Record<string, CharacterMap>,
  scMap: Record<string, CharacterMap>,
  lwMap: Record<string, CharacterMap>
): {
  falFlag: boolean;
  temp: string;
  decidedFlag: boolean;
} {
  const candidate = { ...awMap, ...swMap, ...scMap, ...lwMap };
  const les = searchInputWord(candidate, inputs[0], 0);
  return {
    falFlag: les === -1,
    temp: les === -1 ? "" : les,
    decidedFlag: les !== -1,
  };
}

// Function to handle input enter
export function whenInputEnter(speak: string): void {
  console.log("speak : " + speak);
  // Note: The Python subprocess.call needs to be handled differently in browser environment
  // You might want to use Web Speech API or another text-to-speech solution
  const utterance = new SpeechSynthesisUtterance(speak);
  window.speechSynthesis.speak(utterance);
}

// Function to handle key events
export type KeyState = {
  pushed: number;
  pushing: number;
  inputs: number[];
};

export function handleKeyDown(keyCode: string, currentState: KeyState): KeyState {
  const newState = { ...currentState };

  switch (keyCode) {
    case "KEY_F":
      newState.pushed |= 0b100000;
      newState.pushing |= 0b100000;
      break;
    case "KEY_D":
      newState.pushed |= 0b010000;
      newState.pushing |= 0b010000;
      break;
    case "KEY_S":
      newState.pushed |= 0b001000;
      newState.pushing |= 0b001000;
      break;
    case "KEY_J":
      newState.pushed |= 0b000100;
      newState.pushing |= 0b000100;
      break;
    case "KEY_K":
      newState.pushed |= 0b000010;
      newState.pushing |= 0b000010;
      break;
    case "KEY_L":
      newState.pushed |= 0b000001;
      newState.pushing |= 0b000001;
      break;
  }

  return newState;
}

export function handleKeyUp(keyCode: string, currentState: KeyState): KeyState {
  const newState = { ...currentState };

  switch (keyCode) {
    case "KEY_F":
      newState.pushing &= 0b011111;
      break;
    case "KEY_D":
      newState.pushing &= 0b101111;
      break;
    case "KEY_S":
      newState.pushing &= 0b110111;
      break;
    case "KEY_J":
      newState.pushing &= 0b111011;
      break;
    case "KEY_K":
      newState.pushing &= 0b111101;
      break;
    case "KEY_L":
      newState.pushing &= 0b111110;
      break;
  }

  if (newState.pushing === 0b000000) {
    newState.inputs = [...newState.inputs, newState.pushed];
    newState.pushed = 0b000000;
  }

  return newState;
}

// Constants and mappings
export const KEY_TO_DOT_MAP = {
  f: 5,
  d: 4,
  s: 3,
  j: 2,
  k: 1,
  l: 0,
};

export const KEYS = ["KEY_F", "KEY_D", "KEY_S", "KEY_J", "KEY_K", "KEY_L"];

// Function to process input sequence
export function processInputSequence(
  inputs: number[],
  indicators: Record<string, CharacterMap[]>,
  maps: {
    awMap: Record<string, CharacterMap>;
    swMap: Record<string, CharacterMap>;
    scMap: Record<string, CharacterMap>;
    lwMap: Record<string, CharacterMap>;
    sfwMap: Record<string, CharacterMap>;
    ilcMap: Record<string, CharacterMap>;
  }
): {
  temp: string;
  falFlag: boolean;
  decidedFlag: boolean;
} {
  // Remove indicator patterns
  for (const key in indicators) {
    inputs = removePatterns(inputs, indicators[key]);
  }

  // Check input length cases
  if (inputs.length === 1) {
    return whenInputLenIsOne(inputs, maps.awMap, maps.swMap, maps.scMap, maps.lwMap);
  }

  if (inputs.length === 2) {
    return isInitialLetterContractions(inputs, maps.ilcMap);
  }

  if (inputs.length > 1) {
    const sfwResult = isShortformWords(inputs, maps.sfwMap);
    if (sfwResult.decidedFlag) {
      return { ...sfwResult, falFlag: false };
    }
  }

  return { temp: "", falFlag: false, decidedFlag: false };
}
