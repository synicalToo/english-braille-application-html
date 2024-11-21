export type brailleMappingsType = {
  [key: string]: {
    compatibility: number;
    content: {
      [key: string]: {
        title: string;
        symbol?: string;
        keystroke: string[];
        terminator?: string[];
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
      number: { title: "Numeric", keystroke: ["3456"], terminator: ["0", "36", "636"] },
      capital_letter: { title: "Capital letter", keystroke: ["6"] },
      capital_word: { title: "Capital Word", keystroke: ["6", "6"] },
      capital_passage: { title: "Capital Passage", keystroke: ["6", "6", "6"] },
      capital_terminator: { title: "Capital terminator", keystroke: ["6", "3"] },
    },
  },

  Alphabet: {
    compatibility: compatibility.grade_1,
    content: {
      a: { title: "a", keystroke: ["1"] },
      b: { title: "b", keystroke: ["12"] },
      c: { title: "c", keystroke: ["14"] },
      d: { title: "d", keystroke: ["145"] },
      e: { title: "e", keystroke: ["15"] },
      f: { title: "f", keystroke: ["124"] },
      g: { title: "g", keystroke: ["1245"] },
      h: { title: "h", keystroke: ["125"] },
      i: { title: "i", keystroke: ["24"] },
      j: { title: "j", keystroke: ["245"] },

      k: { title: "k", keystroke: ["13"] },
      l: { title: "l", keystroke: ["123"] },
      m: { title: "m", keystroke: ["134"] },
      n: { title: "n", keystroke: ["1345"] },
      o: { title: "o", keystroke: ["135"] },
      p: { title: "p", keystroke: ["1234"] },
      q: { title: "q", keystroke: ["12345"] },
      r: { title: "r", keystroke: ["1235"] },
      s: { title: "s", keystroke: ["234"] },
      t: { title: "t", keystroke: ["2345"] },

      u: { title: "u", keystroke: ["136"] },
      v: { title: "v", keystroke: ["1236"] },
      w: { title: "w", keystroke: ["2456"] },
      x: { title: "x", keystroke: ["1346"] },
      y: { title: "y", keystroke: ["13456"] },
      z: { title: "z", keystroke: ["1356"] },
    },
  },

  Numbers: {
    compatibility: compatibility.both,
    content: {
      1: { title: "1", keystroke: ["1"] },
      2: { title: "2", keystroke: ["12"] },
      3: { title: "3", keystroke: ["14"] },
      4: { title: "4", keystroke: ["145"] },
      5: { title: "5", keystroke: ["15"] },
      6: { title: "6", keystroke: ["124"] },
      7: { title: "7", keystroke: ["1245"] },
      8: { title: "8", keystroke: ["125"] },
      9: { title: "9", keystroke: ["24"] },
      0: { title: "0", keystroke: ["245"] },
    },
  },

  Punctuation: {
    compatibility: compatibility.both,
    content: {
      comma: { title: "Comma", symbol: ",", keystroke: ["2"] },
      period: { title: "Period", symbol: ".", keystroke: ["256"] },
      apostrophe: { title: "Apostrophe", symbol: "'", keystroke: ["3"] },
      colon: { title: "Colon", symbol: ":", keystroke: ["25"] },
      dash: { title: "Dash", symbol: "–", keystroke: ["6", "36"] },

      long_dash: { title: "Long dash", symbol: "——", keystroke: ["5", "6", "36"] },
      exclamation_mark: { title: "Exclamation mark", symbol: "!", keystroke: ["235"] },
      hyphen: { title: "Hyphen", symbol: "-", keystroke: ["36"] },
      question_mark: { title: "Question mark", symbol: "?", keystroke: ["236"] },
      semicolon: { title: "Semicolon", symbol: ";", keystroke: ["23"] },

      ellipsis: { title: "Ellipsis", symbol: "…", keystroke: ["256", "256", "256"] },
      asterisk: { title: "Asterisk", symbol: "*", keystroke: ["5", "35"] },
      forward_slash: { title: "Forward slash", symbol: "/", keystroke: ["456", "34"] },
      backward_slash: { title: "Backward slash", symbol: "\\", keystroke: ["456", "16"] },

      opening_outer_quotation_mark: { title: "Opening outer quotation mark", symbol: "“", keystroke: ["45", "236"] },
      closing_outer_quatation_mark: { title: "Closing outer quatation mark", symbol: "”", keystroke: ["45", "356"] },
      opening_inner_quotation_mark: { title: "Opening inner quotation mark", symbol: "‘", keystroke: ["6", "236"] },
      closing_inner_quotation_mark: { title: "Closing inner quotation mark", symbol: "’", keystroke: ["6", "356"] },
    },
  },

  "Grouping Punctuation": {
    compatibility: compatibility.both,
    content: {
      opening_round_parentheses: { title: "Opening round parentheses", symbol: "(", keystroke: ["5", "126"] },
      closing_round_parentheses: { title: "Closing round parentheses", symbol: ")", keystroke: ["5", "345"] },
      opening_square_bracket: { title: "Opening square bracket", symbol: "[", keystroke: ["46", "126"] },
      closing_square_bracket: { title: "Closing square bracket", symbol: "]", keystroke: ["46", "345"] },
      opening_curly_bracket: { title: "Opening curly bracket", symbol: "{", keystroke: ["456", "126"] },
      closing_curly_bracket: { title: "Closing curly bracket", symbol: "}", keystroke: ["456", "345"] },
      opening_angle_bracket: { title: "Opening angle bracket", symbol: "<", keystroke: ["4", "126"] },
      closing_angle_bracket: { title: "Closing angle bracket", symbol: ">", keystroke: ["4", "345"] },
    },
  },

  "Signs of Operation and Comparison": {
    compatibility: compatibility.both,
    content: {
      plus: { title: "Plus", symbol: "+", keystroke: ["5", "235"] },
      minus: { title: "Minus", symbol: "-", keystroke: ["5", "36"] },
      multiplication: { title: "Multiplication", symbol: "×", keystroke: ["5", "236"] },
      multiplication_dot: { title: "Multiplication dot", symbol: "·", keystroke: ["5", "256"] },
      division: { title: "Division", symbol: "÷", keystroke: ["5", "34"] },
      greater_than: { title: "Greater than", symbol: ">", keystroke: ["5", "345"] },
      less_than: { title: "Less than", symbol: "<", keystroke: ["5", "126"] },
      equals: { title: "Equals", symbol: "=", keystroke: ["5", "2356"] },
    },
  },

  "Currency and Measurement": {
    compatibility: compatibility.both,
    content: {
      cent: { title: "Cent", symbol: "¢", keystroke: ["4", "14"] },
      dollar: { title: "Dollar", symbol: "$", keystroke: ["4", "234"] },
      euro: { title: "Euro", symbol: "€", keystroke: ["4", "15"] },
      british_pound: { title: "British pound", symbol: "£", keystroke: ["4", "123"] },
      feet: { title: "Feet", symbol: "′", keystroke: ["2356"] },
      inches: { title: "Inches", symbol: "″", keystroke: ["2356", "2356"] },
    },
  },

  "Special Symbols": {
    compatibility: compatibility.both,
    content: {
      percentage: { title: "Percentage", symbol: "%", keystroke: ["46", "356"] },
      degree: { title: "Degree", symbol: "°", keystroke: ["45", "245"] },
      angle: { title: "Angle", symbol: "∠", keystroke: ["46", "123456"] },
      hashtag: { title: "Hashtag", symbol: "#", keystroke: ["456", "1456"] },
      ampersand: { title: "Ampersand", symbol: "&", keystroke: ["4", "12346"] },
      copyright: { title: "Copyright", symbol: "©", keystroke: ["45", "14"] },
      trademark: { title: "Trademark", symbol: "™", keystroke: ["45", "2345"] },
      superscript_indicator: { title: "Superscript indicator", keystroke: ["35"] },
      subscript_indicator: { title: "Subscript indicator", keystroke: ["26"] },
      bullet: { title: "Bullet", symbol: "•", keystroke: ["456", "256"] },
      at_sign: { title: "@ sign", symbol: "@", keystroke: ["4", "1"] },
    },
  },
};

export const brailleUnicode: { [key: string]: string } = {
  "0": "⠀",
  "1": "⠁",
  "2": "⠂",
  "12": "⠃",
  "3": "⠄",
  "13": "⠅",
  "23": "⠆",
  "123": "⠇",
  "4": "⠈",
  "14": "⠉",
  "24": "⠊",
  "124": "⠋",
  "34": "⠌",
  "134": "⠍",
  "234": "⠎",
  "1234": "⠏",
  "5": "⠐",
  "15": "⠑",
  "25": "⠒",
  "125": "⠓",
  "35": "⠔",
  "135": "⠕",
  "235": "⠖",
  "1235": "⠗",
  "45": "⠘",
  "145": "⠙",
  "245": "⠚",
  "1245": "⠛",
  "345": "⠜",
  "1345": "⠝",
  "2345": "⠞",
  "12345": "⠟",
  "6": "⠠",
  "16": "⠡",
  "26": "⠢",
  "126": "⠣",
  "36": "⠤",
  "136": "⠥",
  "236": "⠦",
  "1236": "⠧",
  "46": "⠨",
  "146": "⠩",
  "246": "⠪",
  "1246": "⠫",
  "346": "⠬",
  "1346": "⠭",
  "2346": "⠮",
  "12346": "⠯",
  "56": "⠰",
  "156": "⠱",
  "256": "⠲",
  "1256": "⠳",
  "356": "⠴",
  "1356": "⠵",
  "2356": "⠶",
  "12356": "⠷",
  "456": "⠸",
  "1456": "⠹",
  "2456": "⠺",
  "12456": "⠻",
  "3456": "⠼",
  "13456": "⠽",
  "23456": "⠾",
  "123456": "⠿",
};
