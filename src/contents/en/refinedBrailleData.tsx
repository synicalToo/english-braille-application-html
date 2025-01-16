export interface BrailleItem {
  title: string;
  symbol?: string;
  keystroke: string[];
  terminator?: string[];
  type?: "alone" | "first" | "middle" | "last" | "every" | "not-first";
}

export interface BrailleCategory {
  title: string;
  content: {
    [key: string]: BrailleItem;
  };
}

export type BrailleData = {
  [key: string]: BrailleCategory;
};

export const BrailleData: BrailleData = {
  indicators: {
    title: "Indicators",
    content: {
      number: { title: "Numeric", keystroke: ["3456"] },
      capital_letter: { title: "Capital letter", keystroke: ["6"] },
      capital_word: { title: "Capital word", keystroke: ["6", "6"] },
      capital_passage: { title: "Capital passage", keystroke: ["6", "6", "6"] },
      capital_terminator: { title: "Capital terminator", keystroke: ["6", "3"] },

      grade1_symbol: { title: "Grade 1", keystroke: ["56"] },
      grade1_word: { title: "Grade 1 word", keystroke: ["56", "56"] },
      grade1_passage: { title: "Grade 1 passage", keystroke: ["56", "56", "56"] },
      grade1_terminator: { title: "Grade 1 terminator", keystroke: ["56", "3"] },

      italic_symbol: { title: "Italic", keystroke: ["46", "23"] },
      italic_word: { title: "Italic word", keystroke: ["46", "2"] },
      italic_passage: { title: "Italic passage", keystroke: ["46", "2356"] },
      italic_terminator: { title: "Italic terminator", keystroke: ["46", "3"] },

      bold_symbol: { title: "Bold", keystroke: ["45", "23"] },
      bold_word: { title: "Bold word", keystroke: ["45", "2"] },
      bold_passage: { title: "Bold passage", keystroke: ["45", "2356"] },
      bold_terminator: { title: "Bold terminator", keystroke: ["45", "3"] },

      underline_symbol: { title: "Underline", keystroke: ["456", "23"] },
      underline_word: { title: "Underline word", keystroke: ["456", "2"] },
      underline_passage: { title: "Underline passage", keystroke: ["456", "2356"] },
      underline_terminator: { title: "Underline terminator", keystroke: ["456", "3"] },
    },
  },

  alphabet: {
    title: "Alphabet",
    content: {
      a: { title: "a", keystroke: ["1"], type: "every" },
      b: { title: "b", keystroke: ["12"], type: "every" },
      c: { title: "c", keystroke: ["14"], type: "every" },
      d: { title: "d", keystroke: ["145"], type: "every" },
      e: { title: "e", keystroke: ["15"], type: "every" },
      f: { title: "f", keystroke: ["124"], type: "every" },
      g: { title: "g", keystroke: ["1245"], type: "every" },
      h: { title: "h", keystroke: ["125"], type: "every" },
      i: { title: "i", keystroke: ["24"], type: "every" },
      j: { title: "j", keystroke: ["245"], type: "every" },

      k: { title: "k", keystroke: ["13"], type: "every" },
      l: { title: "l", keystroke: ["123"], type: "every" },
      m: { title: "m", keystroke: ["134"], type: "every" },
      n: { title: "n", keystroke: ["1345"], type: "every" },
      o: { title: "o", keystroke: ["135"], type: "every" },
      p: { title: "p", keystroke: ["1234"], type: "every" },
      q: { title: "q", keystroke: ["12345"], type: "every" },
      r: { title: "r", keystroke: ["1235"], type: "every" },
      s: { title: "s", keystroke: ["234"], type: "every" },
      t: { title: "t", keystroke: ["2345"], type: "every" },

      u: { title: "u", keystroke: ["136"], type: "every" },
      v: { title: "v", keystroke: ["1236"], type: "every" },
      w: { title: "w", keystroke: ["2456"], type: "every" },
      x: { title: "x", keystroke: ["1346"], type: "every" },
      y: { title: "y", keystroke: ["13456"], type: "every" },
      z: { title: "z", keystroke: ["1356"], type: "every" },
    },
  },

  numbers: {
    title: "Numbers",
    content: {
      1: { title: "1", keystroke: ["1"], type: "every" },
      2: { title: "2", keystroke: ["12"], type: "every" },
      3: { title: "3", keystroke: ["14"], type: "every" },
      4: { title: "4", keystroke: ["145"], type: "every" },
      5: { title: "5", keystroke: ["15"], type: "every" },
      6: { title: "6", keystroke: ["124"], type: "every" },
      7: { title: "7", keystroke: ["1245"], type: "every" },
      8: { title: "8", keystroke: ["125"], type: "every" },
      9: { title: "9", keystroke: ["24"], type: "every" },
      0: { title: "0", keystroke: ["245"], type: "every" },
    },
  },

  punctuation: {
    title: "Punctuation",
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
      forward_slash: { title: "Forward slash", symbol: "/", keystroke: ["456", "34"] },
      backward_slash: { title: "Backward slash", symbol: "\\", keystroke: ["456", "16"] },

      opening_outer_quotation_mark: { title: "Opening outer quotation mark", symbol: "“", keystroke: ["236"] },
      closing_outer_quatation_mark: { title: "Closing outer quatation mark", symbol: "”", keystroke: ["356"] },
      opening_inner_quotation_mark: { title: "Opening inner quotation mark", symbol: "‘", keystroke: ["6", "236"] },
      closing_inner_quotation_mark: { title: "Closing inner quotation mark", symbol: "’", keystroke: ["6", "356"] },
    },
  },

  grouping_punctuation: {
    title: "Grouping Punctuation",
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

  signs_of_operation_and_comparison: {
    title: "Signs of Operation and Comparison",
    content: {
      plus: { title: "Plus", symbol: "+", keystroke: ["5", "235"] },
      minus: { title: "Minus", symbol: "-", keystroke: ["5", "36"] },
      multiplication: { title: "Multiplication", symbol: "×", keystroke: ["5", "236"] },
      multiplication_dot: { title: "Multiplication dot", symbol: "·", keystroke: ["5", "256"] },
      division: { title: "Division", symbol: "÷", keystroke: ["5", "34"] },
      greater_than: { title: "Greater than", symbol: ">", keystroke: ["4", "345"] },
      less_than: { title: "Less than", symbol: "<", keystroke: ["4", "126"] },
      equals: { title: "Equals", symbol: "=", keystroke: ["5", "2356"] },
    },
  },

  currency_and_measurement: {
    title: "Currency and Measurement",
    content: {
      cent: { title: "Cent", symbol: "¢", keystroke: ["4", "14"] },
      dollar: { title: "Dollar", symbol: "$", keystroke: ["4", "234"] },
      euro: { title: "Euro", symbol: "€", keystroke: ["4", "15"] },
      british_pound: { title: "British pound", symbol: "£", keystroke: ["4", "123"] },
      feet: { title: "Feet", symbol: "′", keystroke: ["2356"] },
      inches: { title: "Inches", symbol: "″", keystroke: ["2356", "2356"] },
    },
  },

  special_symbols: {
    title: "Special Symbols",
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
      asterisk: { title: "Asterisk", symbol: "*", keystroke: ["5", "35"] },
    },
  },

  alphabetic_wordsigns: {
    title: "Alphabetic Wordsigns",
    content: {
      a: { title: "a", keystroke: ["1"], type: "alone" },
      but: { title: "but", keystroke: ["12"], type: "alone" },
      can: { title: "can", keystroke: ["14"], type: "alone" },
      do: { title: "do", keystroke: ["145"], type: "alone" },
      every: { title: "every", keystroke: ["15"], type: "alone" },
      from: { title: "from", keystroke: ["124"], type: "alone" },
      go: { title: "go", keystroke: ["1245"], type: "alone" },
      have: { title: "have", keystroke: ["125"], type: "alone" },
      i: { title: "i", keystroke: ["24"], type: "alone" },
      just: { title: "just", keystroke: ["245"], type: "alone" },

      knowledge: { title: "knowledge", keystroke: ["13"], type: "alone" },
      like: { title: "like", keystroke: ["123"], type: "alone" },
      more: { title: "more", keystroke: ["134"], type: "alone" },
      not: { title: "not", keystroke: ["1345"], type: "alone" },
      o: { title: "o", keystroke: ["135"], type: "alone" },
      people: { title: "people", keystroke: ["1234"], type: "alone" },
      quite: { title: "quite", keystroke: ["12345"], type: "alone" },
      rather: { title: "rather", keystroke: ["1235"], type: "alone" },
      so: { title: "so", keystroke: ["234"], type: "alone" },
      that: { title: "that", keystroke: ["2345"], type: "alone" },

      us: { title: "us", keystroke: ["136"], type: "alone" },
      very: { title: "very", keystroke: ["1236"], type: "alone" },
      will: { title: "will", keystroke: ["2456"], type: "alone" },
      it: { title: "it", keystroke: ["1346"], type: "alone" },
      you: { title: "you", keystroke: ["13456"], type: "alone" },
      as: { title: "as", keystroke: ["1356"], type: "alone" },
    },
  },

  strong_contractions: {
    title: "Strong Contractions",
    content: {
      and: { title: "and", keystroke: ["12346"], type: "alone" },
      for: { title: "for", keystroke: ["123456"], type: "alone" },
      of: { title: "of", keystroke: ["12356"], type: "alone" },
      the: { title: "the", keystroke: ["2346"], type: "alone" },
      with: { title: "with", keystroke: ["23456"], type: "alone" },
    },
  },

  strong_wordsigns: {
    title: "Strong Wordsigns",
    content: {
      child: { title: "child", keystroke: ["16"], type: "alone" },
      shall: { title: "shall", keystroke: ["146"], type: "alone" },
      this: { title: "this", keystroke: ["1456"], type: "alone" },
      which: { title: "which", keystroke: ["156"], type: "alone" },
      out: { title: "out", keystroke: ["1256"], type: "alone" },
      still: { title: "still", keystroke: ["34"], type: "alone" },
    },
  },

  strong_groupsigns: {
    title: "Strong Groupsigns",
    content: {
      ch: { title: "ch", keystroke: ["16"], type: "every" },
      sh: { title: "sh", keystroke: ["146"], type: "every" },
      th: { title: "th", keystroke: ["1456"], type: "every" },
      wh: { title: "wh", keystroke: ["156"], type: "every" },
      ou: { title: "ou", keystroke: ["1256"], type: "every" },

      st: { title: "st", keystroke: ["34"], type: "every" },
      gh: { title: "gh", keystroke: ["126"], type: "every" },
      ed: { title: "ed", keystroke: ["1246"], type: "every" },
      er: { title: "er", keystroke: ["12456"], type: "every" },
      ow: { title: "ow", keystroke: ["246"], type: "every" },

      ar: { title: "ar", keystroke: ["345"], type: "every" },
      ing: { title: "ing", keystroke: ["346"], type: "every" },
    },
  },

  lower_wordsigns: {
    title: "Lower Wordsigns",
    content: {
      be: { title: "be", keystroke: ["23"], type: "alone" },
      enough: { title: "enough", keystroke: ["26"], type: "alone" },
      were: { title: "were", keystroke: ["2356"], type: "alone" },
      his: { title: "his", keystroke: ["236"], type: "alone" },
      was: { title: "was", keystroke: ["356"], type: "alone" },
    },
  },

  lower_groupsigns: {
    title: "Lower Groupsigns",
    content: {
      ea: { title: "ea", keystroke: ["2"], type: "middle" },
      bb: { title: "bb", keystroke: ["23"], type: "middle" },
      cc: { title: "cc", keystroke: ["25"], type: "middle" },
      ff: { title: "ff", keystroke: ["235"], type: "middle" },
      gg: { title: "gg", keystroke: ["2356"], type: "middle" },

      be: { title: "be", keystroke: ["23"], type: "first" },
      con: { title: "con", keystroke: ["25"], type: "first" },
      dis: { title: "dis", keystroke: ["256"], type: "first" },
      en: { title: "en", keystroke: ["26"], type: "every" },
      in: { title: "in", keystroke: ["35"], type: "every" },
    },
  },

  initial_letter_contractions: {
    title: "Initial Letter Contractions",
    content: {
      day: { title: "day", keystroke: ["5", "145"], type: "every" },
      ever: { title: "ever", keystroke: ["5", "15"], type: "every" },
      father: { title: "father", keystroke: ["5", "124"], type: "every" },
      here: { title: "here", keystroke: ["5", "125"], type: "every" },
      know: { title: "know", keystroke: ["5", "13"], type: "every" },
      lord: { title: "lord", keystroke: ["5", "123"], type: "every" },
      mother: { title: "mother", keystroke: ["5", "134"], type: "every" },
      name: { title: "name", keystroke: ["5", "1345"], type: "every" },
      one: { title: "one", keystroke: ["5", "135"], type: "every" },
      part: { title: "part", keystroke: ["5", "1234"], type: "every" },
      question: { title: "question", keystroke: ["5", "12345"], type: "every" },
      right: { title: "right", keystroke: ["5", "1235"], type: "every" },
      some: { title: "some", keystroke: ["5", "234"], type: "every" },
      time: { title: "time", keystroke: ["5", "2345"], type: "every" },
      under: { title: "under", keystroke: ["5", "136"], type: "every" },
      work: { title: "work", keystroke: ["5", "2456"], type: "every" },
      young: { title: "young", keystroke: ["5", "13456"], type: "every" },

      there: { title: "there", keystroke: ["5", "2346"], type: "every" },
      character: { title: "character", keystroke: ["5", "16"], type: "every" },
      through: { title: "through", keystroke: ["5", "1456"], type: "every" },
      where: { title: "where", keystroke: ["5", "156"], type: "every" },
      ought: { title: "ought", keystroke: ["5", "1256"], type: "every" },
      upon: { title: "upon", keystroke: ["45", "136"], type: "every" },
      word: { title: "word", keystroke: ["45", "2456"], type: "every" },
      these: { title: "these", keystroke: ["45", "2346"], type: "every" },
      those: { title: "those", keystroke: ["45", "1456"], type: "every" },
      whose: { title: "whose", keystroke: ["45", "156"], type: "every" },

      cannot: { title: "cannot", keystroke: ["456", "14"], type: "every" },
      had: { title: "had", keystroke: ["456", "125"], type: "every" },
      many: { title: "many", keystroke: ["456", "134"], type: "every" },
      spirit: { title: "spirit", keystroke: ["456", "234"], type: "every" },
      world: { title: "world", keystroke: ["456", "2456"], type: "every" },
      their: { title: "their", keystroke: ["456", "2346"], type: "every" },
    },
  },

  final_letter_groupsigns: {
    title: "Final-letter Groupsigns",
    content: {
      ound: { title: "ound", keystroke: ["46", "145"], type: "last" },
      ance: { title: "ance", keystroke: ["46", "15"], type: "last" },
      sion: { title: "sion", keystroke: ["46", "1345"], type: "last" },
      less: { title: "less", keystroke: ["46", "234"], type: "last" },
      ount: { title: "ount", keystroke: ["46", "2345"], type: "last" },

      ence: { title: "ence", keystroke: ["56", "15"], type: "last" },
      ong: { title: "ong", keystroke: ["56", "1245"], type: "last" },
      ful: { title: "ful", keystroke: ["56", "123"], type: "last" },
      tion: { title: "tion", keystroke: ["56", "1345"], type: "last" },
      ness: { title: "ness", keystroke: ["56", "234"], type: "last" },
      ment: { title: "ment", keystroke: ["56", "2345"], type: "last" },
      ity: { title: "ity", keystroke: ["56", "13456"], type: "last" },
    },
  },

  shortform_words: {
    title: "Shortform Words",
    content: {
      about: { title: "about", keystroke: ["1", "12"] },
      above: { title: "above", keystroke: ["1", "12", "1236"] },
      according: { title: "according", keystroke: ["1", "14"] },
      across: { title: "across", keystroke: ["1", "14", "1235"] },
      after: { title: "after", keystroke: ["1", "124"] },

      afternoon: { title: "afternoon", keystroke: ["1", "124", "1345"] },
      afterward: { title: "afterward", keystroke: ["1", "124", "2456"] },
      again: { title: "again", keystroke: ["1", "1245"] },
      against: { title: "against", keystroke: ["1", "1245", "34"] },
      almost: { title: "almost", keystroke: ["1", "123", "134"] },

      already: { title: "already", keystroke: ["1", "123", "1235"] },
      also: { title: "also", keystroke: ["1", "123"] },
      altogether: { title: "altogether", keystroke: ["1", "123", "2345"] },
      although: { title: "although", keystroke: ["1", "123", "1456"] },
      always: { title: "always", keystroke: ["1", "123", "2456"] },

      because: { title: "because", keystroke: ["23", "14"] },
      before: { title: "before", keystroke: ["23", "124"] },
      behind: { title: "behind", keystroke: ["23", "125"] },
      below: { title: "below", keystroke: ["23", "123"] },
      beneath: { title: "beneath", keystroke: ["23", "1345"] },

      beside: { title: "beside", keystroke: ["23", "234"] },
      between: { title: "between", keystroke: ["23", "2345"] },
      beyond: { title: "beyond", keystroke: ["23", "13456"] },
      blind: { title: "blind", keystroke: ["12", "123"] },
      braille: { title: "braille", keystroke: ["12", "1235", "123"] },

      children: { title: "children", keystroke: ["16", "1345"] },
      conceive: { title: "conceive", keystroke: ["25", "14", "1236"] },
      conceiving: { title: "conceiving", keystroke: ["25", "14", "1236", "1245"] },
      could: { title: "could", keystroke: ["14", "145"] },
      deceive: { title: "deceive", keystroke: ["145", "14", "1236"] },

      deceiving: { title: "deceiving", keystroke: ["145", "14", "1236", "1245"] },
      declare: { title: "declare", keystroke: ["145", "14", "123"] },
      declaring: { title: "declaring", keystroke: ["145", "14", "123", "1245"] },
      either: { title: "either", keystroke: ["15", "24"] },
      first: { title: "first", keystroke: ["124", "34"] },

      friend: { title: "friend", keystroke: ["124", "1235"] },
      good: { title: "good", keystroke: ["1245", "145"] },
      great: { title: "great", keystroke: ["1245", "1235", "2345"] },
      herself: { title: "herself", keystroke: ["125", "12456", "124", "1345"] },
      him: { title: "him", keystroke: ["125", "134"] },

      himself: { title: "himself", keystroke: ["125", "12456", "124"] },
      immediate: { title: "immediate", keystroke: ["24", "134", "134"] },
      its: { title: "its", keystroke: ["1346", "234"] },
      itself: { title: "itself", keystroke: ["1346", "124"] },
      letter: { title: "letter", keystroke: ["123", "1235"] },

      little: { title: "little", keystroke: ["123", "123"] },
      much: { title: "much", keystroke: ["134", "16"] },
      must: { title: "must", keystroke: ["134", "34"] },
      myself: { title: "myself", keystroke: ["134", "13456", "124"] },
      necessary: { title: "necessary", keystroke: ["1345", "15", "14"] },

      neither: { title: "neither", keystroke: ["1345", "15", "24"] },
      oneself: { title: "oneself", keystroke: ["5", "135", "124"] },
      ourselves: { title: "ourselves", keystroke: ["1256", "1235", "1236", "234"] },
      paid: { title: "paid", keystroke: ["1234", "145"] },
      perceive: { title: "perceive", keystroke: ["1234", "12456", "14", "1236"] },

      perceiving: { title: "perceiving", keystroke: ["1234", "12456", "14", "1236", "1245"] },
      perhaps: { title: "perhaps", keystroke: ["1234", "12456", "125"] },
      quick: { title: "quick", keystroke: ["12345", "13"] },
      receive: { title: "receive", keystroke: ["1235", "14", "1236"] },
      receiving: { title: "receiving", keystroke: ["1235", "14", "1236", "1245"] },

      rejoice: { title: "rejoice", keystroke: ["1235", "245", "14"] },
      rejoicing: { title: "rejoicing", keystroke: ["1235", "245", "14", "1245"] },
      said: { title: "said", keystroke: ["234", "145"] },
      should: { title: "should", keystroke: ["146", "145"] },
      such: { title: "such", keystroke: ["234", "16"] },

      themselves: { title: "themselves", keystroke: ["2346", "134", "1236", "234"] },
      thyself: { title: "thyself", keystroke: ["1456", "13456", "124"] },
      today: { title: "today", keystroke: ["2345", "145"] },
      together: { title: "together", keystroke: ["2345", "1245", "1235"] },
      tomorrow: { title: "tomorrow", keystroke: ["2345", "134"] },

      tonight: { title: "tonight", keystroke: ["2345", "1345"] },
      would: { title: "would", keystroke: ["2456", "145"] },
      your: { title: "your", keystroke: ["13456", "1235"] },
      yourself: { title: "yourself", keystroke: ["13456", "1235", "124"] },
      yourselves: { title: "yourselves", keystroke: ["13456", "1235", "1236", "234"] },
    },
  },
};

