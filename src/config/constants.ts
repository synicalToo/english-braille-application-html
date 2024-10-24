export const BtnPositions: { [key: string]: { x: number; y: number; width: number; height: number } } = {
  btn_free_typing: { x: 100, y: 500, width: 250, height: 50 },
  btn_free_typing_back: { x: 600, y: 40, width: 150, height: 50 },
  btn_start_game: { x: 450, y: 500, width: 250, height: 50 },
};

export const ColorPalette: { [key: string]: { [key: string]: string } } = {
  default: {
    gray1: "#F7F9F9",
    gray2: "#DEE3E6",
    gray3: "#B5BAC2",
    gray4: "#717A84",
    gray5: "#333333",
    red1: "#FC8E9A",
    red2: "#FF5569",
    yellow1: "#FFFF77",
    yellow2: "#FFFF00",
  },

  light: {
    main_title_text: "#717A84",
    mode_title_text: "#FFFFFF",

    btn_free_typing_bg: "#FF5569",
    btn_free_typing_text: "#FFFFFF",

    btn_start_game_bg: "#DEE3E6",
    btn_start_game_text: "#717A84",

    btn_free_typing_back_bg: "#DEE3E6",
    btn_free_typing_back_text: "#717A84",

    mode_bg_default: "#B5BAC2",
    mode_bg_one: "#FC8E9A",
    mode_bg_two: "#FF5569",
  },

  dark: {
    main_title_text: "#FFFFFF",
    mode_title_text: "#000000",

    btn_free_typing_bg: "#FFFF00",
    btn_free_typing_text: "#000000",

    btn_start_game_bg: "#FFFFFF",
    btn_start_game_text: "#000000",

    btn_free_typing_back_bg: "#FFFFFF",
    btn_free_typing_back_text: "#000000",

    mode_bg_default: "#B5BAC2",
    mode_bg_one: "#FFFF77",
    mode_bg_two: "#FFFF00",
  },
};

export enum GameScreen {
  main_menu,
  game,
  free_typing,
  game_over,
}

export const TypingMode: { [key: string]: number } = {
  alphabets: 0,
  numbers: 1,
  capital: 2,
  caps_lock: 3,
};
