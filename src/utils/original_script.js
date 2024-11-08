// Braille Typing Exercises
// TAKEMAE Masaaki 2023.01.16
// Copyright 2022-2023 Nagano Kosen GEAR 5.0 Project

// braille_japanese_alphabets
var braille_japanese_alphabets = {
  100000: "ア",
  110000: "イ",
  100100: "ウ",
  110100: "エ",
  "010100": "オ",
  100001: "カ",
  110001: "キ",
  100101: "ク",
  110101: "ケ",
  "010101": "コ",
  100011: "サ",
  110011: "シ",
  100111: "ス",
  110111: "セ",
  "010111": "ソ",
  101010: "タ",
  111010: "チ",
  101110: "ツ",
  111110: "テ",
  "011110": "ト",
  101000: "ナ",
  111000: "ニ",
  101100: "ヌ",
  111100: "ネ",
  "011100": "ノ",
  101001: "ハ",
  111001: "ヒ",
  101101: "フ",
  111101: "ヘ",
  "011101": "ホ",
  101011: "マ",
  111011: "ミ",
  101111: "ム",
  111111: "メ",
  "011111": "モ",
  "001100": "ヤ",
  "001101": "ユ",
  "001110": "ヨ",
  100010: "ラ",
  110010: "リ",
  100110: "ル",
  110110: "レ",
  "010110": "ロ",
  "001000": "ワ",
  "011000": "ヰ",
  "011010": "ヱ",
  "001010": "ヲ",
  "001011": "ン",
  "010010": "ー",
  "010000": "ッ",
  "000000": "　",
};

// voiced consonants
var braille_voiced_consonants = {
  カ: "ガ",
  キ: "ギ",
  ク: "グ",
  ケ: "ゲ",
  コ: "ゴ",
  サ: "ザ",
  シ: "ジ",
  ス: "ズ",
  セ: "ゼ",
  ソ: "ゾ",
  タ: "ダ",
  チ: "ヂ",
  ツ: "ヅ",
  テ: "デ",
  ト: "ド",
  ハ: "バ",
  ヒ: "ビ",
  フ: "ブ",
  ヘ: "ベ",
  ホ: "ボ",
  ウ: "ヴ",
  "　": "・",
};

// semi_voiced_sounds
var hdaku = {
  ハ: "パ",
  ヒ: "ピ",
  フ: "プ",
  ヘ: "ペ",
  ホ: "ポ",
};

// 拗音
var yoon = {
  カ: "キャ",
  ク: "キュ",
  コ: "キョ",
  サ: "シャ",
  ス: "シュ",
  ソ: "ショ",
  タ: "チャ",
  ツ: "チュ",
  ト: "チョ",
  ナ: "ニャ",
  ヌ: "ニュ",
  ノ: "ニョ",
  ハ: "ヒャ",
  フ: "ヒュ",
  ホ: "ヒョ",
  マ: "ミャ",
  ム: "ミュ",
  モ: "ミョ",
  ラ: "リャ",
  ル: "リュ",
  ロ: "リョ",
  エ: "イェ",
  ケ: "キェ",
  セ: "シェ",
  テ: "チェ",
  ネ: "ニェ",
  ヘ: "ヒェ",
  シ: "スィ",
  チ: "ティ",
};

// 拗濁音
var yodaku = {
  カ: "ギャ",
  ク: "ギュ",
  コ: "ギョ",
  サ: "ジャ",
  ス: "ジュ",
  ソ: "ジョ",
  タ: "ヂャ",
  ツ: "ヂュ",
  ト: "ヂョ",
  ハ: "ビャ",
  フ: "ビュ",
  ホ: "ビョ",
  セ: "ジェ",
  シ: "ズィ",
  チ: "ディ",
};

// 拗半濁音
var yohandaku = {
  ハ: "ピャ",
  フ: "ピュ",
  ホ: "ピョ",
  ツ: "テュ",
  ユ: "フュ",
  ヨ: "フョ",
};

// 特殊音
var tokushu = {
  イ: "ウィ",
  エ: "ウェ",
  オ: "ウォ",
  "　": "？",
  カ: "クァ",
  キ: "クィ",
  ケ: "クェ",
  コ: "クォ",
  タ: "ツァ",
  チ: "ツィ",
  テ: "ツェ",
  ト: "ツォ",
  ハ: "ファ",
  ヒ: "フィ",
  ヘ: "フェ",
  ホ: "フォ",
  ツ: "トゥ",
};

// 特殊音＋濁音
var tokushu_da = {
  カ: "グァ",
  キ: "グィ",
  ケ: "グェ",
  コ: "グォ",
  ハ: "ヴァ",
  ヒ: "ヴィ",
  ヘ: "ヴェ",
  ホ: "ヴォ",
  ツ: "ドゥ",
  "　": "。",
};

// 拗半濁音
var yohandaku_da = {
  ツ: "デュ",
  ユ: "ヴュ",
  ヨ: "ヴョ",
};

// numbers
var braille_numbers = {
  100000: "1",
  110000: "2",
  100100: "3",
  100110: "4",
  100010: "5",
  110100: "6",
  110110: "7",
  110010: "8",
  "010100": "9",
  "010110": "0",
  "010000": ".",
  "001000": ",",
};

// english alphabets lower
var braille_english_alphabets_lower = {
  100000: "a",
  110000: "b",
  100100: "c",
  100110: "d",
  100010: "e",
  110100: "f",
  110110: "g",
  110010: "h",
  "010100": "i",
  "010110": "j",
  101000: "k",
  111000: "l",
  101100: "m",
  101110: "n",
  101010: "o",
  111100: "p",
  111110: "q",
  111010: "r",
  "011100": "s",
  "011110": "t",
  101001: "u",
  111001: "v",
  "010111": "w",
  101101: "x",
  101111: "y",
  101011: "z",
  "001001": "-",
  "010010": ":",
  "011000": ";",
  "010000": ",",
  "010011": ".",
  "011001": "?",
  "011010": "!",
  "001000": "'",
  "000000": "、",
  "001100": "/",
};

// english alphabets upper
var braille_english_alphabets_upper = {
  100000: "A",
  110000: "B",
  100100: "C",
  100110: "D",
  100010: "E",
  110100: "F",
  110110: "G",
  110010: "H",
  "010100": "I",
  "010110": "J",
  101000: "K",
  111000: "L",
  101100: "M",
  101110: "N",
  101010: "O",
  111100: "P",
  111110: "Q",
  111010: "R",
  "011100": "S",
  "011110": "T",
  101001: "U",
  111001: "V",
  "010111": "W",
  101101: "X",
  101111: "Y",
  101011: "Z",
  "001001": "-",
  "010010": ":",
  "011000": ";",
  "010000": ",",
  "010011": ".",
  "011001": "?",
  "011010": "!",
  "001000": "'",
  "000000": "、",
  "001100": "/",
};

// hidden characters
var braille_hidden_characters = {
  101011: "○",
  111011: "△",
  101111: "□",
  111111: "×",
};

// マーク類
var mark = {
  111101: "&",
  100101: "#",
  100001: "*",
  "010101": "@",
};

// 符号
var braille_indicators = {
  "001111": "numeral",
  "000011": "external_character_mark",
  "011001": "foreign_language_quotation_marks",
  "001011": "foreign_language_quotation_marks_end",
  "000001": "capital_letters_semi_voiced_sounds",
  "000010": "braille_voiced_consonants",
  "000100": "拗音点",
  "000110": "拗濁点",
  "000101": "拗半濁点",
  "010001": "特殊音符",
  "010011": "特殊音符＋濁音",
  "000111": "拗半濁点＋濁音",
  "001001": "connecting_marks",
};

var start_fugo = {
  "001111": "numeral",
  "000011": "external_character_mark",
  "011001": "foreign_language_quotation_marks",
};

var mid_fugo = {
  "000001": "capital_letters_semi_voiced_sounds",
  "000010": "braille_voiced_consonants",
  "000100": "拗音点",
  "000110": "拗濁点",
  "000101": "拗半濁点",
  "010001": "特殊音符",
  "010011": "特殊音符＋濁音",
  "000111": "拗半濁点＋濁音",
};

// enclosure symbols
var enclosure_symbols = {
  "011011": "（",
  "001001": "「",
};

// 外字符とセットの囲み記号
var gaijifu_kakomi = {
  "001000": "【",
  "001001": "『",
  "011011": "《",
};

// 濁音とセットの囲み記号
var daku_kakomi = {
  "011011": "〈",
};

// 囲み記号ペア
var kakomi_pair = {
  "（": "）",
  "〈": "〉",
  "《": "》",
  "「": "」",
  "【": "】",
  "『": "』",
  "｛": "｝",
  "［": "］",
};

// 囲み番号
var kakomi_no = {
  "（": 0,
  "〈": 1,
  "《": 2,
  "「": 3,
  "【": 4,
  "『": 5,
  "｛": 6,
  "［": 7,
};

// 点字Unicode
var braille_unicode = {
  "000000": "⠀",
  100000: "⠁",
  "010000": "⠂",
  110000: "⠃",
  "001000": "⠄",
  101000: "⠅",
  "011000": "⠆",
  111000: "⠇",
  "000100": "⠈",
  100100: "⠉",
  "010100": "⠊",
  110100: "⠋",
  "001100": "⠌",
  101100: "⠍",
  "011100": "⠎",
  111100: "⠏",

  "000010": "⠐",
  100010: "⠑",
  "010010": "⠒",
  110010: "⠓",
  "001010": "⠔",
  101010: "⠕",
  "011010": "⠖",
  111010: "⠗",
  "000110": "⠘",
  100110: "⠙",
  "010110": "⠚",
  110110: "⠛",
  "001110": "⠜",
  101110: "⠝",
  "011110": "⠞",
  111110: "⠟",

  "000001": "⠠",
  100001: "⠡",
  "010001": "⠢",
  110001: "⠣",
  "001001": "⠤",
  101001: "⠥",
  "011001": "⠦",
  111001: "⠧",
  "000101": "⠨",
  100101: "⠩",
  "010101": "⠪",
  110101: "⠫",
  "001101": "⠬",
  101101: "⠭",
  "011101": "⠮",
  111101: "⠯",

  "000011": "⠰",
  100011: "⠱",
  "010011": "⠲",
  110011: "⠳",
  "001011": "⠴",
  101011: "⠵",
  "011011": "⠶",
  111011: "⠷",
  "000111": "⠸",
  100111: "⠹",
  "010111": "⠺",
  110111: "⠻",
  "001111": "⠼",
  101111: "⠽",
  "011111": "⠾",
  111111: "⠿",
};

// 発音
var text_to_speech_mapping = {
  ア: "ア",
  イ: "イ",
  ウ: "ウ",
  エ: "エ",
  オ: "オ",
  カ: "カ",
  キ: "キ",
  ク: "ク",
  ケ: "ケ",
  コ: "コ",
  サ: "サ",
  シ: "シ",
  ス: "ス",
  セ: "セ",
  ソ: "ソ",
  タ: "タ",
  チ: "チ",
  ツ: "ツ",
  テ: "テ",
  ト: "ト",
  ナ: "ナ",
  ニ: "ニ",
  ヌ: "ヌ",
  ネ: "ネ",
  ノ: "ノ",
  ハ: "ハ",
  ヒ: "ヒ",
  フ: "フ",
  ヘ: "ヘ",
  ホ: "ホ",
  マ: "マ",
  ミ: "ミ",
  ム: "ム",
  メ: "メ",
  モ: "モ",
  ヤ: "ヤ",
  ユ: "ユ",
  ヨ: "ヨ",
  ラ: "ラ",
  リ: "リ",
  ル: "ル",
  レ: "レ",
  ロ: "ロ",
  ワ: "ワ",
  ヰ: "ヰ",
  ヲ: "ヲ",
  ン: "ン",
  ー: "ハイフン",
  ッ: "ツ",
  "　": "スペース",
  1: "いち",
  2: "に",
  3: "さん",
  4: "よん",
  5: "ご",
  6: "ろく",
  7: "なな",
  8: "はち",
  9: "きゅう",
  0: "ゼロ",
  a: "a",
  b: "b",
  c: "c",
  d: "d",
  e: "e",
  f: "f",
  g: "g",
  h: "h",
  i: "i",
  j: "j",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "p",
  q: "q",
  r: "r",
  s: "s",
  t: "t",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  y: "y",
  z: "z",
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  H: "H",
  I: "I",
  J: "J",
  K: "K",
  L: "L",
  M: "M",
  N: "N",
  O: "O",
  P: "P",
  Q: "Q",
  R: "R",
  S: "S",
  T: "T",
  U: "U",
  V: "V",
  W: "W",
  X: "X",
  Y: "Y",
  Z: "Z",
  ".": "ピリオド",
  ",": "コンマ",
  ":": "コロン",
  ";": "セミコロン",
  "-": "ハイフン",
  "?": "ぎもんふ",
  "!": "かんたんふ",
  "'": "シングルコーテーション",
  '"': "ダブルコーテーション",
  "/": "スラッシュ",
  "。": "くてん",
  "、": "どくてん",
  "・": "ちゅうてん",
  "〜": "から",
  "…": "てんせん",
  "（": "だいいちカッコ",
  "）": "だいいちカッコとじる",
  "〈": "だいにカッコ",
  "〉": "だいにカッコとじる",
  "「": "だいいちカギ",
  "」": "だいいちカギとじる",
  "【": "だいにカギ",
  "】": "だいにカギとじる",
  "『": "ふたえカギ",
  "』": "ふたえカギとじる",
  "《": "にじゅうカッコ",
  "》": "にじゅうカッコとじる",
  外: "がいじ",
  大: "おおもじ",
  "〔": "がいごかいし",
  "〕": "がいごしゅうりょう",
  数: "すうじ",
  継: "つなぎ",
  濁: "だくおん",
  半: "はんだくおん",
  拗: "ようおん",
  "≧": "ようだくおん",
  "▲": "ようはんだくおん",
  特: "とくしゅおん",
  "▽": "とくしゅだくおん",
  "▼": "ようはんだくだくおん",
  "○": "ふせじまる",
  "△": "ふせじさんかく",
  "□": "ふせじしかく",
  "×": "ふせじばつ",
  "→": "みぎやじるし",
  "←": "ひだりやじるし",
  "%": "%",
  "&": "&",
  "#": "#",
  "*": "*",
  "@": "@",
  "★": "だいいちほしじるし",
  "☆": "だいにほしじるし",
  "※": "だいさんほしじるし",
};

// 練習テーマ読み上げ
let task_theme = {
  0: "ごじゅうおんもんだいです",
  1: "だくおんもんだいです",
  2: "ようおんもんだいです",
  3: "とくしゅおんもんだいです",
  4: "えいじもんだいです",
  5: "すうじもんだいです",
  6: "こんざいもんだいです",
};

