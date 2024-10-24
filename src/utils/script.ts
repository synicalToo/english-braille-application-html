import { BrailleUnicodeAlphabet, BrailleUnicodeIndicators, BrailleUnicodeIndicatorsMappings } from "@/components/data/braille-data";
import { BeginnersWordList } from "@/components/data/word-list";
import { TypingMode, BtnPositions, ColorPalette, GameScreen } from "@/config/constants";

let cursorVisible = true;
let blinkInterval: NodeJS.Timeout | undefined;

var correct: number = 0;
var incorrect: number = 0;
var current_theme: string;
var cursor_position: number = 0;

var current_screen: number = GameScreen.main_menu;
var current_typing_mode: number = TypingMode.alphabets;

var context: CanvasRenderingContext2D | null;
var context_width: number, context_height: number;

const max_characters: number = 17;
const key_state: boolean[] = new Array(7).fill(false);
const key_buf: boolean[] = new Array(7).fill(false);
const dot: string[] = new Array(6).fill("0");
const braille_lines = Array();
const typing_mode_history = new Array();
const braille_input_history = new Array();

const clearCanvas = (): void => {
  if (context) {
    console.log("Clearing canvas...");
    context.clearRect(0, 0, context_width, context_height);
  }
};

const clearkeyStates = (): void => {
  for (var i = 0; i < 7; i++) {
    key_state[i] = false;
    key_buf[i] = false;
  }
};

function clearBraille(position: number) {
  if (context) {
    console.log("Clearing braille at position: ", position);
    context.clearRect(65 + position * 40, context_height - 190, 35, 48);
  }
}

const createRoundRectPath = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void => {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.arc(x + width - radius, y + radius, radius, Math.PI * (3 / 2), 0, false);
  context.lineTo(x + width, y + height - radius);
  context.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * (1 / 2), false);
  context.lineTo(x + radius, y + height);
  context.arc(x + radius, y + height - radius, radius, Math.PI * (1 / 2), Math.PI, false);
  context.lineTo(x, y + radius);
  context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * (3 / 2), false);
  context.closePath();
};

const fillRoundRect = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void => {
  createRoundRectPath(context, x, y, width, height, radius);
  context.fill();
};

const drawImage = (imageSrc: string, x: number, y: number, width: number, height: number): void => {
  if (context) {
    console.log("Drawing image: ", imageSrc);
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      if (context) {
        context.drawImage(img, x, y, width, height);
      } else {
        console.error("Canvas context is not initialized!"); // Handle the case if context is null
      }
    };
  } else {
    console.error("Canvas context is not initialized!");
  }
};

const drawButton = (btn: { x: number; y: number; width: number; height: number }, name: string, bg_color: string, text_color: string): void => {
  if (context) {
    console.log("Drawing button: ", name);
    context.fillStyle = bg_color;
    context.strokeStyle = bg_color;
    fillRoundRect(context, btn.x, btn.y, btn.width, btn.height, btn.height / 2);
    context.font = "bold 16pt Arial";
    context.fillStyle = text_color;
    var text_width = context.measureText(name).width;
    var text_height = context.measureText(name).actualBoundingBoxAscent + context.measureText(name).actualBoundingBoxDescent;
    context.fillText(name, btn.x + btn.width / 2 - text_width / 2, btn.y + (btn.height - text_height) / 2 + text_height);
  }
};

const drawLine = (x: number, y: number, width: number, height: number, line_width: number, color: string): void => {
  if (context) {
    console.log("Drawing line...");
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(width, height);
    context.strokeStyle = color;
    context.lineWidth = line_width;
    context.stroke();
  }
};

const drawBrailleDot = (x: number, y: number, radius: number, color: string, state: boolean): void => {
  if (context) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    if (state) {
      context.fillStyle = color;
      context.fill();
    } else {
      context.fillStyle = current_theme === "dark" ? ColorPalette.default.gray5 : ColorPalette.default.gray2;
      context.fill();
    }
  }
};

