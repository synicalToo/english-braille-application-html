export const BrailleData: { heading: string; items: { title: string; content: string; className?: string }[] }[] = [
  {
    heading: "Alphabets",
    items: [
      { title: "a", content: "⠁" },
      { title: "b", content: "⠃" },
      { title: "c", content: "⠉" },
      { title: "d", content: "⠙" },
      { title: "e", content: "⠑" },
      { title: "f", content: "⠋", className: "" },
      { title: "g", content: "⠛" },
      { title: "h", content: "⠓" },
      { title: "i", content: "⠊" },
      { title: "j", content: "⠚" },

      { title: "k", content: "⠅" },
      { title: "l", content: "⠇" },
      { title: "m", content: "⠍" },
      { title: "n", content: "⠝" },
      { title: "o", content: "⠕" },
      { title: "p", content: "⠏", className: "" },
      { title: "q", content: "⠟" },
      { title: "r", content: "⠗" },
      { title: "s", content: "⠎" },
      { title: "t", content: "⠞" },

      { title: "u", content: "⠥" },
      { title: "v", content: "⠧" },
      { title: "w", content: "⠺" },
      { title: "x", content: "⠭" },
      { title: "y", content: "⠽" },
      { title: "z", content: "⠵" },
    ],
  },
  {
    heading: "Numbers",
    items: [
      { title: "1", content: "⠼⠁" },
      { title: "2", content: "⠼⠃" },
      { title: "3", content: "⠼⠉" },
      { title: "4", content: "⠼⠋" },
      { title: "5", content: "⠼⠊" },
      { title: "6", content: "⠼⠡" },
      { title: "7", content: "⠼⠣" },
      { title: "8", content: "⠼⠩" },
      { title: "9", content: "⠼⠫" },
      { title: "0", content: "⠼⠚" },
    ],
  },
];

export const BrailleUnicodeAlphabet: { [key: string]: string } = {
  "000000": "⠀", // space

  "100000": "⠁", // letter A
  "110000": "⠃", // letter B
  "100100": "⠉", // letter C
  "100110": "⠙", // letter D
  "100010": "⠑", // letter E
  "110100": "⠋", // letter F
  "110110": "⠛", // letter G
  "110010": "⠓", // letter H
  "010100": "⠊", // letter I
  "010110": "⠚", // letter J
  "101000": "⠅", // letter K
  "111000": "⠇", // letter L
  "101100": "⠍", // letter M
  "101110": "⠝", // letter N
  "101010": "⠕", // letter O
  "111100": "⠏", // letter P
  "111110": "⠟", // letter Q
  "111010": "⠗", // letter R
  "011100": "⠎", // letter S
  "011110": "⠞", // letter T
  "101001": "⠥", // letter U
  "111001": "⠧", // letter V
  "010111": "⠺", // letter W
  "101101": "⠭", // letter X
  "101111": "⠽", // letter Y
  "101011": "⠵", // letter Z
};

export const BrailleUnicodeLowerAlphabetMappings: { [key: string]: string } = {
  "000000": "⠀", // space

  "100000": "a", // letter A
  "110000": "b", // letter B
  "100100": "c", // letter C
  "100110": "d", // letter D
  "100010": "e", // letter E
  "110100": "f", // letter F
  "110110": "g", // letter G
  "110010": "h", // letter H
  "010100": "i", // letter I
  "010110": "j", // letter J
  "101000": "k", // letter K
  "111000": "l", // letter L
  "101100": "m", // letter M
  "101110": "n", // letter N
  "101010": "o", // letter O
  "111100": "p", // letter P
  "111110": "q", // letter Q
  "111010": "r", // letter R
  "011100": "s", // letter S
  "011110": "t", // letter T
  "101001": "u", // letter U
  "111001": "v", // letter V
  "010111": "w", // letter W
  "101101": "x", // letter X
  "101111": "y", // letter Y
  "101011": "z", // letter Z
};

export const BrailleUnicodeUpperAlphabetMappings: { [key: string]: string } = {
  "000000": "⠀", // space

  "100000": "A", // letter A
  "110000": "B", // letter B
  "100100": "C", // letter C
  "100110": "D", // letter D
  "100010": "E", // letter E
  "110100": "F", // letter F
  "110110": "G", // letter G
  "110010": "H", // letter H
  "010100": "I", // letter I
  "010110": "J", // letter J
  "101000": "K", // letter K
  "111000": "L", // letter L
  "101100": "M", // letter M
  "101110": "N", // letter N
  "101010": "O", // letter O
  "111100": "P", // letter P
  "111110": "Q", // letter Q
  "111010": "R", // letter R
  "011100": "S", // letter S
  "011110": "T", // letter T
  "101001": "U", // letter U
  "111001": "V", // letter V
  "010111": "W", // letter W
  "101101": "X", // letter X
  "101111": "Y", // letter Y
  "101011": "Z", // letter Z
};

export const BrailleUnicodeNumber: { [key: string]: string } = {
  // numbers
  "100000": "⠂", // 1
  "110000": "⠆", // 2
  "100100": "⠒", // 3
  "100110": "⠲", // 4
  "100010": "⠢", // 5
  "110100": "⠖", // 6
  "110110": "⠶", // 7
  "110010": "⠦", // 8
  "010100": "⠔", // 9
  "010110": "⠴", // 0
};

export const BrailleUnicodeNumberMappings: { [key: string]: string } = {
  // numbers
  "100000": "1", // 1
  "110000": "2", // 2
  "100100": "3", // 3
  "100110": "4", // 4
  "100010": "5", // 5
  "110100": "6", // 6
  "110110": "7", // 7
  "110010": "8", // 8
  "010100": "9", // 9
  "010110": "0", // 0
};

export const BrailleUnicodeIndicators: { [key: string]: string } = {
  "000011": "⠼", // numeric
  "000001": "⠠", // capital letter
  // "000000": "⠠⠠", // word
  // "000000": "⠠⠠⠠", // passage
  // "000000": "⠠⠄", // capital terminator
};

export const BrailleUnicodeIndicatorsMappings: { [key: string]: string } = {
  "000011": "numbers", // numeric
  "000001": "capital", // capital letter
  // "000000": "⠠⠠", // word
  // "000000": "⠠⠠⠠", // passage
  // "000000": "⠠⠄", // capital terminator
};

export const BrailleUnicodePunctuation: { [key: string]: string } = {
  "010000": "⠂", // comma
  "011000": "⠆", // period
  "011010": "⠖", // colon
  "011001": "⠦", // semicolon
  "001011": "⠴", // question mark
  "001010": "⠔", // exclamation mark
  "100011": "⠱", // apostrophe
  //   "000011": "⠰", // left parenthesis
  //   "100011": "⠱", // right parenthesis
  //   "000000": "⠰", // left bracket
  //   "000000": "⠱", // right bracket
  //   "000000": "⠰", // left curly brace
  //   "000000": "⠱", // right curly brace
  //   "000000": "⠰", // left
};