// 点字落ちゲー用課題リスト
let down_task_list = [
  [
    // 1. braille_japanese_alphabets
    ["あひる", "あひる", "⠁⠧⠙", "アヒル", "123"],
    ["うし", "うし", "⠉⠳", "ウシ", "12"],
    ["うま", "うま", "⠉⠵", "ウマ", "12"],
    ["にわとり", "にわとり", "⠇⠄⠞⠓", "ニワトリ", "1234"],
    ["いぬ", "いぬ", "⠃⠍", "イヌ", "12"],
    ["ねこ", "ねこ", "⠏⠪", "ネコ", "12"],
    ["おはよう", "おはよう", "⠊⠥⠜⠒", "オハヨウ", "1234"],
    ["こんにちは", "こんにちは", "⠪⠴⠇⠗⠄", "コンニチワ", "12345"],
    ["まつもと", "まつもと", "⠵⠝⠾⠞", "マツモト", "1234"],
    ["くまもと", "くまもと", "⠩⠵⠾⠞", "クマモト", "1234"],
    ["さいたま", "さいたま", "⠱⠃⠕⠵", "サイタマ", "1234"],
    ["あいち", "あいち", "⠁⠃⠗", "アイチ", "123"],
    ["おおさか", "おおさか", "⠊⠊⠱⠡", "オオサカ", "1234"],
    ["あおもり", "あおもり", "⠁⠊⠾⠓", "アオモリ", "1234"],
    ["あきた", "あきた", "⠁⠣⠕", "アキタ", "123"],
    ["ふくおか", "ふくおか", "⠭⠩⠊⠡", "フクオカ", "1234"],
    ["おきなわ", "おきなわ", "⠊⠣⠅⠄", "オキナワ", "1234"],
    ["えひめ", "えひめ", "⠋⠧⠿", "エヒメ", "123"],
    ["やさい", "やさい", "⠌⠱⠃", "ヤサイ", "123"],
    ["ほうれんそう", "ほうれんそう", "⠮⠒⠛⠴⠺⠒", "ホウレンソウ", "123456"],
    ["ほけんしつ", "ほけんしつ", "⠮⠫⠴⠳⠝", "ホケンシツ", "12345"],
    ["とまと", "とまと", "⠞⠵⠞", "トマト", "123"],
    ["みそしる", "みそしる", "⠷⠺⠳⠙", "ミソシル", "1234"],
    ["エアコン", "えあこん", "⠋⠁⠪⠴", "エアコン", "1234"],
    ["なつやすみ", "なつやすみ", "⠅⠝⠌⠹⠷", "ナツヤスミ", "12345"],
    ["ふゆやすみ", "ふゆやすみ", "⠭⠬⠌⠹⠷", "フユヤスミ", "12345"],
    ["はるやすみ", "はるやすみ", "⠥⠙⠌⠹⠷", "ハルヤスミ", "12345"],
    ["くるま", "くるま", "⠩⠙⠵", "クルマ", "123"],
    ["スマホ", "すまほ", "⠹⠵⠮", "スマホ", "123"],
    ["マスク", "ますく", "⠵⠹⠩", "マスク", "123"],
    ["たいよう", "たいよう", "⠕⠃⠜⠒", "タイヨウ", "1234"],
    ["よろしく", "よろしく", "⠜⠚⠳⠩", "ヨロシク", "1234"],
    ["さんすう", "さんすう", "⠱⠴⠹⠒", "サンスウ", "1234"],
    ["たいいく", "たいいく", "⠕⠃⠃⠩", "タイイク", "1234"],
    ["さかみち", "さかみち", "⠱⠡⠷⠗", "サカミチ", "1234"],
    ["ようちえん", "ようちえん", "⠜⠒⠗⠋⠴", "ヨウチエン", "12345"],
    ["ろうそく", "ろうそく", "⠚⠒⠺⠩", "ロウソク", "1234"],
    ["よこはま", "よこはま", "⠜⠪⠥⠵", "ヨコハマ", "1234"],
    ["ふうせん", "ふうせん", "⠭⠒⠻⠴", "フウセン", "1234"],
    ["れんらく", "れんらく", "⠛⠴⠑⠩", "レンラク", "1234"],
    ["せんせい", "せんせい", "⠻⠴⠻⠃", "センセイ", "1234"],
    ["アメリカ", "あめりか", "⠁⠿⠓⠡", "アメリカ", "1234"],
    ["フランス", "ふらんす", "⠭⠑⠴⠹", "フランス", "1234"],
  ],
  [
    // 2. 撥音・促音・長音・濁音・半濁音
    ["うさぎ", "うさぎ", "⠉⠱⠐⠣", "ウサ濁キ", "1223"],
    ["学校", "がっこう", "⠐⠡⠂⠪⠒", "濁カッコウ", "00112"],
    ["長野市", "ながのし", "⠅⠐⠡⠎⠳", "ナ濁カノシ", "00123"],
    ["ポータブル", "ぽーたぶる", "⠠⠮⠒⠕⠐⠭⠙", "半ホウタ濁フル", "0123345"],
    ["ピアノ", "ぴあの", "⠠⠧⠁⠎", "半ヒアノ", "0123"],
    ["ペアガラス", "ぺあがらす", "⠠⠯⠁⠐⠡⠑⠹", "半ヘア濁カラス", "0122345"],
    ["ポイント", "ぽいんと", "⠠⠮⠃⠴⠞", "半ホイント", "01234"],
    ["パターン", "ぱたーん", "⠠⠥⠕⠒⠴", "半ハタウン", "01234"],
    ["パズル", "ぱずる", "⠠⠥⠐⠹⠙", "半ハ濁スル", "01123"],
    ["パイオニア", "ぱいおにあ", "⠠⠥⠃⠊⠇⠁", "半ハイオニア", "012345"],
    ["パキスタン", "ぱきすたん", "⠠⠥⠣⠹⠕⠴", "半ハキスタン", "012345"],
    ["パラグアイ", "ぱらぐあい", "⠠⠥⠑⠐⠩⠁⠃", "半ハラ濁クアイ", "0122345"],
    ["パイナップル", "ぱいなっぷる", "⠠⠥⠃⠅⠂⠠⠭⠙", "半ハイナッ半フル", "01234456"],
    ["サッカー", "さっかー", "⠱⠂⠡⠒", "サッカウ", "1234"],
    ["ドリル", "どりる", "⠐⠞⠓⠙", "濁トリル", "0123"],
    ["ゴリラ", "ごりら", "⠐⠪⠓⠑", "濁コリラ", "0123"],
    ["デジタル", "でじたる", "⠐⠟⠐⠳⠕⠙", "濁テ濁シタル", "011234"],
    ["デザイナー", "でざいなー", "⠐⠟⠐⠱⠃⠅⠒", "濁テ濁サイナウ", "0112345"],
    ["ドローン", "どろーん", "⠐⠞⠚⠒⠴", "濁トロウン", "01234"],
    ["タッチパネル", "たっちぱねる", "⠕⠂⠗⠀⠠⠥⠏⠙", "タッチ　半ハネル", "12333456"],
    ["ポストイット", "ぽすといっと", "⠠⠮⠹⠞⠀⠃⠂⠞", "半ホスト　イット", "01233456"],
    ["財団", "ざいだん", "⠐⠱⠃⠐⠕⠴", "濁サイ濁タン", "001112"],
    ["粗大ゴミ", "そだいごみ", "⠺⠐⠕⠃⠀⠐⠪⠷", "ソ濁タイ　濁コミ", "11122234"],
    ["大学", "だいがく", "⠐⠕⠃⠐⠡⠩", "濁タイ濁カク", "001112"],
    ["点字", "てんじ", "⠟⠴⠐⠳", "テン濁シ", "0112"],
    ["東海道", "とうかいどう", "⠞⠒⠡⠃⠐⠞⠒", "トウカイ濁トウ", "0112223"],
    ["トレーニング", "とれーにんぐ", "⠞⠛⠒⠇⠴⠐⠩", "トレウニン濁ク", "1234556"],
    ["ネッカチーフ", "ねっかちーふ", "⠏⠂⠡⠗⠒⠭", "ネッカチウフ", "123456"],
    ["年月日", "ねんがっぴ", "⠏⠴⠐⠡⠂⠠⠧", "ネン濁カッ半ヒ", "0111223"],
    ["ノートブック", "のーとぶっく", "⠎⠒⠞⠀⠐⠭⠂⠩", "ノウト　濁フック", "12333456"],
    ["ペットフード", "ぺっとふーど", "⠠⠯⠂⠞⠀⠭⠒⠐⠞", "半ヘット　フウ濁ト", "01234556"],
    ["ペンギン", "ぺんぎん", "⠠⠯⠴⠐⠣⠴", "半ヘン濁キン", "012234"],
    ["ベッド", "べっど", "⠐⠯⠂⠐⠞", "濁ヘッ濁ト", "01223"],
    ["ポップコーン", "ぽっぷこーん", "⠠⠮⠂⠠⠭⠪⠒⠴", "半ホッ半フコウン", "01223456"],
  ],
  [
    // 3. 拗音・拗濁音・拗半濁音
    ["東京", "とうきょう", "⠞⠒⠈⠪⠒", "トウ拗コウ", "01112"],
    ["入学式", "にゅうがくしき", "⠈⠍⠒⠐⠡⠩⠳⠣", "拗ヌウ濁カクシキ", "00111223"],
    ["卒業式", "そつぎょうしき", "⠺⠝⠘⠪⠒⠳⠣", "ソツ≧コウシキ", "0111223"],
    ["教室", "きょうしつ", "⠈⠪⠒⠳⠝", "拗コウシツ", "00112"],
    ["キャベツ", "きゃべつ", "⠈⠡⠐⠯⠝", "拗カ濁ヘツ", "02234"],
    ["キャッチャー", "きゃっちゃー", "⠈⠡⠂⠈⠕⠒", "拗カッ拗コチウ", "023356"],
    ["九州", "きゅうしゅう", "⠈⠩⠒⠈⠹⠒", "拗クウ拗スウ", "001112"],
    ["共通", "きょうつう", "⠈⠪⠒⠝⠒", "拗コウツウ", "00112"],
    ["ギャル", "ぎゃる", "⠘⠡⠙", "≧カル", "023"],
    ["牛乳", "ぎゅうにゅう", "⠘⠩⠒⠈⠍⠒", "≧クウ拗ヌウ", "001112"],
    ["業者", "ぎょうしゃ", "⠘⠪⠒⠈⠱", "≧コウ拗サ", "00112"],
    ["社会", "しゃかい", "⠈⠱⠡⠃", "拗サカイ", "0112"],
    ["シューズ", "しゅーず", "⠈⠹⠒⠐⠹", "拗スウ濁ス", "02334"],
    ["将棋", "しょうぎ", "⠈⠺⠒⠐⠣", "拗スウ濁キ", "00112"],
    ["じゃんけん", "じゃんけん", "⠘⠱⠴⠫⠴", "≧サンケン", "02345"],
    ["ジュース", "じゅーす", "⠘⠹⠒⠹", "≧スウス", "0234"],
    ["情報", "じょうほう", "⠘⠺⠒⠮⠒", "≧ソウホウ", "00112"],
    ["お茶漬け", "おちゃづけ", "⠊⠈⠕⠐⠝⠫", "オ拗タ濁ツケ", "112234"],
    ["ジャンプ", "じゃんぷ", "⠘⠱⠴⠠⠭", "≧サン半フ", "02334"],
    ["中小企業", "ちゅうしょうきぎょう", "⠈⠝⠒⠈⠺⠒⠀⠣⠘⠪⠒", "拗ツウ拗ソウ　キ≧コウ", "00111223334"],
    ["チョコレート", "ちょこれーと", "⠈⠞⠪⠛⠒⠞", "拗トコレウト", "023456"],
    ["授業", "じゅぎょう", "⠘⠹⠘⠪⠒", "≧ス≧コウ", "01112"],
    ["チャンピオン", "ちゃんぴおん", "⠈⠕⠴⠠⠧⠊⠴", "拗タン半ヒオン", "0233456"],
    ["茶碗", "ちゃわん", "⠘⠕⠄⠴", "拗タワン", "0112"],
    ["中国", "ちゅうごく", "⠈⠝⠒⠐⠪⠩", "拗ツウ濁コク", "001112"],
    ["提灯", "ちょうちん", "⠘⠞⠒⠗⠴", "拗トウチン", "00112"],
    ["こんにゃく", "こんにゃく", "⠪⠴⠈⠅⠩", "コン拗ナク", "12245"],
    ["ニュース", "にゅーす", "⠈⠍⠒⠹", "拗ヌウス", "0234"],
    ["検尿", "けんにょう", "⠫⠴⠈⠎⠒", "ケン拗ノウ", "01112"],
    ["百貨店", "ひゃっかてん", "⠈⠥⠂⠡⠟⠴", "拗ハッカテン", "001223"],
    ["ヒューマン", "ひゅーまん", "⠈⠭⠒⠵⠴", "拗フウマン", "02345"],
    ["白夜", "びゃくや", "⠘⠥⠩⠌", "≧ハクヤ", "0112"],
    ["三百", "さんびゃく", "⠱⠴⠘⠥⠩", "サン≧ハク", "01112"],
    ["インタビュー", "いんたびゅー", "⠃⠴⠕⠘⠭⠒", "インタ≧フウ", "123356"],
    ["病院", "びょういん", "⠘⠮⠒⠃⠴", "≧ホウイン", "00112"],
    ["嘘八百", "うそはっぴゃく", "⠉⠺⠥⠂⠨⠥⠩", "ウソハッ▲ハク", "0112223"],
    ["コンピューター", "こんぴゅーたー", "⠪⠴⠨⠭⠒⠕⠒", "コン▲フウタウ", "1224567"],
    ["支払伝票", "しはらいでんぴょう", "⠳⠥⠑⠃⠀⠐⠟⠴⠨⠮⠒", "シハライ　濁テン▲ホウ", "01122223334"],
    ["アルプス山脈", "あるぷすさんみゃく", "⠁⠙⠠⠭⠹⠀⠱⠴⠈⠵⠩", "アル半フス　サン拗マク", "12234445556"],
    ["ミュージック", "みゅーじっく", "⠈⠽⠒⠐⠳⠂⠩", "拗ムウ濁シック", "0233456"],
    ["明星", "みょうじょう", "⠈⠾⠒⠘⠺⠒", "拗モウ≧ソウ", "001112"],
    ["戦略", "せんりゃく", "⠻⠴⠈⠑⠩", "セン拗ラク", "01112"],
    ["流星", "りゅうせい", "⠈⠙⠒⠻⠃", "拗ルウセイ", "00112"],
    ["材料", "ざいりょう", "⠐⠱⠃⠈⠚⠒", "濁サイ拗ロウ", "001112"],
    ["飲料", "いんりょう", "⠃⠴⠈⠚⠒", "イン拗ロウ", "01112"],
    ["圧力", "あつりょく", "⠁⠝⠈⠚⠩", "アツ拗ロク", "01112"],
  ],
  [
    // 4. 特殊音
    ["ヴァイオリン", "ばいおりん", "⠲⠥⠃⠊⠓⠴", "▽ハイオリン", "023456"],
    ["ジェノバ", "じぇのば", "⠘⠻⠎⠐⠥", "≧セノ濁ハ", "02334"],
    ["ファイル", "ふぁいる", "⠢⠥⠃⠙", "特ハイル", "0234"],
    ["イェロゾリムスキェ", "いぇろぞりむすきぇ", "⠈⠋⠚⠐⠺⠓⠽⠹⠈⠫", "拗エロ濁ソリムス拗ケ", "0233456778"],
    ["アルツィバーシェフ", "あるつぃばーしぇふ", "⠁⠙⠢⠗⠐⠥⠒⠈⠻⠭", "アル特チ濁ハウ拗セフ", "1224456689"],
    ["チェロ", "ちぇろ", "⠈⠟⠚", "拗テロ", "023"],
    ["ピニェイロ", "ぴにぇいろ", "⠠⠧⠈⠏⠃⠚", "半ヒ拗ネイロ", "011345"],
    ["ミッヒェルシュタット", "みっひぇるしゅたっと", "⠷⠂⠈⠯⠙⠈⠹⠕⠂⠞", "ミッ拗ヘル拗スタット", "022455779a"],
    ["ウィルス", "うぃるす", "⠢⠃⠙⠹", "特イルス", "0234"],
    ["アウェイ", "あうぇい", "⠁⠢⠋⠃", "ア特エイ", "1134"],
    ["ウォール", "うぉーる", "⠢⠊⠒⠙", "特オール", "0234"],
    ["クァルテット", "くぁるてっと", "⠢⠡⠙⠟⠂⠞", "特カルテット", "023356"],
    ["クィンテット", "くぃんてっと", "⠢⠣⠴⠟⠂⠞", "特キンテット", "023356"],
    ["クェスチョン", "くぇすちょん", "⠢⠫⠹⠈⠞⠴", "特ケス拗トン", "023356"],
    ["クォータリー", "くぉーたりー", "⠢⠪⠒⠕⠓⠒", "特コウタリウ", "023456"],
    ["グァテマラ", "ぐぁてまら", "⠲⠡⠟⠵⠑", "▽カテマラ", "02345"],
    ["ティツィアーノ", "てぃつぃあーの", "⠈⠗⠢⠗⠁⠒⠎", "拗チ特チアウノ", "0224567"],
    ["ハチャトゥリヤン", "はちゃとぅりやん", "⠥⠈⠕⠢⠝⠓⠌⠴", "ハ拗タ特ツリヤン", "11335678"],
    ["ヒンドゥー", "ひんどぅー", "⠧⠴⠲⠝⠒", "ヒン▽ツウ", "12245"],
    ["ヴィーナス", "びーなす", "⠲⠧⠒⠅⠹", "▽ヒウナス", "02345"],
    ["ヴェール", "べーる", "⠲⠯⠒⠙", "▽ヘウル", "0234"],
    ["ヴォルガ", "ぼるが", "⠲⠮⠙⠐⠡", "▽ホル濁カ", "02335"],
    ["テュニジア", "ちゅにじあ", "⠨⠝⠇⠐⠳⠁", "▲ツニ濁シア", "023345"],
    ["レヴュー", "れびゅー", "⠛⠸⠬⠒", "レ▼ユウ", "1134"],
    ["ディズニー", "でぃずにー", "⠘⠗⠐⠹⠇⠒", "≧チ濁スニウ", "022345"],
    ["ファイト", "ふぁいと", "⠢⠥⠃⠞", "特ハイト", "0234"],
    ["フィニッシュ", "ふぃにっしゅ", "⠢⠧⠇⠂⠈⠹", "特ヒニッ拗ス", "022446"],
    ["フェルト", "ふぇると", "⠢⠯⠙⠞", "特ヘルト", "0234"],
    ["フォーク", "ふぉーく", "⠢⠮⠒⠩", "特ホウク", "0234"],
    ["ジュスィ", "じゅすぃ", "⠘⠹⠈⠳", "≧ス拗シ", "0224"],
    ["アーティスト", "あーてぃすと", "⠁⠒⠈⠗⠹⠞", "アウ拗チスト", "122456"],
    ["アルトゥール", "あるとぅーる", "⠁⠙⠢⠝⠒⠙", "アル特ツウル", "122456"],
    ["ゲズィーラ", "げずぃーら", "⠐⠫⠘⠳⠒⠑", "濁ケ≧シウラ", "011345"],
    ["インスティテュート", "いんすてぃちゅーと", "⠃⠴⠹⠈⠗⠨⠝⠒⠞", "インス拗チ≧ツート", "123355789"],
    ["フューチャーズ", "ふゅーちゃーず", "⠨⠬⠒⠈⠕⠒⠐⠹", "≧ユウ拗タウ濁ス", "02335667"],
    ["デュエット", "でゅえっと", "⠸⠝⠋⠂⠞", "▼ツエット", "02345"],
  ],
  [
    // 5. 英語
    ["SDGs", "えすでーじーず", "⠰⠠⠠⠎⠙⠛⠰⠎", "外大S大D大Gs", "00012334"],
    ["Happy birthday", "はっぴー ばーすでい", "⠦⠠⠓⠁⠏⠏⠽⠀⠃⠊⠗⠞⠓⠙⠁⠽⠴", "〔大Happy　birthday〕", "00123456789abcdee"],
    ["Sony", "そにー", "⠦⠠⠎⠕⠝⠽⠴", "〔大Sony〕", "0012344"],
    ["Canon", "きゃのん", "⠦⠠⠉⠁⠝⠕⠝⠴", "〔大Canon〕", "00123455"],
    ["JAL", "じゃる", "⠰⠠⠠⠚⠁⠇", "外大大JAL", "000123"],
    ["TV", "てぃーびー", "⠰⠠⠠⠞⠧", "外大大TV", "00012"],
    ["PTA", "ぴーてぃえー", "⠰⠠⠠⠏⠞⠁", "外大大PTA", "000123"],
    ["OPEC", "おぺっく", "⠰⠠⠠⠕⠏⠑⠉", "外大大OPEC", "0001234"],
    ["NHK", "えぬえいちけい", "⠰⠠⠠⠝⠓⠅", "外大大NHK", "000123"],
    ["January", "じゃにゅありー", "⠦⠠⠚⠁⠝⠥⠁⠗⠽⠴", "〔大January〕", "0012345677"],
    ["February", "February", "⠦⠠⠋⠑⠃⠗⠥⠁⠗⠽⠴", "〔大February〕", "00123456788"],
    ["March", "まーち", "⠦⠠⠍⠁⠗⠉⠓⠴", "〔大March〕", "00123455"],
    ["April", "えいぷりる", "⠦⠠⠁⠏⠗⠊⠇⠴", "〔大April〕", "00123455"],
    ["May", "めい", "⠦⠠⠍⠁⠽⠴", "〔大May〕", "001233"],
    ["June", "じゅん", "⠦⠠⠚⠥⠇⠽⠴", "〔大June〕", "0012344"],
    ["July", "じゅらい", "⠦⠠⠚⠥⠇⠽⠴", "〔大July〕", "0012344"],
    ["August", "おーがすと", "⠦⠠⠁⠥⠛⠥⠎⠞⠴", "〔大August〕", "001234566"],
    ["September", "せぷてんばー", "⠦⠠⠎⠑⠏⠞⠑⠍⠃⠑⠗⠴", "〔大September〕", "001234567899"],
    ["October", "おくとーばー", "⠦⠠⠕⠉⠞⠕⠃⠑⠗⠴", "〔大October〕", "0012345677"],
    ["November", "のーべんばー", "⠦⠠⠝⠕⠧⠑⠍⠃⠑⠗⠴", "〔大November〕", "00123456788"],
    ["December", "でっせんばー", "⠦⠠⠙⠑⠉⠑⠍⠃⠑⠗⠴", "〔大December〕", "00123456788"],
    ["Helen Keller", "へれん けらー", "⠦⠠⠓⠑⠇⠑⠝⠀⠠⠅⠑⠇⠇⠑⠗⠴", "〔大Helen　大Keller〕", "001234566789abcc"],
    ["Louis Braille", "るいす ぶれいる", "⠦⠠⠇⠕⠥⠊⠎⠀⠠⠃⠗⠁⠊⠇⠇⠑⠴", "〔大Louis　大Braille〕", "001234566789abcdd"],
    ["Apple", "あっぷる", "⠦⠠⠁⠏⠏⠇⠑⠴", "〔大Apple〕", "00123455"],
    ["Orange", "おれんじ", "⠦⠠⠕⠗⠁⠝⠛⠑⠴", "〔大Orange〕", "001234566"],
    ["Peach", "ぴーち", "⠦⠠⠏⠑⠁⠉⠓⠴", "〔大Peach〕", "00123455"],
    ["Lemon", "れもん", "⠦⠠⠇⠑⠍⠕⠝⠴", "〔大Lemon〕", "00123455"],
    ["Kiwi", "きうい", "⠦⠠⠅⠊⠺⠊⠴", "〔大Kiwi〕", "001234"],
    ["Apricot", "あぷりこっと", "⠦⠠⠁⠏⠗⠊⠉⠕⠞⠴", "〔大Apricot〕", "0012345677"],
  ],
  [
    // 6. numbers
    ["3.14", "さんてんいちよん", "⠼⠉⠂⠁⠙", "数3.14", "01234"],
    ["0.02", "れいてんぜろに", "⠼⠚⠂⠚⠃", "数0.02", "01234"],
    ["9.5", "きゅうてんご", "⠼⠊⠂⠑", "数9.5", "0123"],
    ["475.5", "よんひゃくななじゅうごてんご", "⠼⠙⠛⠑⠂⠑", "数475.5", "012345"],
    ["183.8", "ひゃくはちじゅうさんてんはち", "⠼⠁⠓⠉⠂⠓", "数183.8", "01234"],
    ["52,760", "ごまんにせんななひゃくろくじゅう", "⠼⠑⠃⠄⠛⠋⠚", "数52,760", "0123456"],
    ["500", "ごひゃく", "⠼⠑⠚⠚", "数500", "0123"],
    ["9800", "きゅうせんはっぴゃく", "⠼⠊⠓⠚⠚", "数9800", "01234"],
    ["2023", "にせんにじゅうさん", "⠼⠃⠚⠃⠉", "数2023", "01234"],
    ["7000", "ななせん", "⠼⠛⠚⠚⠚", "数7000", "01234"],
    ["1,234,567", "ひゃくにじゅう３まんよんせんごひゃくろくじゅうなな", "⠼⠁⠄⠃⠉⠙⠄⠑⠋⠛", "数1,234,567", "0123456789"],
    ["756,439", "ななじゅうごまんろくせんよんひゃくさんじゅうきゅう", "⠼⠛⠑⠋⠄⠙⠉⠊", "数756,439", "01234567"],
    ["439,782", "よんじゅうさんまんきゅうせんななひゃくはちじゅうに", "⠼⠙⠉⠊⠄⠛⠓⠃", "数439,782", "01234567"],
    ["976,400", "きゅうじゅうななまんろくせんよんひゃく", "⠼⠊⠛⠋⠄⠙⠚⠚", "数976,400", "01234567"],
    ["823,105", "はちじゅうにまんさんぜんひゃくご", "⠼⠓⠃⠉⠄⠁⠚⠑", "数823,105", "01234567"],
    ["七五三", "しちごさん", "⠼⠛⠼⠑⠼⠉", "数7数5数3", "011223"],
    ["五七五", "ごしちご", "⠼⠑⠼⠛⠼⠑", "数5数7数5", "011223"],
    ["7,309,241,856", "ななじゅうさんおくきゅうひゃくにじゅうよんまんいっせんはっぴゃくごじゅうろく", "⠼⠛⠄⠉⠚⠊⠄⠃⠙⠁⠄⠓⠑⠋", "数7,309,241,856", "0123456789abcd"],
  ],
  [
    // 7. すべて混在
    ["PTA会長", "ぴーてぃえーかいちょう", "⠰⠠⠠⠏⠞⠁⠀⠡⠃⠈⠞⠒", "外大大PTA　カイ拗トウ", "000123334445"],
    ["学校へ行く", "がっこうへいく", "⠐⠡⠂⠪⠒⠋⠀⠃⠩", "濁カッコウエ　イク", "001123345"],
    ["2億年", "におくねん", "⠼⠃⠤⠊⠩⠏⠴", "数2継オクネン", "0111223"],
    ["3LDK", "さんえるでぃーけー", "⠼⠉⠰⠠⠠⠇⠙⠅", "数3外大大LDK", "01111234"],
    ["四角形", "しかっけい", "⠼⠙⠡⠩⠫⠃", "数4カクケイ", "011223"],
    ["１列", "いちれつ", "⠼⠁⠤⠛⠝", "数1継レツ", "01112"],
    ["１枚", "いちまい", "⠼⠁⠵⠃", "数1マイ", "0112"],
    ["１０数人", "じゅうすうにん", "⠼⠁⠚⠹⠒⠇⠴", "数10スウニン", "0122334"],
    ["JAL72便", "じゃるななじゅうにびん", "⠰⠠⠠⠚⠁⠇⠀⠼⠛⠃⠐⠧⠴", "外大大JAL　数72濁ヒン", "0001233345556"],
    ["CD-ROM", "しーでぃーろむ", "⠰⠠⠠⠉⠙⠤⠰⠠⠠⠗⠕⠍", "外大大CD-外大大ROM", "000123333456"],
    ["390-0802", "390-0802", "⠼⠉⠊⠚⠎⠀⠼⠚⠓⠚⠃", "数390ノ　数0802", "01234445678"],
    ["100円玉", "ひゃくえんだま", "⠼⠁⠚⠚⠤⠋⠴⠐⠕⠵", "数100継エン濁タマ", "0123334456"],
    ["X線", "えっくすせん", "⠰⠠⠭⠤⠻⠴", "外大X継セン", "001112"],
    ["ビタミンB2", "びたみんびーつー", "⠐⠧⠕⠷⠴⠀⠰⠠⠃⠼⠃", "濁ヒタミン　外大B数2", "01234444556"],
    ["県立美術館", "けんりつびじゅつかん", "⠫⠴⠓⠝⠀⠐⠧⠘⠹⠝⠡⠴", "ケンリツ　濁ヒ≧スツカン", "011222333445"],
    ["令和５年", "れいわごねん", "⠛⠃⠄⠼⠑⠏⠴", "レイワ数5ネン", "0122334"],
    ["零下７度", "れいかななど", "⠛⠃⠡⠼⠛⠐⠞", "レイカ数7濁ト", "0122334"],
    ["一輪車", "いちりんしゃ", "⠼⠁⠤⠓⠴⠈⠱", "数1継リン拗サ", "0111223"],
    ["50円", "ごじゅうえん", "⠼⠑⠚⠤⠋⠴", "数50継エン", "012223"],
    ["フォーラム in 京都", "ふぉーらむいんきょうと", "⠢⠮⠒⠑⠽⠀⠦⠊⠝⠴⠀⠈⠪⠒⠞", "特ホウラム　〔in〕　拗コウト", "023456667888889a"],
    ["Gift券", "ぎふとけん", "⠦⠠⠛⠊⠋⠞⠴⠤⠫⠴", "〔大gift〕継ケン", "0012344445"],
    ["赤Wine", "あかわいん", "⠁⠡⠦⠠⠺⠊⠝⠑⠴", "アカ〔大wine〕", "011123455"],
  ],
];