const displayBraille = (x: number, y: number, color: string): void => {
  if (context) {
    context.clearRect(x - 7, y - 7, 28, 42);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;

    drawBrailleDot(x, y, 5, color, key_buf[0]);
    drawBrailleDot(x, y + 14, 5, color, key_buf[1]);
    drawBrailleDot(x, y + 28, 5, color, key_buf[2]);
    drawBrailleDot(x + 14, y, 5, color, key_buf[3]);
    drawBrailleDot(x + 14, y + 14, 5, color, key_buf[4]);
    drawBrailleDot(x + 14, y + 28, 5, color, key_buf[5]);
  }
};

const showCursor = (): void => {
  if (context) {
    if (cursorVisible) {
      context.fillStyle = "#DEE3E6";
      context.fillRect(65 + cursor_position * 40, context_height - 187, 26, 40);
    } else {
      context.clearRect(65 + cursor_position * 40, context_height - 187, 26, 40);
    }
  }
};

const startCursorBlink = () => {
  if (blinkInterval === undefined) {
    blinkInterval = setInterval(() => {
      cursorVisible = !cursorVisible;
      showCursor();
    }, 500);
  }
};

const stopCursorBlink = () => {
  if (blinkInterval !== undefined) {
    clearInterval(blinkInterval);
    blinkInterval = undefined;
  }
};

const showFooter = (): void => {
  const typing_mode = ["Alphabet", "Number", "Capital"];
  var flags = [1, 0, 0];

  var w;
  var x = 60;

  switch (current_typing_mode) {
    case TypingMode.alphabets:
      flags = [1, 0, 0];
      break;
    case TypingMode.numbers:
      flags = [0, 1, 0];
      break;
    case TypingMode.capital:
      flags = [1, 0, 1];
      break;
    case TypingMode.caps_lock:
      flags = [1, 0, 2];
      break;
  }

  if (context) {
    for (let i = 0; i < typing_mode.length; i++) {
      showFooterTypingMode(typing_mode[i], x, flags[i]);
      w = context.measureText(typing_mode[i]).width;
      x += w + 20;
    }
  }
};

const showFooterTypingMode = (text: string, x: number, flag: number): void => {
  if (context) {
    context.font = "normal 12pt Arial";

    context.fillStyle =
      current_theme === "dark"
        ? flag == 1
          ? ColorPalette.dark.mode_bg_one
          : flag == 2
          ? ColorPalette.dark.mode_bg_two
          : ColorPalette.dark.mode_bg_default
        : flag == 1
        ? ColorPalette.light.mode_bg_one
        : flag == 2
        ? ColorPalette.light.mode_bg_two
        : ColorPalette.light.mode_bg_default;

    const text_width = context.measureText(text).width;
    context.fillRect(x, context_height - 80, text_width + 15, 25);

    context.fillStyle = current_theme === "dark" ? ColorPalette.dark.mode_title_text : ColorPalette.light.mode_title_text;
    context.fillText(text, x + 7, context_height - 60);
  }
};

const showCopyright = (): void => {
  if (context) {
    context.font = "normal 10pt Arial";
    context.fillStyle = ColorPalette.default.gray4;
    const copyright_text = "Copyright 2022 - 2023 AT&D Lab.";
    const text_width = context.measureText(copyright_text).width;
    context.fillText(copyright_text, context_width / 2 - text_width / 2, context_height - 15);
  }
};

const onCanvasCLick = (event: MouseEvent): void => {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (
    x >= BtnPositions.btn_free_typing.x &&
    x <= BtnPositions.btn_free_typing.x + BtnPositions.btn_free_typing.width &&
    y >= BtnPositions.btn_free_typing.y &&
    y <= BtnPositions.btn_free_typing.y + BtnPositions.btn_free_typing.height &&
    current_screen == GameScreen.main_menu
  ) {
    startFreeTyping();
  }

  if (
    x >= BtnPositions.btn_start_game.x &&
    x <= BtnPositions.btn_start_game.x + BtnPositions.btn_start_game.width &&
    y >= BtnPositions.btn_start_game.y &&
    y <= BtnPositions.btn_start_game.y + BtnPositions.btn_start_game.height &&
    current_screen == GameScreen.main_menu
  ) {
    startGame();
  }

  if (
    x >= BtnPositions.btn_free_typing_back.x &&
    x <= BtnPositions.btn_free_typing_back.x + BtnPositions.btn_free_typing_back.width &&
    y >= BtnPositions.btn_free_typing_back.y &&
    y <= BtnPositions.btn_free_typing_back.y + BtnPositions.btn_free_typing_back.height &&
    current_screen == GameScreen.free_typing
  ) {
    main();
  }
};