export const BrailleUnicode: { [key: string]: string } = {
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

export const alphabet_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.alphabet.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const alphabetic_wordsigns_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.alphabetic_wordsigns.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const strong_contractions_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.strong_contractions.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const strong_wordsigns_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.strong_wordsigns.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const strong_groupsigns_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.strong_groupsigns.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const lower_wordsigns_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.lower_wordsigns.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const lower_groupsigns_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.lower_groupsigns.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const initial_letter_contractions_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.initial_letter_contractions.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const final_letter_groupsigns_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.final_letter_groupsigns.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const shortform_words_mapping = new Map<number[], BrailleItem>(
  Object.entries(BrailleData.shortform_words.content).map(([key, item]) => {
    const ptn = item.keystroke.map((keystroke) => parseInt(keystroke));
    return [ptn, item];
  })
);

export const indicator: { [key: string]: BrailleItem[] } = {
  bold: [BrailleData.indicators.content.bold_symbol, BrailleData.indicators.content.bold_word, BrailleData.indicators.content.bold_passage],
  italic: [BrailleData.indicators.content.italic_symbol, BrailleData.indicators.content.italic_word, BrailleData.indicators.content.italic_passage],
  underline: [BrailleData.indicators.content.underline_symbol, BrailleData.indicators.content.underline_word, BrailleData.indicators.content.underline_passage],
};