// 初級コース課題リスト
var beginners_task_list_jp = [
  "こんにちは [コンニチワ]",
  "あるいは [アルイワ]",
  "私は [ワタシワ]",
  "駅へは [エキエワ]",
  "空気 [クーキ]",
  "夕日 [ユーヒ]",
  "会う [アウ]",
  "買う [カウ]",
  "1 [数1]",
  "23 [数23]",
  "500 [数500]",
  "2023 [数2023]",
  "10500 [数1マン 数500]",
  "53,000 [数53,000]",
  "3.14 [数3.14]",
  "１列 [数1継レツ]",
  "2億年 [数2継オクネン]",
  "あいうえお",
  "かきくけこ",
  "さしすせそ",
  "たちつてと",
  "なにぬねの",
  "はひふへほ",
  "まみむめも",
  "やゆよ",
  "らりるれろ",
  "わゐゑをん",
  "あかさたなはまやらわ",
  "1234567890",
  "0987654321",
  "abcdefg",
  "hijklmn",
  "opqrstu",
  "vwxyz",
  "ABCDEFG",
  "HIJKLMN",
  "OPQRSTU",
  "VWXYZ",
];

var beginners_task_list_braille = [
  "⠪⠴⠇⠗⠄",
  "⠁⠙⠃⠄",
  "⠄⠕⠳⠄",
  "⠋⠣⠋⠄",
  "⠩⠒⠣",
  "⠬⠒⠧",
  "⠁⠉",
  "⠡⠉",
  "⠼⠁",
  "⠼⠃⠉",
  "⠼⠑⠚⠚",
  "⠼⠃⠚⠃⠉",
  "⠼⠁⠵⠴⠀⠼⠑⠚⠚",
  "⠼⠑⠉⠄⠚⠚⠚",
  "⠼⠉⠂⠁⠙",
  "⠼⠁⠤⠛⠝",
  "⠼⠃⠤⠊⠩⠏⠴",
  "⠁⠃⠉⠋⠊",
  "⠡⠣⠩⠫⠪",
  "⠱⠳⠹⠻⠺",
  "⠕⠗⠝⠟⠞",
  "⠅⠇⠍⠏⠎",
  "⠥⠧⠭⠯⠮",
  "⠵⠷⠽⠿⠾",
  "⠌⠬⠜",
  "⠑⠓⠙⠛⠚",
  "⠄⠆⠖⠔⠴",
  "⠁⠡⠱⠕⠅⠥⠵⠌⠑⠄",
  "⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚",
  "⠼⠚⠊⠓⠛⠋⠑⠙⠉⠃⠁",
  "⠰⠁⠃⠉⠙⠑⠋⠛",
  "⠰⠓⠊⠚⠅⠇⠍⠝",
  "⠰⠕⠏⠟⠗⠎⠞⠥",
  "⠰⠧⠺⠭⠽⠵",
  "⠰⠠⠠⠁⠃⠉⠙⠑⠋⠛",
  "⠰⠠⠠⠓⠊⠚⠅⠇⠍⠝",
  "⠰⠠⠠⠕⠏⠟⠗⠎⠞⠥",
  "⠰⠠⠠⠧⠺⠭⠽⠵",
];

