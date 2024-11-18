export type brailleMappingsType = {
  [key: string]: {
    compatibility: number;
    content: {
      [key: string]: {
        title: string;
        keystroke: string[];
        symbol?: string;
      };
    };
  };
};

export const compatibility: { [key: string]: number } = {
  grade_1: 1,
  grade_2: 2,
  both: 3,
};

export const brailleMappings: brailleMappingsType = {
  Indicators: {
    compatibility: compatibility.both,
    content: {
      number: { title: "Numeric", keystroke: ["001111"] },
      capital_letter: { title: "Capital letter", keystroke: ["000001"] },
      capital_word: { title: "Capital Word", keystroke: ["000001", "000001"] },
      capital_passage: { title: "Capital Passage", keystroke: ["000001", "000001", "000001"] },
      capital_terminator: { title: "Capital terminator", keystroke: ["000001", "001000"] },
    },
  },

  Alphabet: {
    compatibility: compatibility.grade_1,
    content: {
      a: { title: "a", keystroke: ["100000"] },
      b: { title: "b", keystroke: ["110000"] },
      c: { title: "c", keystroke: ["100100"] },
      d: { title: "d", keystroke: ["100110"] },
      e: { title: "e", keystroke: ["100010"] },
      f: { title: "f", keystroke: ["110100"] },
      g: { title: "g", keystroke: ["110110"] },
      h: { title: "h", keystroke: ["110010"] },
      i: { title: "i", keystroke: ["010100"] },
      j: { title: "j", keystroke: ["010110"] },

      k: { title: "k", keystroke: ["101000"] },
      l: { title: "l", keystroke: ["111000"] },
      m: { title: "m", keystroke: ["101100"] },
      n: { title: "n", keystroke: ["101110"] },
      o: { title: "o", keystroke: ["101010"] },
      p: { title: "p", keystroke: ["111100"] },
      q: { title: "q", keystroke: ["111110"] },
      r: { title: "r", keystroke: ["111010"] },
      s: { title: "s", keystroke: ["011100"] },
      t: { title: "t", keystroke: ["011110"] },

      u: { title: "u", keystroke: ["101001"] },
      v: { title: "v", keystroke: ["111001"] },
      w: { title: "w", keystroke: ["010111"] },
      x: { title: "x", keystroke: ["101101"] },
      y: { title: "y", keystroke: ["101111"] },
      z: { title: "z", keystroke: ["101011"] },
    },
  },

  Numbers: {
    compatibility: compatibility.both,
    content: {
      1: { title: "1", keystroke: ["100000"] },
      2: { title: "2", keystroke: ["110000"] },
      3: { title: "3", keystroke: ["100100"] },
      4: { title: "4", keystroke: ["100110"] },
      5: { title: "5", keystroke: ["100010"] },
      6: { title: "6", keystroke: ["110100"] },
      7: { title: "7", keystroke: ["110110"] },
      8: { title: "8", keystroke: ["110010"] },
      9: { title: "9", keystroke: ["010100"] },
      0: { title: "0", keystroke: ["010110"] },
    },
  },

  Punctuation: {
    compatibility: compatibility.both,
    content: {
      comma: { title: "Comma", symbol: ",", keystroke: ["010000"] },
      period: { title: "Period", symbol: ".", keystroke: ["010011"] },
      apostrophe: { title: "Apostrophe", symbol: "'", keystroke: ["001000"] },
      colon: { title: "Colon", symbol: ":", keystroke: ["010010"] },
      long_dash: { title: "Long dash", symbol: "——", keystroke: ["000010", "000001", "001001"] },
      dash: { title: "Dash", symbol: "–", keystroke: ["000001", "001001"] },
      exclamation_mark: { title: "Exclamation mark", symbol: "!", keystroke: ["011010"] },
      hyphen: { title: "Hyphen", symbol: "-", keystroke: ["001001"] },
      question_mark: { title: "Question mark", symbol: "?", keystroke: ["011001"] },
      semicolon: { title: "Semicolon", symbol: ";", keystroke: ["011000"] },
      ellipsis: { title: "Ellipsis", symbol: "…", keystroke: ["010011", "010011", "010011"] },
      asterisk: { title: "Asterisk", symbol: "*", keystroke: ["000010", "001010"] },
      forward_slash: { title: "Forward slash", symbol: "/", keystroke: ["000111", "001100"] },
      backward_slash: { title: "Backward slash", symbol: "\\", keystroke: ["000111", "100001"] },
      opening_outer_quotation_mark: { title: "Opening outer quotation mark", symbol: "“", keystroke: ["000110", "011001"] },
      closing_outer_quatation_mark: { title: "Closing outer quatation mark", symbol: "”", keystroke: ["000110", "001011"] },
      opening_inner_quotation_mark: { title: "Opening inner quotation mark", symbol: "‘", keystroke: ["000001", "011001"] },
      closing_inner_quotation_mark: { title: "Closing inner quotation mark", symbol: "’", keystroke: ["000001", "001011"] },
    },
  },
};

export const brailleUnicode: { [key: string]: string } = {
  "000000": "⠀",
  "100000": "⠁",
  "010000": "⠂",
  "110000": "⠃",
  "001000": "⠄",
  "101000": "⠅",
  "011000": "⠆",
  "111000": "⠇",
  "000100": "⠈",
  "100100": "⠉",
  "010100": "⠊",
  "110100": "⠋",
  "001100": "⠌",
  "101100": "⠍",
  "011100": "⠎",
  "111100": "⠏",

  "000010": "⠐",
  "100010": "⠑",
  "010010": "⠒",
  "110010": "⠓",
  "001010": "⠔",
  "101010": "⠕",
  "011010": "⠖",
  "111010": "⠗",
  "000110": "⠘",
  "100110": "⠙",
  "010110": "⠚",
  "110110": "⠛",
  "001110": "⠜",
  "101110": "⠝",
  "011110": "⠞",
  "111110": "⠟",

  "000001": "⠠",
  "100001": "⠡",
  "010001": "⠢",
  "110001": "⠣",
  "001001": "⠤",
  "101001": "⠥",
  "011001": "⠦",
  "111001": "⠧",
  "000101": "⠨",
  "100101": "⠩",
  "010101": "⠪",
  "110101": "⠫",
  "001101": "⠬",
  "101101": "⠭",
  "011101": "⠮",
  "111101": "⠯",

  "000011": "⠰",
  "100011": "⠱",
  "010011": "⠲",
  "110011": "⠳",
  "001011": "⠴",
  "101011": "⠵",
  "011011": "⠶",
  "111011": "⠷",
  "000111": "⠸",
  "100111": "⠹",
  "010111": "⠺",
  "110111": "⠻",
  "001111": "⠼",
  "101111": "⠽",
  "011111": "⠾",
  "111111": "⠿",
};