const onKeyDown = (event: KeyboardEvent): void => {
  if (current_screen == GameScreen.game || current_screen == GameScreen.free_typing) {
    event.preventDefault();
    switch (event.key) {
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

    console.log("key state: ", key_state);
  }
};

const onKeyUp = (event: KeyboardEvent): void => {
  var key_stroke;
  // handle main menu shortcuts
  if (current_screen == GameScreen.main_menu) {
    switch (event.key) {
      case "e":
        startFreeTyping();
        break;
      case "g":
        startGame();
        break;
    }
  }

  // handle free typing shortcuts
  if (current_screen == GameScreen.game) {
    if (event.key == "Escape") {
      main();
    }
  }

  // handle game shortcuts
  if (current_screen == GameScreen.free_typing) {
    if (event.key == "b") {
      main();
    }
  }

  if (current_screen != GameScreen.game && current_screen != GameScreen.free_typing) {
    return;
  }

  switch (event.key) {
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
      if (current_screen == GameScreen.free_typing) {
        if (cursor_position > 0) {
          clearBraille(cursor_position);
          --cursor_position;
          clearBraille(cursor_position);

          showCursor();
          showFooter();
        }
      }
      break;
    case "Enter":
      current_typing_mode = TypingMode.alphabets;
      showCursor();
      showFooter();
      break;
  }

  if (key_state[0] || key_state[1] || key_state[2] || key_state[3] || key_state[4] || key_state[5] || key_state[6]) {
    return;
  }

  if (!key_buf[0] && !key_buf[1] && !key_buf[2] && !key_buf[3] && !key_buf[4] && !key_buf[5] && !key_buf[6]) {
    return;
  }

  dot.fill("0");

  {
    if (key_buf[0]) {
      dot[0] = "1";
    }

    if (key_buf[1]) {
      dot[1] = "1";
    }

    if (key_buf[2]) {
      dot[2] = "1";
    }

    if (key_buf[3]) {
      dot[3] = "1";
    }

    if (key_buf[4]) {
      dot[4] = "1";
    }

    if (key_buf[5]) {
      dot[5] = "1";
    }
  }

  if (key_buf[6] || dot[0] == "1" || dot[1] == "1" || dot[2] == "1" || dot[3] == "1" || dot[4] == "1" || dot[5] == "1") {
    const combined_key: string = dot.join("");
    if (combined_key in BrailleUnicodeAlphabet) {
      key_stroke = BrailleUnicodeAlphabet[combined_key];
    }

    if (current_screen == GameScreen.game) {
      if (key_stroke == braille_lines[cursor_position].braille) {
        correct++;
        cursor_position++;
        braille_lines[cursor_position].setClearUp();
      } else {
        incorrect++;
      }

      clearkeyStates();
      return;
    }

    if (key_stroke == BeginnersWordList[cursor_position] || current_screen == GameScreen.free_typing) {
      if (key_buf[6]) {
        cursor_position++;
        clearkeyStates();
        return;
      } else if (combined_key in BrailleUnicodeIndicators) {
        current_typing_mode = TypingMode[BrailleUnicodeIndicatorsMappings[combined_key]];
        console.log("current typing mode: ", current_typing_mode);
      }

      displayBraille(70 + cursor_position * 40, context_height - 180, current_theme === "dark" ? ColorPalette.default.yellow2 : ColorPalette.default.gray4);

      typing_mode_history[cursor_position] = current_typing_mode;
      braille_input_history[cursor_position] = combined_key;
      showFooter();

      if (cursor_position < max_characters) {
        cursor_position++;
      }
      showCursor();
      correct++;
    } else {
      incorrect++;
      displayBraille(70 + cursor_position * 40, context_height - 180, ColorPalette.default.red2);
    }

    clearkeyStates();
  }
};

const startGame = (): void => {
  current_screen = GameScreen.game;
  console.log("Game has started!");
};

const startFreeTyping = (): void => {
  current_screen = GameScreen.free_typing;
  console.log("Free Typing has started!");

  if (context) {
    clearCanvas();

    context.font = "bold 32pt Arial";
    context.fillStyle = current_theme === "dark" ? ColorPalette.dark.main_title_text : ColorPalette.light.main_title_text;
    const main_title = "Free Typing";
    const text_width = context.measureText(main_title).width;
    context.fillText(main_title, context_width / 2 - text_width / 2, 80);

    drawImage("/brailler_paper.png", 10, 100, context_width - 20, 290);

    const btn_free_typing_back_text = "Back (b)";
    const btn_free_typing_back_bg_color = current_theme === "dark" ? ColorPalette.dark.btn_free_typing_back_bg : ColorPalette.light.btn_free_typing_back_bg;
    const btn_free_typing_back_text_color = current_theme === "dark" ? ColorPalette.dark.btn_free_typing_back_text : ColorPalette.light.btn_free_typing_back_text;
    drawButton(BtnPositions.btn_free_typing_back, btn_free_typing_back_text, btn_free_typing_back_bg_color, btn_free_typing_back_text_color);

    drawLine(60, context_height - 140, context_width - 60, context_height - 140, 3, "#B5BAC2");

    showCursor();
    // startCursorBlink();
    showFooter();
    showCopyright();
  }
};

const main = (): void => {
  console.log("starting main...");

  current_screen = GameScreen.main_menu;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas && context) {
    stopCursorBlink();
    clearCanvas();
    showCopyright();

    context.font = "32pt Arial";
    context.fillStyle = current_theme === "dark" ? ColorPalette.dark.main_title_text : ColorPalette.light.main_title_text;
    const main_title = "Braille Typing Exercises";
    const text_width = context.measureText(main_title).width;

    context.fillStyle = current_theme === "dark" ? "white" : "black";
    context.fillText(main_title, context_width / 2 - text_width / 2, 80);

    const btn_free_typing_bg_color = current_theme === "dark" ? ColorPalette.dark.btn_free_typing_bg : ColorPalette.light.btn_free_typing_bg;
    const btn_free_typing_text_color = current_theme === "dark" ? ColorPalette.dark.btn_free_typing_text : ColorPalette.light.btn_free_typing_text;
    const btn_start_game_bg_color = current_theme === "dark" ? ColorPalette.dark.btn_start_game_bg : ColorPalette.light.btn_start_game_bg;
    const btn_start_game_text_color = current_theme === "dark" ? ColorPalette.dark.btn_start_game_text : ColorPalette.light.btn_start_game_text;

    drawButton(BtnPositions.btn_free_typing, "Free Typing (e)", btn_free_typing_bg_color, btn_free_typing_text_color);
    drawButton(BtnPositions.btn_start_game, "Start Game (g)", btn_start_game_bg_color, btn_start_game_text_color);

    drawImage("/perkins_brailler.png", context_width / 2 - 464 / 2, context_height / 2 - 328 / 2, 464, 328);

    canvas.addEventListener("click", (event) => {
      onCanvasCLick(event);
    });

    window.addEventListener("keydown", (event) => {
      onKeyDown(event);
    });

    window.addEventListener("keyup", (event) => {
      onKeyUp(event);
    });
  }
};

export const initializeCanvas = (theme: string): void => {
  console.log("initializing...");

  context = null;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas) {
    current_theme = theme;
    context = canvas.getContext("2d");
    context_width = canvas.width;
    context_height = canvas.height;

    console.log("Canvas context has been set!");

    main();
  } else {
    console.error("Canvas element not found!");
  }
};