// 中級コース課題リスト
var intermediate_task_list_jp = ["５０円", "４６万", "1,000,000", "793.4", "２，３時間", "東京", "長野高専", "母へのみやげ [ハハエノ　ミヤゲ]", "連絡先090-8000-7603 [レンラクサキ 数090継数8000継数7603]"];
var intermediate_task_list_braille = ["⠼⠑⠚⠤⠋⠴", "⠼⠙⠋⠵⠴", "⠼⠁⠄⠚⠚⠚⠄⠚⠚⠚", "⠼⠛⠊⠉⠂⠙", "⠼⠃⠼⠉⠐⠳⠡⠴", "⠞⠒⠈⠪⠒", "⠅⠐⠡⠎⠀⠪⠒⠻⠴", "⠥⠥⠋⠎⠀⠷⠌⠐⠫", "⠛⠴⠑⠩⠱⠣⠀⠼⠚⠊⠚⠤⠼⠓⠚⠚⠚⠤⠼⠛⠋⠚⠉"];
// 上級コース課題リスト
var advanced_task_list_jp = ["５０円", "４６万", "1,000,000", "793.4", "２，３時間", "長野市徳間716", "PTA会長"];
var advanced_task_list_braille = ["⠼⠑⠚⠤⠋⠴", "⠼⠙⠋⠵⠴", "⠼⠁⠄⠚⠚⠚⠄⠚⠚⠚", "⠼⠛⠊⠉⠂⠙", "⠼⠃⠼⠉⠐⠳⠡⠴", "⠅⠐⠡⠎⠳⠀⠞⠩⠵⠀⠼⠛⠁⠋", "⠰⠠⠠⠏⠞⠁⠀⠡⠃⠈⠞⠒"];
// ロケール
const locale_en = {
  main_title: "Braille Typing Exercises",
  main_btnFree: "Free Typing",
  main_btnGame: "Typing Game",
  free_title: "Free Typing",
  free_btnBack: "Back",
  game_btnCancel: "×",
  finish_btnRetry: "Retry",
  finish_btnBack: "Back",
};

const locale_ja = {
  main_title: "点字タイピング練習",
  main_btnFree: "入力練習(e)",
  main_btnGame: "ゲーム(g)",
  free_title: "入力練習",
  free_btnBack: "戻る(b)",
  game_btnCancel: "×",
  finish_btnRetry: "もう一回(r)",
  finish_btnBack: "メニューへ(m)",
};

// 効果音
const soundEffect = {
  standard: { incorrect: "mistakeaudio", correct: "correctaudio", clear: "clearaudio", skip: "skipaudio" },
  cute: { incorrect: "cute_mistakeaudio", correct: "cute_correctaudio", clear: "cute_clearaudio", skip: "cute_skipaudio" },
  support: { incorrect: "support_mistakeaudio", correct: "support_correctaudio", clear: "support_clearaudio", skip: "support_skipaudio" },
  cyber: { incorrect: "cyber_mistakeaudio", correct: "cyber_correctaudio", clear: "cyber_clearaudio", skip: "cyber_skipaudio" },
};

// ボタンの座標
const square_freeTyping = {
  x: 100,
  y: 500,
  w: 250,
  h: 50,
};

const square_typingGame = {
  x: 450,
  y: 500,
  w: 250,
  h: 50,
};

const square_freeBack = {
  x: 600,
  y: 40,
  w: 150,
  h: 50,
};

const square_gameCancel = {
  x: 10,
  y: 10,
  w: 30,
  h: 30,
};

const square_finishRetry = {
  x: 275,
  y: 400,
  w: 250,
  h: 50,
};

const square_finishBack = {
  x: 275,
  y: 460,
  w: 250,
  h: 50,
};

const colorPalette = {
  gray1: "#F7F9F9",
  gray2: "#DEE3E6",
  gray3: "#B5BAC2",
  gray4: "#717A84",
  gray5: "#333333",
  red1: "#FC8E9A",
  red2: "#FF5569",
  yellow1: "#FFFF77",
  yellow2: "#FFFF00",
};

const screenName = {
  menu: "0",
  free: "1",
  game1: "2",
  game2: "3",
  finish: "4",
};

// グローバル変数
const free_maxchar = 17;
const min_moveX = 110;
const min_moveY = 150;
const max_moveX = 650;
const max_moveY = 530;
const center_moveX = 380;
const uttr = new SpeechSynthesisUtterance("");
var animaid;
let voiceSwitch;
let lowVision;
let timeToNextBraille = 0;
let brailleInterval = 3000;
let maxTime = 60;
let taskNum = 0;
let speechVoice;
let speechName;
let soundEffectName = 0;
let observer;
let lastTime = 0;
var image_perkins_brailler = new Image();
var image_brailler_paper = new Image();
var image_brick = new Image();
var current_screen;
var readytime = 3;
var course;
var score;
var correct, incorrect;
var skipped;
var cursor_position = 0;
var abcPos = 0;
var braille_char;
var random;
var current_typing_mode;
var inEnglish = false;
var inKakomis = new Array(8); // 0:（, 1:〈, 2:《, 3:「, 4:【, 5:『, 6:｛, 7:［
var is_top = true;
var is_hint;
var time_remaining;
var readytimer;
var gametimer;
var key_state = new Array();
var key_buf = new Array();
var dot = new Array();
var log_typing_mode = new Array();
var log_kakomi = new Array(18);
var log_input = new Array();
var log_character = new Array();
var memo_braille = Array();
var memo_jp = Array();
var braille_lines = Array();
var explosions = Array();
var memo_line;
var context, context_width, context_height;
var isGaming = false;

// ゲームで動いている点字を表現するクラス
// update()で位置を設定し、draw()で描画している
var BrailleLine = class {
  constructor(braille, x, y, dx, dy, timestamp) {
    this.braille = braille;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.angle = 0;
    this.timestamp = timestamp;
    this.before = true;
    this.clearUp = false;
    this.outside = false;
    this.normal = true;
    this.open = false;
    this.close = false;
    this.wallPass = false;
    if (lowVision) {
      this.clearColor = colorPalette.yellow2;
      this.defaultColor = "white";
    } else {
      this.clearColor = colorPalette.red1;
      this.defaultColor = colorPalette.gray4;
    }
  }
  draw() {
    if (this.normal) {
      if (this.clearUp) {
        putBrailleNormal(this.braille, this.x, this.y, this.clearColor);
      } else {
        putBrailleNormal(this.braille, this.x, this.y, this.defaultColor);
      }
    } else if (this.open) {
      if (this.clearUp) {
        putBrailleRotate(this.braille, this.x, this.y, this.angle, this.clearColor);
      } else {
        putBrailleRotate(this.braille, this.x, this.y, this.angle, this.defaultColor);
      }
    } else if (this.close) {
      if (this.clearUp) {
        putBrailleRotate(this.braille, this.x, this.y, this.angle, this.clearColor);
      } else {
        putBrailleRotate(this.braille, this.x, this.y, this.angle, this.defaultColor);
      }
    } else {
      if (this.clearUp) {
        putBrailleHorizontal(this.braille, this.x, this.y, this.clearColor);
      } else {
        putBrailleHorizontal(this.braille, this.x, this.y, this.defaultColor);
      }
    }
  }
  update(timestamp) {
    if (time_remaining > 0) {
      if (this.x === max_moveX) {
        if (this.y > min_moveY) {
          if (this.y < 320) {
            this.normal = false;
            this.open = true;
            this.angle += 2;
            if (this.angle > 90) {
              this.normal = false;
              this.open = false;
              this.angle = 90;
            }
            this.y -= this.dy * 3;
          } else {
            this.y -= this.dy * 3;
          }
        } else {
          this.x -= this.dx;
          this.normal = false;
        }
      } else {
        if (this.x > center_moveX && this.x < max_moveX) {
          this.x -= this.dx;
        } else if (this.x === center_moveX) {
          if (this.y < max_moveY) {
            this.y += this.dy;
          } else if (this.y === max_moveY) {
            if (this.clearUp) {
              this.x -= this.dx;
              this.normal = false;
              this.open = false;
              this.close = false;
            } else {
              skipped++;
              if (soundEffectName != "none") {
                document.getElementById(soundEffect[soundEffectName]["skip"]).play();
              }
              //cursor_position = abcPos;
              this.outside = true;
              //cancelAnimationFrame(animaid);
            }
          }
        } else {
          if (this.x > min_moveX) {
            this.x -= this.dx;
            this.timestamp = timestamp;
          } else {
            this.wallPass = true;
            if (this.y > min_moveY) {
              if (this.y < 370) {
                this.normal = false;
                this.open = false;
                this.close = true;
                this.angle -= 2;
                if (this.angle < 0) {
                  this.normal = true;
                  this.close = false;
                }
                this.y -= this.dy * 3;
              } else {
                this.y -= this.dy * 3;
              }
            } else {
              this.outside = true;
            }
          }
        }
      }
    }
  }
  setClearUp() {
    this.clearUp = true;
  }
};

// 入力課題が達成できなかった時に表示する煙を表現するクラス
// smoke.pngに5コマの絵があり、0.2秒お気に切り替えて表示している。
// update()でコマを移動し、draw()で描画
var Explosion = class {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "smoke.png";
    this.sw = 200;
    this.sh = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.smoke = true;
  }
  draw() {
    if (this.smoke) {
      context.drawImage(this.image, this.frame * this.sw, 0, this.sw, this.sh, this.x, this.y, this.size, this.size);
    }
  }
  update(deltatime) {
    this.timeSinceLastFrame += deltatime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.smoke = false;
    }
  }
};

// ページが読み込まれた時に最初に実行される
// 画像データを最初に読み込んでおくことで描画がスムーズになる
window.onload = function () {
  // キャンバスのコンテキストを作成
  var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  context_width = context.canvas.clientWidth;
  context_height = context.canvas.clientHeight;

  // ゲーム設定の音声一覧HTMLを作成
  if (window.speechSynthesis) {
    let voices = [];
    let voice = document.getElementById("voice");
    function setVoices() {
      if (voices.length) return;
      voices = speechSynthesis.getVoices();
      if (!voices.length) return;
      voices
        .filter((v) => v.lang.startsWith("ja"))
        .forEach((v) => {
          let opt = document.createElement("option");
          opt.text = v.name;
          opt.voice = v;
          voice.appendChild(opt);
        });
    }
    speechSynthesis.addEventListener("voiceschanged", setVoices);
    setVoices();
  }

  // 画像のデータを事前に読み込む
  image_brailler_paper.src = "brailler_paper.png";
  image_brick.src = "brick.jpg";

  //canvas.addEventListener('mouseover', onMouseOver, false);
  //canvas.addEventListener('mouseout', onMouseOut, false);

  // 設定が変更された場合のイベントリスナーを登録
  var elm = document.getElementById("voice");
  elm.addEventListener("change", setCookies);
  elm = document.getElementById("voiceSwitch");
  elm.addEventListener("change", setCookies);
  elm = document.getElementById("taskList");
  elm.addEventListener("change", setCookies);
  elm = document.getElementById("soundEffect");
  elm.addEventListener("change", setCookies);
  var interval_radios = document.getElementsByName("braille_interval");
  for (let i = 0; i < interval_radios.length; i++) {
    interval_radios[i].addEventListener("change", setCookies);
  }
  var maxtime_radios = document.getElementsByName("game_time");
  for (let i = 0; i < maxtime_radios.length; i++) {
    maxtime_radios[i].addEventListener("change", setCookies);
  }
  elm = document.getElementById("lowVision");
  elm.addEventListener("change", setCookiesReload);

  // 設定の「音声」は、画面ロード時に動的に作成しているため
  // 画面ロード時に読み込んだCookieの値をセットできない。
  // そこで、音声の選択肢(SELECT)の変更を監視し、変更されたら
  // Cookieから読み込んだ値をセットするようにしている。
  const selectVoice = document.getElementById("voice");
  const config = { childList: true };

  // 変更されたときに実行されるコールバック関数
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (let i = 0; i < selectVoice.options.length; i++) {
          if (speechName === selectVoice.options[i].value) {
            selectVoice.options[i].selected = true;
            break;
          }
        }
      }
    }
  };

  // コールバック関数に結びつけられたオブザーバーのインスタンスを生成
  observer = new MutationObserver(callback);

  // 変更の監視を開始
  observer.observe(selectVoice, config);

  // Cookieから設定値を取得する
  getCookies();

  main();
};

// Cookieから設定を読み込み、HTMLに反映する
function getCookies() {
  // cookieからの読み込み
  let cookies = document.cookie;
  let array = cookies.split(";");
  for (var i = 0; i < array.length; i++) {
    var content = array[i].split("=");
    if (content[0].trim() === "lowVision") {
      if (content[1] == "true") {
        lowVision = true;
      } else {
        lowVision = false;
      }
    } else if (content[0].trim() === "voiceSwitch") {
      if (content[1] == "true") {
        voiceSwitch = true;
      } else {
        voiceSwitch = false;
      }
    } else if (content[0].trim() === "voice") {
      speechName = decodeURIComponent(content[1]);
    } else if (content[0].trim() === "brailleInterval") {
      brailleInterval = Number(content[1]);
    } else if (content[0].trim() === "maxTime") {
      maxTime = Number(content[1]);
    } else if (content[0].trim() === "taskList") {
      taskNum = Number(content[1]);
    } else if (content[0].trim() === "soundEffect") {
      soundEffectName = content[1];
    }
  }
  // HTMLへの反映（音声はコールバック関数で反映）
  document.getElementById("lowVision").checked = lowVision;
  document.getElementById("voiceSwitch").checked = voiceSwitch;
  var radio_intervals = document.getElementsByName("braille_interval");
  for (let i = 0; i < radio_intervals.length; i++) {
    if (brailleInterval == radio_intervals[i].value) {
      radio_intervals[i].checked = true;
      break;
    }
  }
  var radio_gametimes = document.getElementsByName("game_time");
  for (let i = 0; i < radio_gametimes.length; i++) {
    if (maxTime == radio_gametimes[i].value) {
      radio_gametimes[i].checked = true;
      break;
    }
  }
  var select_task = document.getElementById("taskList");
  for (let i = 0; i < select_task.options.length; i++) {
    if (taskNum == select_task.options[i].value) {
      select_task.options[i].selected = true;
      break;
    }
  }
  var effect = document.getElementById("soundEffect");
  for (let i = 0; i < effect.options.length; i++) {
    if (soundEffectName == effect.options[i].value) {
      effect.options[i].selected = true;
      break;
    }
  }
}

