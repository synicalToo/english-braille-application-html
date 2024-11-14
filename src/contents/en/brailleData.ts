export type AllBrailleUnicodeType = { [key: string]: string };
export type BrailleEncodingType = {
  title: string;
  symbol?: string;
  keystroke: string[];
};

export type BrailleEncodingsType = {
  [category: string]: BrailleEncodingType[];
};

export const compatibility: { [key: string]: number } = {
  grade_1: 1,
  grade_2: 2,
  both: 3,
};

export const uebEncoding: {
  [category: string]: {
    compatibility: number;
    content: {
      [key: string]: { title: string; symbol?: string; keystroke: string[] };
    };
  };
} = {
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
    compatibility: 3,
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
      dash: { title: "Dash", symbol: "–", keystroke: ["000001", "001001"] },
      long_dash: { title: "Long dash", symbol: "——", keystroke: ["000010", "000001", "001001"] },
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

export const BrailleEncodings: BrailleEncodingsType = {
  // top of the dictionary to make sure indicators are checked first
  // prevent unnecessary looping of other data
  Indicators: [
    { title: "Numeric", keystroke: ["001111"] },
    { title: "Capital letter", keystroke: ["000001"] },
    { title: "Capital Word", keystroke: ["000001", "000001"] },
    { title: "Capital Passage", keystroke: ["000001", "000001", "000001"] },
    { title: "Capital terminator", keystroke: ["000001", "001000"] },
  ],

  Alphabets: [
    { title: "a", keystroke: ["100000"] },
    { title: "b", keystroke: ["110000"] },
    { title: "c", keystroke: ["100100"] },
    { title: "d", keystroke: ["100110"] },
    { title: "e", keystroke: ["100010"] },
    { title: "f", keystroke: ["110100"] },
    { title: "g", keystroke: ["110110"] },
    { title: "h", keystroke: ["110010"] },
    { title: "i", keystroke: ["010100"] },
    { title: "j", keystroke: ["010110"] },

    { title: "k", keystroke: ["101000"] },
    { title: "l", keystroke: ["111000"] },
    { title: "m", keystroke: ["101100"] },
    { title: "n", keystroke: ["101110"] },
    { title: "o", keystroke: ["101010"] },
    { title: "p", keystroke: ["111100"] },
    { title: "q", keystroke: ["111110"] },
    { title: "r", keystroke: ["111010"] },
    { title: "s", keystroke: ["011100"] },
    { title: "t", keystroke: ["011110"] },

    { title: "u", keystroke: ["101001"] },
    { title: "v", keystroke: ["111001"] },
    { title: "w", keystroke: ["010111"] },
    { title: "x", keystroke: ["101101"] },
    { title: "y", keystroke: ["101111"] },
    { title: "z", keystroke: ["101011"] },
  ],

  Numbers: [
    { title: "1", keystroke: ["100000"] },
    { title: "2", keystroke: ["110000"] },
    { title: "3", keystroke: ["100100"] },
    { title: "4", keystroke: ["100110"] },
    { title: "5", keystroke: ["100010"] },
    { title: "6", keystroke: ["110100"] },
    { title: "7", keystroke: ["110110"] },
    { title: "8", keystroke: ["110010"] },
    { title: "9", keystroke: ["010100"] },
    { title: "0", keystroke: ["010110"] },
  ],

  Punctuation: [
    { title: "Comma", symbol: ",", keystroke: ["010000"] },
    { title: "Period", symbol: ".", keystroke: ["010011"] },
    { title: "Apostrophe", symbol: "'", keystroke: ["001000"] },
    { title: "Colon", symbol: ":", keystroke: ["010010"] },
    { title: "Dash", symbol: "–", keystroke: ["000001", "001001"] },
    { title: "Long dash", symbol: "——", keystroke: ["000010", "000001", "001001"] },
    { title: "Exclamation mark", symbol: "!", keystroke: ["011010"] },
    { title: "Hyphen", symbol: "-", keystroke: ["001001"] },
    { title: "Question mark", symbol: "?", keystroke: ["011001"] },
    { title: "Semicolon", symbol: ";", keystroke: ["011000"] },
    { title: "Ellipsis", symbol: "…", keystroke: ["010011", "010011", "010011"] },
    { title: "Asterisk", symbol: "*", keystroke: ["000010", "001010"] },
    { title: "Forward slash", symbol: "/", keystroke: ["000111", "001100"] },
    { title: "Backward slash", symbol: "\\", keystroke: ["000111", "100001"] },
    { title: "Opening outer quotation mark", symbol: "“", keystroke: ["000110", "011001"] },
    { title: "Closing outer quatation mark", symbol: "”", keystroke: ["000110", "001011"] },
    { title: "Opening inner quotation mark", symbol: "‘", keystroke: ["000001", "011001"] },
    { title: "Closing inner quotation mark", symbol: "’", keystroke: ["000001", "001011"] },
  ],

  "Grouping Punctuation": [
    { title: "Opening round parentheses", symbol: "(", keystroke: ["000010", "110001"] },
    { title: "Closing round parentheses", symbol: ")", keystroke: ["000010", "001110"] },
    { title: "Opening square bracket", symbol: "[", keystroke: ["000101", "110001"] },
    { title: "Closing square bracket", symbol: "]", keystroke: ["000101", "001110"] },
    { title: "Opening curly bracket", symbol: "{", keystroke: ["000111", "110001"] },
    { title: "Closing curly bracket", symbol: "}", keystroke: ["000111", "001110"] },
    { title: "Opening angle bracket", symbol: "<", keystroke: ["000100", "110001"] },
    { title: "Closing angle bracket", symbol: ">", keystroke: ["000100", "001110"] },
  ],

  "Signs of Operation and Comparison": [
    { title: "Plus", symbol: "+", keystroke: ["000010", "011010"] },
    { title: "Minus", symbol: "-", keystroke: ["000010", "001001"] },
    { title: "Multiplication", symbol: "×", keystroke: ["000010", "011001"] },
    { title: "Multiplication dot", symbol: "·", keystroke: ["000010", "010011"] },
    { title: "Division", symbol: "÷", keystroke: ["000010", "001100"] },
    { title: "Greater than", symbol: ">", keystroke: ["000100", "001110"] },
    { title: "Less than", symbol: "<", keystroke: ["000100", "110001"] },
    { title: "Equals", symbol: "=", keystroke: ["000010", "011011"] },
  ],

  "Currency and Measurement": [
    { title: "Cent", symbol: "¢", keystroke: ["000100", "100100"] },
    { title: "Dollar", symbol: "$", keystroke: ["000100", "011100"] },
    { title: "Euro", symbol: "€", keystroke: ["000100", "100010"] },
    { title: "British pound", symbol: "£", keystroke: ["000100", "111000"] },
    { title: "Feet", symbol: "′", keystroke: ["011011"] },
    { title: "Inches", symbol: "″", keystroke: ["011011", "011011"] },
  ],

  "Special Symbols": [
    { title: "Percentage", symbol: "%", keystroke: ["000101", "001011"] },
    { title: "Degree", symbol: "°", keystroke: ["000110", "010110"] },
    { title: "Angle", symbol: "∠", keystroke: ["000101", "111111"] },
    { title: "Hashtag", symbol: "#", keystroke: ["000111", "100111"] },
    { title: "Ampersand", symbol: "&", keystroke: ["000100", "111101"] },
    { title: "Copyright", symbol: "©", keystroke: ["000110", "100100"] },
    { title: "Trademark", symbol: "™", keystroke: ["000110", "011110"] },
    { title: "Superscript indicator", keystroke: ["001010"] },
    { title: "Subscript indicator", keystroke: ["010001"] },
    { title: "Bullet", symbol: "•", keystroke: ["000111", "010011"] },
    { title: "@ sign", symbol: "@", keystroke: ["000100", "100000"] },
  ],

  //GRADE 2
  "Alphabet Wordsigns": [
    { title: "a", keystroke: ["100000"] },
    { title: "but", keystroke: ["110000"] },
    { title: "can", keystroke: ["100100"] },
    { title: "do", keystroke: ["100110"] },
    { title: "every", keystroke: ["100010"] },
    { title: "from", keystroke: ["110100"] },
    { title: "go", keystroke: ["110110"] },
    { title: "have", keystroke: ["110010"] },
    { title: "just", keystroke: ["010110"] },

    { title: "knowledge", keystroke: ["101000"] },
    { title: "like", keystroke: ["111000"] },
    { title: "more", keystroke: ["101100"] },
    { title: "not", keystroke: ["101110"] },
    { title: "o", keystroke: ["101010"] },
    { title: "people", keystroke: ["111100"] },
    { title: "quite", keystroke: ["111110"] },
    { title: "rather", keystroke: ["111010"] },
    { title: "so", keystroke: ["011100"] },
    { title: "that", keystroke: ["011110"] },

    { title: "us", keystroke: ["101001"] },
    { title: "very", keystroke: ["111001"] },
    { title: "will", keystroke: ["010111"] },
    { title: "it", keystroke: ["101101"] },
    { title: "you", keystroke: ["101111"] },
    { title: "as", keystroke: ["101011"] },
  ],

  "Strong Contractions": [
    { title: "and", keystroke: ["111101"] },
    { title: "for", keystroke: ["111111"] },
    { title: "of", keystroke: ["111011"] },
    { title: "the", keystroke: ["011101"] },
    { title: "with", keystroke: ["011111"] },
  ],

  "Strong Wordsigns": [
    { title: "child", keystroke: ["100001"] },
    { title: "shall", keystroke: ["100101"] },
    { title: "this", keystroke: ["100111"] },
    { title: "which", keystroke: ["100011"] },
    { title: "out", keystroke: ["110011"] },
    { title: "still", keystroke: ["001100"] },
  ],

  "Strong Groupsigns": [
    { title: "ch", keystroke: ["100001"] },
    { title: "sh", keystroke: ["100101"] },
    { title: "th", keystroke: ["100111"] },
    { title: "wh", keystroke: ["100011"] },
    { title: "ou", keystroke: ["110011"] },
    { title: "st", keystroke: ["001100"] },
    { title: "gh", keystroke: ["110001"] },
    { title: "ed", keystroke: ["110101"] },
    { title: "er", keystroke: ["110111"] },
    { title: "ow", keystroke: ["010101"] },
    { title: "ar", keystroke: ["001110"] },
    { title: "ing", keystroke: ["001101"] },
  ],

  "Lower Groupsigns": [
    { title: "ea", keystroke: ["010000"] },
    { title: "bb", keystroke: ["011000"] },
    { title: "cc", keystroke: ["010010"] },
    { title: "ff", keystroke: ["011010"] },
    { title: "gg", keystroke: ["011011"] },

    { title: "be", keystroke: ["011000"] },
    { title: "con", keystroke: ["010010"] },
    { title: "dis", keystroke: ["010011"] },
    { title: "en", keystroke: ["010001"] },
    { title: "in", keystroke: ["001010"] },
  ],

  "Lower Wordsigns": [
    { title: "be", keystroke: ["011000"] },
    { title: "enough", keystroke: ["010001"] },
    { title: "were", keystroke: ["011011"] },
    { title: "his", keystroke: ["011001"] },
    { title: "in", keystroke: ["001010"] },
    { title: "was", keystroke: ["001011"] },
  ],

  "Initial Letter Contractions": [
    { title: "day", keystroke: ["000010", "100110"] },
    { title: "ever", keystroke: ["000010", "100010"] },
    { title: "father", keystroke: ["000010", "110100"] },
    { title: "here", keystroke: ["000010", "110010"] },
    { title: "know", keystroke: ["000010", "101000"] },
    { title: "lord", keystroke: ["000010", "111000"] },
    { title: "mother", keystroke: ["000010", "101100"] },
    { title: "name", keystroke: ["000010", "101110"] },
    { title: "one", keystroke: ["000010", "101010"] },
    { title: "part", keystroke: ["000010", "100111"] },
    { title: "question", keystroke: ["000010", "111110"] },
    { title: "right", keystroke: ["000010", "111010"] },
    { title: "some", keystroke: ["000010", "011100"] },
    { title: "time", keystroke: ["000010", "011110"] },
    { title: "under", keystroke: ["000010", "101001"] },
    { title: "work", keystroke: ["000010", "010111"] },
    { title: "young", keystroke: ["000010", "101111"] },

    { title: "there", keystroke: ["000010", "011100"] },
    { title: "character", keystroke: ["000010", "100001"] },
    { title: "through", keystroke: ["000010", "100111"] },
    { title: "where", keystroke: ["000010", "100011"] },
    { title: "ought", keystroke: ["000010", "110011"] },
    { title: "upon", keystroke: ["000110", "101001"] },
    { title: "word", keystroke: ["000110", "010111"] },
    { title: "these", keystroke: ["000110", "011101"] },
    { title: "those", keystroke: ["000110", "100111"] },
    { title: "whose", keystroke: ["000110", "100011"] },

    { title: "cannot", keystroke: ["000111", "100100"] },
    { title: "had", keystroke: ["000111", "110010"] },
    { title: "many", keystroke: ["000111", "101100"] },
    { title: "spirit", keystroke: ["000111", "011100"] },
    { title: "world", keystroke: ["000111", "010111"] },
    { title: "their", keystroke: ["000111", "011101"] },
  ],

  "Final-letter Groupsigns": [
    { title: "ound", keystroke: ["000101", "100110"] },
    { title: "ance", keystroke: ["000101", "100010"] },
    { title: "sion", keystroke: ["000101", "101110"] },
    { title: "less", keystroke: ["000101", "011100"] },
    { title: "ount", keystroke: ["000101", "011110"] },

    { title: "ence", keystroke: ["000011", "100010"] },
    { title: "ong", keystroke: ["000011", "110110"] },
    { title: "ful", keystroke: ["000011", "111000"] },
    { title: "tion", keystroke: ["000011", "101110"] },
    { title: "ness", keystroke: ["000011", "011100"] },
    { title: "ment", keystroke: ["000011", "011110"] },
    { title: "ity", keystroke: ["000011", "101111"] },
  ],

  //Shortform words
};

export const AllBrailleUnicode: AllBrailleUnicodeType = {
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