// 設定値をCookieに保存する
function setCookies() {
  getSettings();
  if (navigator.cookieEnabled) {
    document.cookie = "voiceSwitch=" + encodeURIComponent(voiceSwitch);
    document.cookie = "voice=" + encodeURIComponent(speechName);
    document.cookie = "lowVision=" + encodeURIComponent(lowVision);
    document.cookie = "brailleInterval=" + encodeURIComponent(brailleInterval);
    document.cookie = "maxTime=" + encodeURIComponent(maxTime);
    document.cookie = "taskList=" + encodeURIComponent(taskNum);
    document.cookie = "soundEffect=" + encodeURIComponent(soundEffectName);
  }
}

// ロービジョンモードが変更された場合だけリロードする関数
function setCookiesReload() {
  if (navigator.cookieEnabled) {
    lowVision = document.getElementById("lowVision").checked;
    document.cookie = "lowVision=" + encodeURIComponent(lowVision);
  }
  window.location.reload();
}

// メイン画面（トップメニュー）の表示
function main() {
  current_screen = screenName.menu;
  isGaming = false;
  clearAll();

  // タイトル表示
  context.font = 'bold 32pt "メイリオ"';
  if (lowVision) {
    context.fillStyle = "white";
  } else {
    context.fillStyle = colorPalette.gray4;
  }
  var title = locale_ja.main_title;
  var tw = context.measureText(title).width;
  context.fillText(title, context_width / 2 - tw / 2, 80);

  // 点字タイプライター画像表示
  image_perkins_brailler.src = "perkins_brailler.png";
  image_perkins_brailler.onload = () => {
    context.drawImage(image_perkins_brailler, context_width / 2 - 464 / 2, context_height / 2 - 328 / 2, 464, 328);
  };

  // ボタン表示（フリー入力）
  if (lowVision) {
    drawButton(square_freeTyping, locale_ja.main_btnFree, colorPalette.yellow2, "black");
  } else {
    drawButton(square_freeTyping, locale_ja.main_btnFree, colorPalette.red2, "white");
  }

  // ボタン表示（ゲーム）
  if (lowVision) {
    drawButton(square_typingGame, locale_ja.main_btnGame, "white", "black");
  } else {
    drawButton(square_typingGame, locale_ja.main_btnGame, colorPalette.gray2, colorPalette.gray4);
  }

  // 著作権表示
  showCopyright();

  // キャンバスの背景色設定
  var canvas = document.getElementById("canvas");
  if (lowVision) {
    canvas.style.backgroundColor = "#000000";
  } else {
    canvas.style.backgroundColor = "#FFFFFF";
  }

  // スタイルシートとBootstrapのダークモードを動的に変更
  var html = document.getElementsByTagName("html");
  var elem = document.getElementById("style_sheet");
  if (lowVision) {
    html[0].dataset["bsTheme"] = "dark";
    elem.href = "style_dark.css";
  } else {
    html[0].dataset["bsTheme"] = "light";
    elem.href = "style.css";
  }

  // マウスクリックのイベントハンドラー登録
  canvas.addEventListener("click", onClick, false);
}

// ボタン表示関数
function drawButton(square, name, bg_color, text_color) {
  context.fillStyle = bg_color;
  context.strokeStyle = bg_color;
  fillRoundRect(context, square.x, square.y, square.w, square.h, square.h / 2);
  context.font = 'bold 16pt "メイリオ"';
  context.fillStyle = text_color;
  var tw = context.measureText(name).width;
  var th = context.measureText(name).actualBoundingBoxAscent + context.measureText(name).actualBoundingBoxDescent;
  context.fillText(name, square.x + square.w / 2 - tw / 2, square.y + (square.h - th) / 2 + th);
}

function onClick(e) {
  var canvas = document.getElementById("canvas");
  const rect = canvas.getBoundingClientRect();
  const point = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };

  const hit_freeTyping = square_freeTyping.x <= point.x && point.x <= square_freeTyping.x + square_freeTyping.w && square_freeTyping.y <= point.y && point.y <= square_freeTyping.y + square_freeTyping.h;
  const hit_typingGame = square_typingGame.x <= point.x && point.x <= square_typingGame.x + square_typingGame.w && square_typingGame.y <= point.y && point.y <= square_typingGame.y + square_typingGame.h;
  const hit_freeBack = square_freeBack.x <= point.x && point.x <= square_freeBack.x + square_freeBack.w && square_freeBack.y <= point.y && point.y <= square_freeBack.y + square_freeBack.h;
  const hit_gameCancel = square_gameCancel.x <= point.x && point.x <= square_gameCancel.x + square_gameCancel.w && square_gameCancel.y <= point.y && point.y <= square_gameCancel.y + square_gameCancel.h;
  const hit_finishRetry = square_finishRetry.x <= point.x && point.x <= square_finishRetry.x + square_finishRetry.w && square_finishRetry.y <= point.y && point.y <= square_finishRetry.y + square_finishRetry.h;
  const hit_finishBack = square_finishBack.x <= point.x && point.x <= square_finishBack.x + square_finishBack.w && square_finishBack.y <= point.y && point.y <= square_finishBack.y + square_finishBack.h;
  if (hit_freeTyping && current_screen == screenName.menu) {
    course = 0;
    is_hint = false;
    freeTypingStart();
  }
  if ((hit_typingGame && current_screen == screenName.menu) || (hit_finishRetry && current_screen == screenName.finish)) {
    course = 1;
    is_hint = true;
    lessonStart();
  }
  if (hit_freeBack && current_screen == screenName.free) {
    main();
  }
  if (hit_finishBack && current_screen == screenName.finish) {
    main();
  }
  if (hit_gameCancel && current_screen == screenName.game1) {
    document.getElementById("cancelaudio").play();
    clearInterval(gametimer);
    cancelAnimationFrame(animaid);
    gameEndProcessing();
    main();
  }
}

//function onMouseMove(e) { }
function freeTypingStart() {
  current_screen = screenName.free;
  current_typing_mode = "japanese_characters";
  memo_line = 0;
  cursor_position = 0;
  is_top = true;
  inEnglish = false;
  for (var i = 0; i < log_kakomi.length; i++) {
    log_kakomi[i] = new Array(8);
    for (var j = 0; j < 8; j++) {
      log_kakomi[i][j] = false;
    }
  }
  for (var i = 0; i < inKakomis.length; i++) {
    inKakomis[i] = false;
  }
  observer.disconnect();
  clearAll();
  clearKeyState();
  getSettings();
  setSpeech();
  drawVirtualBraille();
}

function drawVirtualBraille() {
  // キャンバスの背景色設定
  var canvas = document.getElementById("canvas");
  if (lowVision) {
    canvas.style.backgroundColor = "#000000";
  } else {
    canvas.style.backgroundColor = "#FFFFFF";
  }

  // 画面タイトル表示
  context.font = 'bold 32pt "メイリオ"';
  if (lowVision) {
    context.fillStyle = "white";
  } else {
    context.fillStyle = colorPalette.gray4;
  }
  var title = locale_ja.free_title;
  var tw = context.measureText(title).width;
  context.fillText(title, context_width / 2 - tw / 2, 80);

  // 点字タイプライター画像表示
  context.drawImage(image_brailler_paper, 10, 100, context_width - 20, 290);

  // 戻るボタン表示
  if (lowVision) {
    drawButton(square_freeBack, locale_ja.free_btnBack, "white", "black");
  } else {
    drawButton(square_freeBack, locale_ja.free_btnBack, colorPalette.gray2, colorPalette.gray4);
  }

  // 入力領域の下線を表示
  context.lineWidth = 2;
  drawLine(context, 60, context_height - 140, context_width - 60, context_height - 140, 3, colorPalette.gray3);

  // カーソル表示
  showCursor();

  // 入力符号を示すフッターを表示
  showFooter();

  // 著作権を表示
  showCopyright();
}

function lessonStart() {
  isGaming = true;
  observer.disconnect();
  clearAll();
  clearKeyState();
  getSettings();
  if (soundEffectName != "none") {
    document.getElementById("areyoureadyaudio").play();
  }
  time_remaining = maxTime;
  readytime = 3;
  readytimer = setInterval(function () {
    countdown123();
  }, 1000);
}

function countdown123() {
  if (soundEffectName != "none") {
    document.getElementById("countdownaudio").play();
  }
  clearAll();
  //drawFrame();
  context.font = 'bold 48pt "メイリオ"';
  if (lowVision) {
    context.fillStyle = "white";
  } else {
    context.fillStyle = colorPalette.gray4;
  }
  context.fillText(readytime, context.canvas.clientWidth / 2 - 24, context.canvas.clientHeight / 2 + 24);
  readytime--;
  if (readytime < 0) {
    clearAll();
    clearInterval(readytimer);
    gameStart();
  }
}

function gameStart() {
  current_screen = screenName.game1;
  score = 0.0;
  incorrect = 0;
  correct = 0;
  skipped = 0;
  //showProgress();
  //putScore();
  if (current_screen == screenName.game1) showABC();
  if (current_screen == screenName.game2) showTask();
  gametimer = setInterval(function () {
    countdownTimer();
  }, 1000);
}

function countdownTimer() {
  //showProgress();
  //putScore();
  time_remaining--;
  if (time_remaining <= 0) {
    clearInterval(gametimer);
    finish();
  }
}

function putScore() {
  // スコアを計算
  if (correct == 0 && incorrect == 0) {
    score = 0;
  } else {
    score = Math.floor(Math.pow(correct, 2) * Math.pow(correct / (correct + incorrect + skipped), 5));
  }
  //context.clearRect(context_width - 150, 10, 147, 30);
  // スコア表示領域描画
  if (lowVision) {
    context.fillStyle = "rgba(0, 0, 0, 0.8)";
    context.strokeStyle = "rgba(0, 0, 0, 0.8)";
  } else {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  }
  fillRoundRect(context, context_width - 160, 10, 150, 30, 5);
  // スコアを表示
  context.font = 'normal 12pt "メイリオ"';
  context.fillStyle = "white";
  context.fillText("スコア : " + score + "点", context.canvas.clientWidth - 150, 30);
}

function showProgress() {
  if (lowVision) {
    context.fillStyle = "rgba(0, 0, 0, 0.8)";
    context.strokeStyle = "rgba(0, 0, 0, 0.8)";
  } else {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  }
  fillRoundRect(context, 110, 10, 500, 30, 5);
  var w = 400;
  var h = 20;
  var x = context_width / 2 - w / 2;
  var y = 15;
  var rate = time_remaining / maxTime;
  context.fillStyle = colorPalette.gray1;
  context.fillRect(x, y, w, h);
  if (time_remaining >= 30) {
    context.fillStyle = colorPalette.gray3;
  } else if (time_remaining < 10) {
    if (lowVision) {
      context.fillStyle = colorPalette.yellow2;
    } else {
      context.fillStyle = colorPalette.red2;
    }
  } else {
    if (lowVision) {
      context.fillStyle = colorPalette.yellow1;
    } else {
      context.fillStyle = colorPalette.red1;
    }
  }
  context.fillRect(x, y, w * rate, h);
  context.font = 'normal 16pt "メイリオ"';
  context.fillStyle = "white";
  context.fillText("⏱", 120, 32);
  context.font = 'normal 12pt "メイリオ"';
  var m = Math.floor(time_remaining / 60);
  var remainder = time_remaining % 60;
  var str = m + ":" + remainder.toString().padStart(2, "0");
  var sw = context.measureText(str).width;
  context.fillText(str, 188 - sw, 32);
}

function drawFrame() {
  context.strokeStyle = colorPalette.gray3;
  context.lineWidth = 3;
  strokeRoundRect(context, 0, 0, context_width, context_height, 10);
}

function showABC() {
  current_typing_mode = "japanese_characters";
  clearBody();
  setSpeech();
  if (voiceSwitch) {
    // 練習テーマの読み上げ
    Speech(task_theme[taskNum]);
  }
  setAbcTask();
  brailleDownMove(0);
}

function getSettings() {
  // 音声読み上げする or しない
  voiceSwitch = document.getElementById("voiceSwitch").checked;
  // 読み上げ音声を取得
  var voice = document.getElementById("voice");
  var opt = voice.selectedOptions;
  speechVoice = opt[0].voice;
  speechName = opt[0].value;
  // ダークモード：弱視（ロービジョン）の方向け
  lowVision = document.getElementById("lowVision").checked;
  // ゲーム設定の点字表示間隔を取得
  var radio_intervals = document.getElementsByName("braille_interval");
  for (var i = 0; i < radio_intervals.length; i++) {
    if (radio_intervals[i].checked) {
      brailleInterval = radio_intervals[i].value;
      break;
    }
  }
  // ゲーム時間を取得
  var radio_maxtimes = document.getElementsByName("game_time");
  for (var i = 0; i < radio_maxtimes.length; i++) {
    if (radio_maxtimes[i].checked) {
      maxTime = radio_maxtimes[i].value;
      break;
    }
  }
  // 練習タスクを取得
  var select_task = document.getElementById("taskList");
  var num = select_task.selectedIndex;
  taskNum = select_task.options[num].value;
  // 効果音を取得
  var effect = document.getElementById("soundEffect");
  num = effect.selectedIndex;
  soundEffectName = effect.options[num].value;
}

function setAbcTask() {
  // ランダム数
  random = Math.floor(Math.random() * down_task_list[taskNum].length);
  //console.log("setAbcTask => random:" + random + ", task:" + down_task_list[taskNum][random][0]);
  cursor_position = 0;
  abcPos = 0;
  for (var i = 0; i < down_task_list[taskNum][random][2].length; i++) {
    var b = down_task_list[taskNum][random][2].charAt(i);
    braille_lines.push(new BrailleLine(b, 650, 450, 10, 1, 0));
  }
  // 問題の読み上げ
  if (voiceSwitch) {
    SpeechNotCancel(down_task_list[taskNum][random][1]);
  }
}

function drawBackground() {
  // レンガ壁の画像を描画
  context.drawImage(image_brick, 0, 0, context_width, context_height);

  // キャンセルボタン表示
  if (lowVision) {
    drawButton(square_gameCancel, locale_ja.game_btnCancel, "rgba(0, 0, 0, 0.8)", "white");
  } else {
    drawButton(square_gameCancel, locale_ja.game_btnCancel, "rgba(0, 0, 0, 0.5)", "white");
  }

  // 入力課題を表示
  // （クリアした文字と点字は色表示）
  if (lowVision) {
    context.fillStyle = "rgba(0, 0, 0, 0.8)";
    context.strokeStyle = "rgba(0, 0, 0, 0.8)";
  } else {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  }
  fillRoundRect(context, 10, 68, context_width - 20, 40, 10);
  context.font = 'bold 24pt "メイリオ"';
  if (lowVision) {
    var color = colorPalette.yellow2;
  } else {
    var color = colorPalette.red1;
  }
  var task = down_task_list[taskNum][random][0] + "（" + down_task_list[taskNum][random][2] + "）";
  var tw = context.measureText(task).width;
  var sx = context_width / 2 - tw / 2;
  if (cursor_position == 0) {
    task = down_task_list[taskNum][random][0] + "（";
    context.fillStyle = "white";
    context.fillText(task, sx, 100);
    sx += context.measureText(task).width;
  } else {
    var p = parseInt(down_task_list[taskNum][random][4].charAt(cursor_position - 1), 16);
    if (p != 0) {
      task = down_task_list[taskNum][random][0].substring(0, p);
      context.fillStyle = color;
      context.fillText(task, sx, 100);
      sx += context.measureText(task).width;
    }
    task = down_task_list[taskNum][random][0].substring(p) + "（";
    context.fillStyle = "white";
    context.fillText(task, sx, 100);
    sx += context.measureText(task).width;
  }
  if (cursor_position == 0) {
    task = down_task_list[taskNum][random][2] + "）";
    context.fillText(task, sx, 100);
  } else {
    task = down_task_list[taskNum][random][2].substring(0, cursor_position);
    context.fillStyle = color;
    context.fillText(task, sx, 100);
    sx += context.measureText(task).width;
    task = down_task_list[taskNum][random][2].substring(cursor_position) + "）";
    context.fillStyle = "white";
    context.fillText(task, sx, 100);
  }

  // 点字の移動ルートを作成
  if (lowVision) {
    color = "black";
  } else {
    color = "white";
  }
  context.fillStyle = color;
  context.strokeStyle = color;
  fillRoundRect(context, 80, 130, 100, 170, 10);
  fillRoundRect(context, 10, 280, 240, 270, 10);
  context.fillStyle = color;
  context.strokeStyle = color;
  fillRoundRect(context, 280, 130, 240, 420, 10);
  context.fillStyle = color;
  context.strokeStyle = color;
  fillRoundRect(context, 550, 130, 240, 270, 10);
  fillRoundRect(context, 620, 350, 100, 200, 10);
  fillRoundRect(context, 510, 130, 60, 50, 10);
  context.fillStyle = color;
  context.strokeStyle = color;
  context.fillRect(230, 500, 20, 50);
  context.fillRect(280, 500, 10, 50);
  context.fillRect(500, 130, 20, 50);

  var isClose = true;
  for (var i = 0; i < braille_lines.length; i++) {
    if (!braille_lines[i].outside && braille_lines[i].clearUp && !braille_lines[i].wallPass) {
      isClose = false;
    }
  }
  drawWallDoor(isClose);
}

// ゲームで点字が通過する通路を描画
function drawWallDoor(isClose) {
  if (!isClose) {
    if (lowVision) {
      context.fillStyle = "black";
      context.strokeStyle = "black";
    } else {
      context.fillStyle = "white";
      context.strokeStyle = "white";
    }
    context.fillRect(250, 500, 30, 50);
  }
}

// ゲームの点字を移動するメインルーチン
function brailleDownMove(timestamp) {
  // 背景・残タイム・スコア・著作権表示
  drawBackground();
  showProgress();
  putScore();
  showCopyright();

  // 次に表示する点字を準備
  let deltatime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextBraille += deltatime;
  if (timeToNextBraille > brailleInterval) {
    if (abcPos < down_task_list[taskNum][random][2].length) {
      //var b = down_task_list[taskNum][random][2].charAt(abcPos);
      //braille_lines.push(new BrailleLine(b, 650, 450, 10, 1, timestamp));
      timeToNextBraille = 0;
      braille_lines[abcPos].before = false;
      abcPos++;
    }
  }

  // 点字のアニメーション表示
  var count = 0;
  for (var i = 0; i < braille_lines.length; i++) {
    if (!braille_lines[i].outside && !braille_lines[i].before) {
      braille_lines[i].update(timestamp);
      braille_lines[i].draw();
      count++;
    }
  }

  // 課題をクリアできなかった場合、煙を作成
  var isNext = false;
  for (var i = 0; i < braille_lines.length; i++) {
    if (braille_lines[i].outside && !braille_lines[i].clearUp) {
      explosions.push(new Explosion(350, 400, 100));
      isNext = true;
    }
  }

  // 煙のアニメーション表示
  [...explosions].forEach((object) => object.update(deltatime));
  [...explosions].forEach((object) => object.draw());

  // 課題をクリアできなかった場合とクリアできた場合の次の課題を設定
  if (isNext || cursor_position == down_task_list[taskNum][random][2].length) {
    var len = down_task_list[taskNum][random][2].length;
    if (cursor_position == len) {
      if (soundEffectName != "none") {
        document.getElementById(soundEffect[soundEffectName]["clear"]).play();
      }
    }
    braille_lines.length = 0;
    setAbcTask();
  }

  // 残り時間があれば、アニメーションを続行
  if (time_remaining > 0) {
    animaid = requestAnimationFrame(brailleDownMove);
  }
}

function showTask() {
  current_typing_mode = "japanese_characters";
  clearBody();
  //drawFrame();
  context.font = 'normal 24pt "メイリオ"';
  context.fillStyle = colorPalette.gray4;
  context.fillText("この日本語を点字で入力してください", 60, 100);
  if (course == 1) {
    random = Math.floor(Math.random() * beginners_task_list_braille.length);
    putRoundText(context, 60, 150, beginners_task_list_jp[random], colorPalette.gray4, true);
    if (is_hint) {
      putRoundText(context, 60, 250, beginners_task_list_braille[random], colorPalette.gray4, true);
    }
  } else if (course == 2) {
    random = Math.floor(Math.random() * intermediate_task_list_braille.length);
    putRoundText(context, 60, 150, intermediate_task_list_jp[random], colorPalette.gray4, true);
    if (is_hint) {
      putRoundText(context, 60, 250, intermediate_task_list_braille[random], colorPalette.gray4, true);
    }
  } else if (course == 3) {
    random = Math.floor(Math.random() * advanced_task_list_braille.length);
    putRoundText(context, 60, 150, advanced_task_list_jp[random], colorPalette.gray4, true);
    if (is_hint) {
      putRoundText(context, 60, 250, advanced_task_list_braille[random], colorPalette.gray4, true);
    }
  }
  charInsort();
  drawLine(context, 60, context_height - 140, context_width - 60, context_height - 140, 3, colorPalette.gray3);
  showCursor();
  showFooter();
  showCopyright();
}

function showFooter() {
  let names = ["japanese_characters", "numbers", "external_characters", "大文字", "外国語引用", "braille_voiced_consonants", "semi_voiced_sounds", "拗音", "特殊音", "つなぎ", "囲み"];
  var flags = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var k = 0;
  for (var i = 0; i < inKakomis.length; i++) {
    if (inKakomis[i]) {
      k = 1;
      break;
    }
  }
  switch (current_typing_mode) {
    case "japanese_characters":
    case "foreign_language_quotation_marks_end":
      flags = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, k];
      break;
    case "numbers":
      flags = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, k];
      break;
    case "external_characters":
      flags = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, k];
      break;
    case "大文字":
      flags = [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, k];
      break;
    case "大文字ロック":
      flags = [0, 0, 1, 2, 0, 0, 0, 0, 0, 0, k];
      break;
    case "semi_voiced_sounds":
      flags = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, k];
      break;
    case "foreign_language_quotation_marks":
      flags = [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, k];
      break;
    case "大文字外引用":
      flags = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, k];
      break;
    case "大文字ロック外引用":
      flags = [0, 0, 1, 2, 1, 0, 0, 0, 0, 0, k];
      break;
    case "braille_voiced_consonants":
      flags = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, k];
      break;
    case "拗音点":
      flags = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, k];
      break;
    case "拗濁点":
      flags = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, k];
      break;
    case "拗半濁点":
      flags = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, k];
      break;
    case "特殊音符":
      flags = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, k];
      break;
    case "特殊音符＋濁音":
      flags = [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, k];
      break;
    case "拗半濁点＋濁音":
      flags = [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, k];
      break;
    case "connecting_marks":
      flags = [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, k];
      break;
    default:
      flags = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, k];
      break;
  }
  var x = 60;
  var w;
  for (let i = 0; i < names.length; i++) {
    showFooterMode(names[i], x, flags[i]);
    w = context.measureText(names[i]).width;
    x = x + w + 20;
  }
}

function showFooterMode(text, x, ison) {
  context.font = 'normal 12pt "メイリオ"';
  if (lowVision) {
    if (ison == 1) {
      context.fillStyle = colorPalette.yellow1;
    } else if (ison == 2) {
      context.fillStyle = colorPalette.yellow2;
    } else {
      context.fillStyle = colorPalette.gray3;
    }
  } else {
    if (ison == 1) {
      context.fillStyle = colorPalette.red1;
    } else if (ison == 2) {
      context.fillStyle = colorPalette.red2;
    } else {
      context.fillStyle = colorPalette.gray3;
    }
  }
  var w = context.measureText(text).width;
  context.fillRect(x, context_height - 80, w + 15, 25);
  if (lowVision) {
    context.fillStyle = "black";
  } else {
    context.fillStyle = "white";
  }
  context.fillText(text, x + 7, context_height - 60);
}

function showCopyright() {
  context.font = 'normal 10pt "メイリオ"';
  context.fillStyle = colorPalette.gray4;
  var text = "Copyright 2022 - 2023 AT&D Lab.";
  var tw = context.measureText(text).width;
  context.fillText(text, context_width / 2 - tw / 2, context_height - 15);
}

function charInsort() {
  if (course == 1) {
    braille_char = beginners_task_list_braille[random].charAt(cursor_position);
  } else if (course == 2) {
    braille_char = intermediate_task_list_braille[random].charAt(cursor_position);
  } else if (course == 3) {
    braille_char = advanced_task_list_braille[random].charAt(cursor_position);
  }
}

function finish() {
  showProgress();
  putScore();

  if (current_screen == screenName.game1) {
    cancelAnimationFrame(animaid);
  }
  current_screen = screenName.finish;
  score = Math.floor(Math.pow(correct, 2) * Math.pow(correct / (correct + incorrect + skipped), 5));
  var upthere = document.getElementById("upthereaudio");
  upthere.addEventListener("ended", function (e) {
    var goodjob = document.getElementById("goodjobaudio");
    goodjob.addEventListener("ended", function (e) {
      Speech("スコアは" + String(score) + "点でした。");
    });
    goodjob.play();
  });
  upthere.play();

  if (lowVision) {
    var errorColor = colorPalette.yellow2;
    context.fillStyle = "rgba(0, 0, 0, 0.9)";
    context.strokeStyle = "rgba(0, 0, 0, 0.9)";
  } else {
    var errorColor = colorPalette.red2;
    context.fillStyle = "rgba(0, 0, 0, 0.8)";
    context.strokeStyle = "rgba(0, 0, 0, 0.8)";
  }
  fillRoundRect(context, 250, 100, 300, 430, 10);

  context.font = 'bold 24pt "メイリオ"';
  context.fillStyle = "white";
  context.fillText("スコア", 270, 150);
  var result = score + " 点";
  var w = context.measureText(result).width;
  context.fillText(result, 530 - w, 150);

  context.font = 'normal 16pt "メイリオ"';
  context.fillStyle = "white";
  context.fillText("正タイプ", 290, 200);
  context.fillText(correct, 420, 200);

  context.fillText("ミスタイプ", 290, 250);
  if (incorrect > 0) context.fillStyle = errorColor;
  context.fillText(incorrect, 420, 250);

  context.fillStyle = "white";
  context.fillText("スキップ", 290, 300);
  if (skipped > 0) context.fillStyle = errorColor;
  context.fillText(skipped, 420, 300);

  context.fillStyle = "white";
  context.fillText("正答率", 290, 350);
  context.fillText(((correct / (correct + incorrect + skipped)) * 100).toFixed(1) + " %", 420, 350);

  gameEndProcessing();
  braille_char = 0;
  random = 0;
  cursor_position = 0;
  abcPos = 0;
  braille_lines.length = 0;
  explosions.length = 0;
  isGaming = false;
  clearKeyState();
  if (lowVision) {
    drawButton(square_finishRetry, locale_ja.finish_btnRetry, colorPalette.yellow2, "black");
    drawButton(square_finishBack, locale_ja.finish_btnBack, "white", "black");
  } else {
    drawButton(square_finishRetry, locale_ja.finish_btnRetry, colorPalette.red2, "white");
    drawButton(square_finishBack, locale_ja.finish_btnBack, colorPalette.gray2, colorPalette.gray4);
  }
  showCopyright();
}

function gameEndProcessing() {
  braille_char = 0;
  random = 0;
  cursor_position = 0;
  abcPos = 0;
  braille_lines.length = 0;
  explosions.length = 0;
}

function clearAll() {
  context.clearRect(0, 0, context_width, context_height);
}

function clearBody() {
  context.clearRect(0, 50, context_width, context_height - 6);
}

function clearKeyState() {
  for (var i = 0; i < 7; i++) {
    key_state[i] = false;
    key_buf[i] = false;
  }
}

function drawLine(ctx, x, y, xt, yt, w, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(xt, yt);
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.stroke();
}

function displayBraille(ctx, x, y, color) {
  ctx.clearRect(x - 7, y - 7, 28, 42);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1;
  drawBrailleDot(ctx, x, y, 5, color, key_buf[0]);
  drawBrailleDot(ctx, x, y + 14, 5, color, key_buf[1]);
  drawBrailleDot(ctx, x, y + 28, 5, color, key_buf[2]);
  drawBrailleDot(ctx, x + 14, y, 5, color, key_buf[3]);
  drawBrailleDot(ctx, x + 14, y + 14, 5, color, key_buf[4]);
  drawBrailleDot(ctx, x + 14, y + 28, 5, color, key_buf[5]);
}

function drawBrailleDot(ctx, x, y, r, c, f) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  if (f) {
    ctx.fillStyle = c;
    ctx.fill();
  } else {
    if (lowVision) {
      ctx.fillStyle = colorPalette.gray5;
    } else {
      ctx.fillStyle = colorPalette.gray2;
    }
    ctx.fill();
  }
}

function getOnOff(braille) {
  var b = getKeyByValue(braille_unicode, braille);
  var onOff = new Array();
  for (var i = 0; i < 6; i++) {
    var c = b.charAt(i);
    if (c == "1") {
      onOff[i] = true;
    } else {
      onOff[i] = false;
    }
  }
  return onOff;
}

function putBrailleNormal(braille, x, y, color) {
  var onOff = getOnOff(braille);
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 1;
  var r = 15;
  var d = 10;
  drawBrailleDot(context, x, y, r, color, onOff[0]);
  drawBrailleDot(context, x, y + (r + d + r), r, color, onOff[1]);
  drawBrailleDot(context, x, y + (r + d + r) * 2, r, color, onOff[2]);
  drawBrailleDot(context, x + (r + d + r), y, r, color, onOff[3]);
  drawBrailleDot(context, x + (r + d + r), y + (r + d + r), r, color, onOff[4]);
  drawBrailleDot(context, x + (r + d + r), y + (r + d + r) * 2, r, color, onOff[5]);
}

function putBrailleHorizontal(braille, x, y, color) {
  var onOff = getOnOff(braille);
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 1;
  var r = 15;
  var d = 10;
  var dx = x - (r + d + r) * 2;
  drawBrailleDot(context, dx, y, r, color, onOff[2]);
  drawBrailleDot(context, dx + (r + d + r), y, r, color, onOff[1]);
  drawBrailleDot(context, dx + (r + d + r) * 2, y, r, color, onOff[0]);
  drawBrailleDot(context, dx + (r + d + r) * 3, y, r, color, onOff[3]);
  drawBrailleDot(context, dx + (r + d + r) * 4, y, r, color, onOff[4]);
  drawBrailleDot(context, dx + (r + d + r) * 5, y, r, color, onOff[5]);
}

function putBrailleRotate(braille, x, y, angle, color) {
  var onOff = getOnOff(braille);
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 1;
  var r = 15;
  var d = 10;
  var cx = x;
  var cy = y;
  drawBrailleDot(context, x, y, r, color, onOff[0]);
  var rad = (angle * Math.PI) / 180;
  var rx = cx + Math.cos(rad) * (x - cx) - Math.sin(rad) * (y + (r + d + r) - cy);
  var ry = cy + Math.sin(rad) * (x - cx) + Math.cos(rad) * (y + (r + d + r) - cy);
  drawBrailleDot(context, rx, ry, r, color, onOff[1]);
  rx = cx + Math.cos(rad) * (x - cx) - Math.sin(rad) * (y + (r + d + r) * 2 - cy);
  ry = cy + Math.sin(rad) * (x - cx) + Math.cos(rad) * (y + (r + d + r) * 2 - cy);
  drawBrailleDot(context, rx, ry, r, color, onOff[2]);
  cx = x + (r + d + r);
  drawBrailleDot(context, x + (r + d + r), y, r, color, onOff[3]);
  rad = ((360 - angle) * Math.PI) / 180;
  rx = cx + Math.cos(rad) * (x + (r + d + r) - cx) - Math.sin(rad) * (y + (r + d + r) - cy);
  ry = cy + Math.sin(rad) * (x + (r + d + r) - cx) + Math.cos(rad) * (y + (r + d + r) - cy);
  drawBrailleDot(context, rx, ry, r, color, onOff[4]);
  rx = cx + Math.cos(rad) * (x + (r + d + r) - cx) - Math.sin(rad) * (y + (r + d + r) * 2 - cy);
  ry = cy + Math.sin(rad) * (x + (r + d + r) - cx) + Math.cos(rad) * (y + (r + d + r) * 2 - cy);
  drawBrailleDot(context, rx, ry, r, color, onOff[5]);
}

function displayCharacter(ctx, x, y, color) {
  var jp;
  var isOk = false;
  var braille = dot[0] + dot[1] + dot[2] + dot[3] + dot[4] + dot[5];
  if (log_input[cursor_position - 1] in braille_indicators && cursor_position > 0) {
    var type = log_typing_mode[cursor_position - 1];
  } else {
    var type = current_typing_mode;
  }

  if (cursor_position == 0 || log_input[cursor_position - 1] == "000000") {
    if (braille in start_fugo) {
      log_character[cursor_position] = " ";
      return;
    }
  } else {
    if (braille in mid_fugo) {
      log_character[cursor_position] = " ";
      return;
    }
  }

  switch (type) {
    case "japanese_characters":
      if (braille in enclosure_symbols) {
        jp = enclosure_symbols[braille];
        if (inKakomis[kakomi_no["『"]]) {
          current_typing_mode = "connecting_marks";
        } else {
          if (inKakomis[kakomi_no[jp]]) {
            inKakomis[kakomi_no[jp]] = false;
            jp = kakomi_pair[jp];
          } else {
            inKakomis[kakomi_no[jp]] = true;
          }
          isOk = true;
          current_typing_mode = "japanese_characters";
        }
      } else if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (braille == "000000") {
          if (cursor_position > 1) {
            // パーセント％
            if (log_input[cursor_position - 1] == "111100" && log_input[cursor_position - 2] == "000011") {
              jp = "%";
              x -= 40;
              clearSumiji(cursor_position - 1);
            }
            // 感嘆符！
            if (log_input[cursor_position - 1] == "011010") {
              jp = "！";
              x -= 40;
              clearSumiji(cursor_position - 1);
            }
          }
        } else if (braille == "101010") {
          if (cursor_position > 1) {
            // 右矢印（-->）
            if (log_input[cursor_position - 2] == "010010" && log_input[cursor_position - 1] == "010010") {
              if (jp == "タ") {
                jp = "→";
                if (cursor_position > 2 && log_input[cursor_position - 3] == "010101") {
                } else {
                  clearSumiji(cursor_position - 2);
                  clearSumiji(cursor_position - 1);
                }
              }
            }
          }
        } else if (braille == "010010") {
          if (cursor_position > 1) {
            // 左矢印（<--）
            if (log_input[cursor_position - 2] == "010101" && log_input[cursor_position - 1] == "010010") {
              jp = "←";
              clearSumiji(cursor_position - 2);
              clearSumiji(cursor_position - 1);
            }
          }
        } else if (braille == "010000") {
          if (cursor_position > 0 && log_input[cursor_position - 1] == "011011") {
            // 第二カッコ閉じる
            jp = kakomi_pair["〈"];
            inKakomis[kakomi_no["〈"]] = false;
            x -= 40;
            clearSumiji(cursor_position - 1);
            inKakomis[kakomi_no["（"]] = false;
            current_typing_mode = "japanese_characters";
          } else if (cursor_position > 1 && log_input[cursor_position - 2] == "010000" && log_input[cursor_position - 1] == "010000") {
            // 点線：…
            jp = "…";
            clearSumiji(cursor_position - 2);
            clearSumiji(cursor_position - 1);
          }
        } else if (braille == "001010") {
          if (cursor_position > 0) {
            // 第一星印
            if (log_input[cursor_position - 1] == "001010") {
              jp = "★";
              clearSumiji(cursor_position - 1);
            }
          }
        } else if (braille == "011000") {
          // 外字符＋囲み　終了：】、』、》
          if (cursor_position > 1 && log_input[cursor_position - 1] in gaijifu_kakomi && log_input[cursor_position - 2] != "000011") {
            jp = gaijifu_kakomi[log_input[cursor_position - 1]];
            inKakomis[kakomi_no[jp]] = false;
            jp = kakomi_pair[jp];
            x -= 40;
            clearSumiji(cursor_position - 1);
            current_typing_mode = "japanese_characters";
          }
        }
        isOk = true;
      }
      break;
    case "connecting_marks":
      if (is_top) {
        if (braille in enclosure_symbols) {
          jp = enclosure_symbols[braille];
          if (inKakomis[["『"]]) {
            current_typing_mode = "connecting_marks";
          } else {
            if (inKakomis[kakomi_no[jp]]) {
              inKakomis[kakomi_no[jp]] = false;
              jp = kakomi_pair[jp];
            } else {
              inKakomis[kakomi_no[jp]] = true;
            }
            isOk = true;
            current_typing_mode = "japanese_characters";
          }
        } else if (braille in braille_japanese_alphabets) {
          jp = braille_japanese_alphabets[braille];
          isOk = true;
        }
      } else {
        if (braille in braille_japanese_alphabets) {
          if (braille == "011000") {
            // 外字符＋囲み　終了：】、』、》
            if (cursor_position > 1 && log_input[cursor_position - 1] in gaijifu_kakomi && log_input[cursor_position - 2] != "000011") {
              jp = gaijifu_kakomi[log_input[cursor_position - 1]];
              inKakomis[kakomi_no[jp]] = false;
              jp = kakomi_pair[jp];
              isOk = true;
              current_typing_mode = "japanese_characters";
            }
          } else {
            jp = braille_japanese_alphabets[braille];
            isOk = true;
          }
        } else if (braille == "001001") {
          // パーセント：％
          if (cursor_position > 1 && log_input[cursor_position - 2] == "000011" && log_input[cursor_position - 1] == "111100") {
            jp = "%";
            x -= 40;
            clearSumiji(cursor_position - 1);
            isOk = true;
          }
          // 波線：〜
          if (cursor_position > 0 && log_input[cursor_position - 1] == "001001") {
            jp = "〜";
            isOk = true;
            current_typing_mode = "japanese_characters";
          }
        }
      }
      break;
    case "braille_voiced_consonants":
      if (braille in daku_kakomi) {
        jp = daku_kakomi[braille];
        inKakomis[kakomi_no[jp]] = true;
        isOk = true;
      } else if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in braille_voiced_consonants) {
          jp = braille_voiced_consonants[jp];
          if (jp == "・") x -= 40;
          isOk = true;
        } else if (braille in braille_hidden_characters) {
          jp = braille_hidden_characters[braille];
          isOk = true;
        }
      }
      break;
    case "semi_voiced_sounds":
      if (braille in braille_japanese_alphabets) {
        if (braille == "011000") {
          // 第二カギ囲み閉じる
          if (inKakomis[kakomi_no["【"]]) {
            jp = kakomi_pair["【"];
            inKakomis[kakomi_no["【"]] = false;
            isOk = true;
            current_typing_mode = "japanese_characters";
          }
        } else {
          jp = braille_japanese_alphabets[braille];
          if (jp in hdaku) {
            jp = hdaku[jp];
            isOk = true;
          }
        }
      }
      break;
    case "拗音点":
      if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in yoon) {
          jp = yoon[jp];
          isOk = true;
        }
      }
      break;
    case "拗濁点":
      if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in yodaku) {
          jp = yodaku[jp];
          isOk = true;
        }
      }
      break;
    case "拗半濁点":
      if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in yohandaku) {
          jp = yohandaku[jp];
          isOk = true;
        }
      }
      break;
    case "特殊音符":
      if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in tokushu) {
          jp = tokushu[jp];
          if (jp == "？") {
            if (log_input[cursor_position - 2] == "010001" && log_input[cursor_position - 1] == "010001") {
              // 特殊音符が2つ並んで空白の場合は第二星印、1つで空白の場合は疑問符？
              jp = "☆";
            } else if (log_input[cursor_position - 2] == "000001" && log_input[cursor_position - 1] == "010001") {
              // 第三星印
              jp = "※";
            }
            x -= 40;
          }
          isOk = true;
        }
      }
      break;
    case "特殊音符＋濁音":
      if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in tokushu_da) {
          jp = tokushu_da[jp];
          if (jp == "。") x -= 40;
          isOk = true;
        }
      }
      break;
    case "拗半濁点＋濁音":
      if (braille in braille_japanese_alphabets) {
        jp = braille_japanese_alphabets[braille];
        if (jp in yohandaku_da) {
          jp = yohandaku_da[jp];
          isOk = true;
        }
      }
      break;
    case "numbers":
      if (braille in enclosure_symbols) {
        jp = enclosure_symbols[braille];
        if (inKakomis[["『"]]) {
          current_typing_mode = "connecting_marks";
        } else {
          if (inKakomis[kakomi_no[jp]]) {
            inKakomis[kakomi_no[jp]] = false;
            jp = kakomi_pair[jp];
          } else {
            inKakomis[kakomi_no[jp]] = true;
          }
          isOk = true;
          current_typing_mode = "japanese_characters";
        }
      } else if (braille in braille_numbers) {
        jp = braille_numbers[braille];
        isOk = true;
      }
      break;
    case "external_characters":
      if (cursor_position > 0 && log_input[cursor_position - 1] == "000011" && braille in gaijifu_kakomi) {
        // 外字符＋囲み　開始：【、『、《
        jp = gaijifu_kakomi[braille];
        inKakomis[kakomi_no[jp]] = true;
        isOk = true;
        current_typing_mode = "japanese_characters";
      } else if (braille in enclosure_symbols) {
        jp = enclosure_symbols[braille];
        if (inKakomis[["『"]]) {
          current_typing_mode = "connecting_marks";
        } else {
          if (inKakomis[kakomi_no[jp]]) {
            inKakomis[kakomi_no[jp]] = false;
            jp = kakomi_pair[jp];
          } else {
            inKakomis[kakomi_no[jp]] = true;
          }
          isOk = true;
          current_typing_mode = "japanese_characters";
        }
      } else if (braille in braille_english_alphabets_lower) {
        jp = braille_english_alphabets_lower[braille];
        if (jp == "、") {
          if (inEnglish) {
            jp = " ";
          } else {
            x -= 40;
          }
        }
        isOk = true;
      } else if (braille in mark) {
        if (log_input[cursor_position - 1] == "000011") {
          jp = mark[braille];
          isOk = true;
        }
      } else {
        if (log_input[cursor_position - 1] == "011011") {
          // 二重カッコ閉じる
          jp = kakomi_pair["《"];
          inKakomis[kakomi_no["《"]] = false;
          x -= 40;
          clearSumiji(cursor_position - 1);
          inKakomis[kakomi_no["（"]] = false;
          isOk = true;
          current_typing_mode = "japanese_characters";
        }
      }
      break;
    case "foreign_language_quotation_marks":
      if (braille in enclosure_symbols) {
        jp = enclosure_symbols[braille];
        if (!inKakomis[kakomi_no["『"]]) {
          console.log("external_characters");
          if (inKakomis[kakomi_no[jp]]) {
            inKakomis[kakomi_no[jp]] = false;
            jp = kakomi_pair[jp];
          } else {
            inKakomis[kakomi_no[jp]] = true;
          }
        }
        isOk = true;
      } else if (braille in braille_english_alphabets_lower) {
        jp = braille_english_alphabets_lower[braille];
        if (jp == "、") {
          jp = " ";
        }
        isOk = true;
      }
      break;
    case "大文字":
    case "大文字ロック":
    case "大文字外引用":
    case "大文字ロック外引用":
      if (braille in braille_english_alphabets_upper) {
        jp = braille_english_alphabets_upper[braille];
        isOk = true;
      }
      break;
    default:
      break;
  }
  //console.log(type + ", " + braille + ", " + jp);
  if (isOk) {
    ctx.font = 'bold 16pt "メイリオ"';
    ctx.fillStyle = color;
    if (ctx.measureText(jp).width > 35) {
      ctx.fillText(jp, x - 10, y);
    } else {
      ctx.fillText(jp, x, y);
    }
    if (voiceSwitch) {
      if (jp in text_to_speech_mapping) {
        Speech(text_to_speech_mapping[jp]);
      } else {
        Speech(jp);
      }
    }
    log_character[cursor_position] = jp;
  } else {
    log_character[cursor_position] = " ";
  }
}

function createRoundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, Math.PI * (3 / 2), 0, false);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * (1 / 2), false);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, Math.PI * (1 / 2), Math.PI, false);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * (3 / 2), false);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, w, h, r) {
  createRoundRectPath(ctx, x, y, w, h, r);
  ctx.fill();
}

function strokeRoundRect(ctx, x, y, w, h, r) {
  createRoundRectPath(ctx, x, y, w, h, r);
  ctx.stroke();
}

function putRoundText(ctx, x, y, text, text_color, isRound) {
  ctx.font = 'bold 32pt "メイリオ"';
  var w = ctx.measureText(text).width;
  if (isRound) {
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = colorPalette.gray2;
    ctx.lineWidth = 2;
    fillRoundRect(context, x, y, w + 60, 70, 20);
    strokeRoundRect(context, x, y, w + 60, 70, 20);
  }
  ctx.strokeStyle = text_color;
  ctx.fillStyle = text_color;
  ctx.fillText(text, x + 30, y + 50);
}

function changeYomiage() {
  if (voiceSwitch) {
    document.getElementById("voiceSwitch").checked = false;
    voiceSwitch = false;
  } else {
    document.getElementById("voiceSwitch").checked = true;
    voiceSwitch = true;
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function logPrint() {
  var bstr = "";
  var jstr = "";
  var sstr = "";
  var i;
  var n;
  var text;
  for (i = 0; i < cursor_position; i++) {
    bstr += braille_unicode[log_input[i]];
    if (log_character[i] != undefined && log_character[i] != " ") {
      jstr = jstr + log_character[i];
      if (log_character[i] in text_to_speech_mapping) {
        sstr = sstr + text_to_speech_mapping[log_character[i]];
      } else {
        sstr = sstr + log_character[i];
      }
    }
  }
  memo_braille[memo_line] = bstr;
  memo_jp[memo_line] = jstr;
  context.drawImage(image_brailler_paper, 10, 100, context_width - 20, 290);
  context.fillStyle = colorPalette.gray4;
  for (i = memo_line, n = 0; n < 6; i--, n++) {
    if (i < 0) break;
    // 墨字
    context.font = 'normal 8pt "メイリオ"';
    context.fillStyle = "white"; // colorPalette.gray4;
    context.fillText(memo_jp[i], 195, 300 - n * 30 + 8);
    // 点字
    context.font = 'normal 24pt "メイリオ"';
    context.fillStyle = "black"; // colorPalette.gray4;
    context.fillText(memo_braille[i], 190, 300 - n * 30);
  }
  Speech(sstr);
  memo_line++;
  log_typing_mode.length = 0;
  //log_kakomi.length = 0;
  log_input.length = 0;
  log_character.length = 0;
}

function word2speech() {
  var text;
  var word = down_task_list[taskNum][random][3].charAt(cursor_position);
  if (cursor_position > 0) {
    var pre_word = down_task_list[taskNum][random][3].charAt(cursor_position - 1);
    if (pre_word == "濁") {
      text = braille_voiced_consonants[word];
    } else if (pre_word == "半") {
      text = hdaku[word];
    } else if (pre_word == "拗") {
      text = yoon[word];
    } else if (pre_word == "≧") {
      text = yodaku[word];
    } else if (pre_word == "▲") {
      text = yohandaku[word];
    } else if (pre_word == "特") {
      text = tokushu[word];
    } else if (pre_word == "▽") {
      text = tokushu_da[word];
    } else if (pre_word == "▼") {
      text = yohandaku_da[word];
    } else {
      text = text_to_speech_mapping[word];
    }
  } else {
    text = text_to_speech_mapping[word];
  }
  //console.log("word2speech => cursor_position:" + cursor_position + ", pre_word:" + pre_word + ", word:" + word + ", text:" + text);
  Speech(text);
}

function setSpeech() {
  if ("speechSynthesis" in window) {
    uttr.voice = speechVoice; // 音声（ゲーム設定から取得）
    uttr.lang = "ja-JP"; // 日本語
    //uttr.text = text;       // 喋る内容
    // 速度：0 - 10 (0.5:２倍遅い、2.0:倍速)
    if (screen == screenName.free) {
      uttr.rate = 1.1;
    } else {
      if (brailleInterval == 1000) {
        uttr.rate = 1.2;
      } else if (brailleInterval == 2000) {
        uttr.rate = 1.2;
      } else if (brailleInterval == 3000) {
        uttr.rate = 1.1;
      } else if (brailleInterval == 4000) {
        uttr.rate = 1.1;
      } else if (brailleInterval == 5000) {
        uttr.rate = 1;
      }
      uttr.rate = 1;
    }
    uttr.pitch = 1; // 音程：0 - 2
    uttr.volume = 1; // 音量：0 - 1
  } else {
    alert("このブラウザは音声合成に対応していません。");
  }
}

function Speech(text) {
  window.speechSynthesis.cancel();
  uttr.text = text;
  window.speechSynthesis.speak(uttr);
}

function SpeechNotCancel(text) {
  uttr.text = text;
  window.speechSynthesis.speak(uttr);
}

function showCursor() {
  context.fillStyle = colorPalette.gray2;
  context.fillRect(65 + cursor_position * 40, context_height - 187, 26, 40);
}

function kakomiAllOff() {
  for (var i = 0; i < inKakomis.length; i++) {
    inKakomis[i] = false;
  }
}

function clearBraille(cursor_position) {
  context.clearRect(65 + cursor_position * 40, context_height - 190, 35, 48);
}

function clearSumiji(cursor_position) {
  context.clearRect(58 + cursor_position * 40, context_height - 130, 40, 30);
  log_character[cursor_position] = " ";
}

document.onkeydown = function (e) {
  e.preventDefault(); // Space入力による画面のスクロールを止める
  switch (e.key) {
    case "f":
      key_state[0] = true;
      key_buf[0] = true;
      break;
    case "d":
      key_state[1] = true;
      key_buf[1] = true;
      break;
    case "s":
      key_state[2] = true;
      key_buf[2] = true;
      break;
    case "j":
      key_state[3] = true;
      key_buf[3] = true;
      break;
    case "k":
      key_state[4] = true;
      key_buf[4] = true;
      break;
    case "l":
      key_state[5] = true;
      key_buf[5] = true;
      break;
    case " ":
      key_state[6] = true;
      key_buf[6] = true;
      break;
  }
};

document.onkeyup = function (e) {
  var keyStr;
  if (current_screen == screenName.menu) {
    switch (e.key) {
      case "e":
        course = 0;
        is_hint = false;
        freeTypingStart();
        break;
      case "g":
        if (!isGaming) {
          isGaming = true;
          course = 1;
          is_hint = true;
          lessonStart();
        }
        break;
      case "y":
        if (e.altKey) {
          changeYomiage();
        }
        break;
    }
  } else if (current_screen == screenName.free) {
    if (e.key == "b") {
      main();
    }
  } else if (current_screen == screenName.game1) {
    if (e.key == "Escape") {
      document.getElementById("cancelaudio").play();
      clearInterval(gametimer);
      cancelAnimationFrame(animaid);
      gameEndProcessing();
      main();
    }
  } else if (current_screen == screenName.finish) {
    if (e.key == "m") {
      main();
    } else if (e.key == "r") {
      course = 1;
      is_hint = true;
      isGaming = true;
      lessonStart();
    }
  }
  if (current_screen != screenName.free && current_screen != screenName.game1) return;
  switch (e.key) {
    case "f":
      key_state[0] = false;
      break;
    case "d":
      key_state[1] = false;
      break;
    case "s":
      key_state[2] = false;
      break;
    case "j":
      key_state[3] = false;
      break;
    case "k":
      key_state[4] = false;
      break;
    case "l":
      key_state[5] = false;
      break;
    case " ":
      key_state[6] = false;
      break;
    case "Backspace":
      if (course == 0) {
        if (cursor_position > 0) {
          clearBraille(cursor_position);
          --cursor_position;
          clearBraille(cursor_position);
          clearSumiji(cursor_position);
          if (cursor_position == 0) {
            current_typing_mode = "japanese_characters";
            kakomiAllOff();
            inEnglish = false;
            is_top = true;
          } else {
            current_typing_mode = log_typing_mode[cursor_position - 1];
            inKakomis = log_kakomi[cursor_position - 1];
          }
          showCursor();
          showFooter();
        }
      }
      break;
    case "Enter":
      if (course == 0) {
        logPrint();
        document.getElementById("typingaudio").play();
        context.clearRect(5, context_height - 200, context_width - 10, 58);
        context.clearRect(5, context_height - 130, context_width - 10, 50);
        cursor_position = 0;
        current_typing_mode = "japanese_characters";
        is_top = true;
        inEnglish = false;
        kakomiAllOff();
        showFooter();
        showCursor();
      }
      break;
  }
  if (cursor_position >= free_maxchar) {
    clearKeyState();
    document.getElementById(soundEffect[soundEffectName]["incorrect"]).pause(); // タイピングが速い場合、音声が
    document.getElementById(soundEffect[soundEffectName]["incorrect"]).currentTime = 0; // 再生されないためこの2行が必要
    document.getElementById(soundEffect[soundEffectName]["incorrect"]).play();
    return;
  }
  if (key_state[0] || key_state[1] || key_state[2] || key_state[3] || key_state[4] || key_state[5] || key_state[6]) {
    return;
  }
  if (!key_buf[0] && !key_buf[1] && !key_buf[2] && !key_buf[3] && !key_buf[4] && !key_buf[5] && !key_buf[6]) {
    return;
  }
  for (var i = 0; i < 6; i++) {
    dot[i] = "0";
  }
  if (key_buf[0] == true) {
    dot[0] = "1";
  }
  if (key_buf[1] == true) {
    dot[1] = "1";
  }
  if (key_buf[2] == true) {
    dot[2] = "1";
  }
  if (key_buf[3] == true) {
    dot[3] = "1";
  }
  if (key_buf[4] == true) {
    dot[4] = "1";
  }
  if (key_buf[5] == true) {
    dot[5] = "1";
  }
  if (key_buf[6] == true || dot[0] == "1" || dot[1] == "1" || dot[2] == "1" || dot[3] == "1" || dot[4] == "1" || dot[5] == "1") {
    var inkey = dot[0] + dot[1] + dot[2] + dot[3] + dot[4] + dot[5];
    if (inkey in braille_unicode) {
      keyStr = braille_unicode[inkey];
    }
    if (current_screen == screenName.game1) {
      //console.log("cursor_position: " + cursor_position + ", braille: " + braille_lines[cursor_position].braille);
      //[...braille_lines].forEach(object => console.log("braille: " + object.braille));
      if (keyStr == braille_lines[cursor_position].braille) {
        correct++;
        braille_lines[cursor_position].setClearUp();
        //Speech(down_task_list[taskNum][random][0].charAt(cursor_position));
        if (voiceSwitch) word2speech();
        if (soundEffectName != "none") {
          document.getElementById(soundEffect[soundEffectName]["correct"]).pause(); // タイピングが速い場合、音声が
          document.getElementById(soundEffect[soundEffectName]["correct"]).currentTime = 0; // 再生されないためこの2行が必要
          document.getElementById(soundEffect[soundEffectName]["correct"]).play();
        }
        cursor_position++;
      } else {
        incorrect++;
        if (soundEffectName != "none") {
          document.getElementById(soundEffect[soundEffectName]["incorrect"]).pause(); // タイピングが速い場合、音声が
          document.getElementById(soundEffect[soundEffectName]["incorrect"]).currentTime = 0; // 再生されないためこの2行が必要
          document.getElementById(soundEffect[soundEffectName]["incorrect"]).play();
        }
      }
      clearKeyState();
      return;
    }
    if (keyStr == braille_char || course == 0) {
      if (key_buf[6]) {
        // Space処理
        if (inEnglish) {
          current_typing_mode = "foreign_language_quotation_marks";
        } else {
          is_top = true;
          current_typing_mode = "japanese_characters";
        }
      } else if (inkey in braille_indicators) {
        // 符号処理
        var mode = braille_indicators[inkey];
        //console.log("onkeyup => mode:" + mode + ", is_top:" + is_top);
        if (mode == "numeral") {
          current_typing_mode = "numbers";
        } else if (mode == "external_character_mark") {
          current_typing_mode = "external_characters";
        } else if (mode == "capital_letters_semi_voiced_sounds") {
          if (current_typing_mode == "external_characters") {
            current_typing_mode = "大文字";
          } else if (current_typing_mode == "japanese_characters") {
            current_typing_mode = "semi_voiced_sounds";
          } else if (current_typing_mode == "大文字") {
            current_typing_mode = "大文字ロック";
          } else if (current_typing_mode == "foreign_language_quotation_marks") {
            current_typing_mode = "大文字外引用";
          } else if (current_typing_mode == "大文字外引用") {
            current_typing_mode = "大文字ロック外引用";
          }
        } else if (mode == "foreign_language_quotation_marks" && is_top) {
          inEnglish = true;
          current_typing_mode = mode;
        } else if (mode == "foreign_language_quotation_marks_end" && inEnglish) {
          inEnglish = false;
          current_typing_mode = mode;
        } else if (mode == "braille_voiced_consonants") {
          current_typing_mode = mode;
        } else if (mode == "拗音点") {
          current_typing_mode = mode;
        } else if (mode == "拗濁点") {
          current_typing_mode = mode;
        } else if (mode == "拗半濁点") {
          current_typing_mode = mode;
        } else if (mode == "特殊音符") {
          current_typing_mode = mode;
        } else if (mode == "特殊音符＋濁音") {
          current_typing_mode = mode;
        } else if (mode == "拗半濁点＋濁音") {
          current_typing_mode = mode;
        } else if (mode == "connecting_marks") {
          if (is_top && !inKakomis[3]) {
            current_typing_mode = "japanese_characters";
          } else if (inKakomis[3]) {
            current_typing_mode = "japanese_characters";
          } else {
            current_typing_mode = mode;
          }
        }
        is_top = false;
      } else {
        is_top = false;
        if (
          current_typing_mode == "braille_voiced_consonants" ||
          current_typing_mode == "semi_voiced_sounds" ||
          current_typing_mode == "拗音点" ||
          current_typing_mode == "拗濁点" ||
          current_typing_mode == "拗半濁点" ||
          current_typing_mode == "特殊音符" ||
          current_typing_mode == "特殊音符＋濁音" ||
          current_typing_mode == "拗半濁点＋濁音" ||
          current_typing_mode == "connecting_marks" ||
          current_typing_mode == "foreign_language_quotation_marks_end"
        ) {
          current_typing_mode = "japanese_characters";
        } else if (current_typing_mode == "大文字") {
          current_typing_mode = "external_characters";
        } else if (current_typing_mode == "大文字ロック") {
          current_typing_mode = "大文字ロック";
        } else if (current_typing_mode == "foreign_language_quotation_marks") {
          current_typing_mode = "foreign_language_quotation_marks";
        } else if (current_typing_mode == "大文字外引用") {
          current_typing_mode = "foreign_language_quotation_marks";
        } else if (current_typing_mode == "大文字ロック外引用") {
          current_typing_mode = "大文字ロック外引用";
        } else if (current_typing_mode == "numbers") {
          if (!(inkey in braille_numbers)) {
            current_typing_mode = "japanese_characters";
          }
          if (inkey in enclosure_symbols && inKakomis[0]) {
            current_typing_mode = "japanese_characters";
          }
        } else if (current_typing_mode == "external_characters") {
          if (inkey in enclosure_symbols && inKakomis[0]) {
            current_typing_mode = "japanese_characters";
          }
        }
      }
      if (lowVision) {
        displayCharacter(context, 68 + cursor_position * 40, context_height - 110, "white");
        displayBraille(context, 70 + cursor_position * 40, context_height - 180, colorPalette.yellow2);
      } else {
        displayCharacter(context, 68 + cursor_position * 40, context_height - 110, colorPalette.gray4);
        displayBraille(context, 70 + cursor_position * 40, context_height - 180, colorPalette.gray4);
      }
      log_typing_mode[cursor_position] = current_typing_mode;
      for (var i = 0; i < inKakomis.length; i++) {
        log_kakomi[cursor_position][i] = inKakomis[i];
      }
      log_input[cursor_position] = inkey;
      showFooter();
      if (course != 0) {
        if (soundEffectName != "none") {
          document.getElementById(soundEffect[soundEffectName]["correct"]).pause(); // タイピングが速い場合、音声が
          document.getElementById(soundEffect[soundEffectName]["correct"]).currentTime = 0; // 再生されないためこの2行が必要
          document.getElementById(soundEffect[soundEffectName]["correct"]).play();
        }
      }
      if (is_hint) {
        if (course == 1) {
          var metric = context.measureText(beginners_task_list_braille[random].substring(0, cursor_position + 1));
          putRoundText(context, 60, 250, beginners_task_list_braille[random].substring(0, cursor_position + 1), colorPalette.red1, false);
        } else if (course == 2) {
          var metric = context.measureText(intermediate_task_list_braille[random].substring(0, cursor_position + 1));
          putRoundText(context, 60, 250, intermediate_task_list_braille[random].substring(0, cursor_position + 1), colorPalette.red1, false);
        } else if (course == 3) {
          var metric = context.measureText(advanced_task_list_braille[random].substring(0, cursor_position + 1));
          putRoundText(context, 60, 250, advanced_task_list_braille[random].substring(0, cursor_position + 1), colorPalette.red1, false);
        }
      }
      if (cursor_position < free_maxchar) cursor_position++;
      showCursor();
      correct++;
      charInsort();
    } else {
      incorrect++;
      displayBraille(context, 70 + cursor_position * 40, context_height - 180, colorPalette.red2);
      if (soundEffectName != "none") {
        document.getElementById(soundEffect[soundEffectName]["incorrect"]).pause(); // タイピングが速い場合、音声が
        document.getElementById(soundEffect[soundEffectName]["incorrect"]).currentTime = 0; // 再生されないためこの2行が必要
        document.getElementById(soundEffect[soundEffectName]["incorrect"]).play();
      }
    }
    clearKeyState();
    if (course != 0) {
      if (course == 1) {
        var len = beginners_task_list_braille[random].length;
      } else if (course == 2) {
        var len = intermediate_task_list_braille[random].length;
      } else if (course == 3) {
        var len = advanced_task_list_braille[random].length;
      }
      if (cursor_position == len) {
        if (soundEffectName != "none") {
          var cleartask = document.getElementById(soundEffect[soundEffectName]["clear"]);
          cleartask.addEventListener("ended", function (e) {
            cursor_position = 0;
            if (time_remaining > 0) {
              showTask();
            }
          });
          cleartask.play();
        } else {
          cursor_position = 0;
          if (time_remaining > 0) {
            showTask();
          }
        }
      }
    }
  }
};
