import { BtnPositions, ColorPalette, ColorPalette2 } from "@/config/constants";

var current_theme: string;
var cursor_position: number = 0;
var screen_name: string = "main_menu";

var context: CanvasRenderingContext2D | null;
var context_width: number, context_height: number;

const clearCanvas = (): void => {
  if (context) {
    console.log("Clearing canvas...");
    context.clearRect(0, 0, context_width, context_height);
  }
};

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
    console.log("Drawing image...", imageSrc);
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
    console.log("Drawing button...", name);
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

const showCursor = (): void => {
  if (context) {
    console.log("Drawing cursor...");
    context.fillStyle = "#DEE3E6";
    context.fillRect(65 + cursor_position * 40, context_height - 187, 26, 40);
  }
};

const showFooter = (): void => {
  const modes = ["Alphabets", "Numbers"];
  var flags = [0, 0];
  var k = 0;

  var w;
  var x = 60;

  if (context) {
    for (let i = 0; i < modes.length; i++) {
      showFooterMode(modes[i], x, flags[i]);
      w = context.measureText(modes[i]).width;
      x += w + 20;
    }
  }
};

const showFooterMode = (text: string, x: number, flag: number): void => {
  if (context) {
    context.font = "normal 12pt Arial";

    context.fillStyle =
      current_theme === "dark"
        ? flag == 1
          ? ColorPalette2.dark.mode_bg_one
          : flag == 2
          ? ColorPalette2.dark.mode_bg_two
          : ColorPalette2.dark.mode_bg_default
        : flag == 1
        ? ColorPalette2.dark.mode_bg_one
        : flag == 2
        ? ColorPalette2.dark.mode_bg_two
        : ColorPalette2.dark.mode_bg_default;

    const text_width = context.measureText(text).width;
    context.fillRect(x, context_height - 80, text_width + 15, 25);

    context.fillStyle = current_theme === "dark" ? ColorPalette2.dark.mode_title_text : ColorPalette2.light.mode_title_text;
    context.fillText(text, x + 7, context_height - 60);
  }
};

const startGame = (): void => {
  screen_name = "game";
  console.log("Game has started!");
};

const startFreeTyping = (): void => {
  screen_name = "free_typing";
  console.log("Free Typing has started!");

  if (context) {
    clearCanvas();

    context.font = "bold 32pt Arial";
    context.fillStyle = current_theme === "dark" ? ColorPalette2.dark.main_title_text : ColorPalette2.light.main_title_text;
    const main_title = "Free Typing";
    const text_width = context.measureText(main_title).width;
    context.fillText(main_title, context_width / 2 - text_width / 2, 80);

    drawImage("/brailler_paper.png", 10, 100, context_width - 20, 290);

    const btn_free_typing_back_text = "Back";
    const btn_free_typing_back_bg_color = current_theme === "dark" ? ColorPalette2.dark.btn_free_typing_back_bg : ColorPalette2.light.btn_free_typing_back_bg;
    const btn_free_typing_back_text_color = current_theme === "dark" ? ColorPalette2.dark.btn_free_typing_back_text : ColorPalette2.light.btn_free_typing_back_text;
    drawButton(BtnPositions.btn_free_typing_back, btn_free_typing_back_text, btn_free_typing_back_bg_color, btn_free_typing_back_text_color);

    drawLine(60, context_height - 140, context_width - 60, context_height - 140, 3, "#B5BAC2");

    showCursor();
    showFooter();
  }
};

const main = (): void => {
  screen_name = "main_menu";
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas && context) {
    clearCanvas();

    context.font = "32pt Arial";
    context.fillStyle = current_theme === "dark" ? ColorPalette2.dark.main_title_text : ColorPalette2.light.main_title_text;
    const main_title = "Braille Typing Exercises";
    const text_width = context.measureText(main_title).width;

    context.fillStyle = current_theme === "dark" ? "white" : "black";
    context.fillText(main_title, context_width / 2 - text_width / 2, 80);

    const btn_free_typing_bg_color = current_theme === "dark" ? ColorPalette2.dark.btn_free_typing_bg : ColorPalette2.light.btn_free_typing_bg;
    const btn_free_typing_text_color = current_theme === "dark" ? ColorPalette2.dark.btn_free_typing_text : ColorPalette2.light.btn_free_typing_text;
    const btn_start_game_bg_color = current_theme === "dark" ? ColorPalette2.dark.btn_start_game_bg : ColorPalette2.light.btn_start_game_bg;
    const btn_start_game_text_color = current_theme === "dark" ? ColorPalette2.dark.btn_start_game_text : ColorPalette2.light.btn_start_game_text;

    drawButton(BtnPositions.btn_free_typing, "Free Typing", btn_free_typing_bg_color, btn_free_typing_text_color);
    drawButton(BtnPositions.btn_start_game, "Start Game", btn_start_game_bg_color, btn_start_game_text_color);

    drawImage("/perkins_brailler.png", context_width / 2 - 464 / 2, context_height / 2 - 328 / 2, 464, 328);

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (
        x >= BtnPositions.btn_free_typing.x &&
        x <= BtnPositions.btn_free_typing.x + BtnPositions.btn_free_typing.width &&
        y >= BtnPositions.btn_free_typing.y &&
        y <= BtnPositions.btn_free_typing.y + BtnPositions.btn_free_typing.height &&
        screen_name === "main_menu"
      ) {
        startFreeTyping();
      }

      if (
        x >= BtnPositions.btn_start_game.x &&
        x <= BtnPositions.btn_start_game.x + BtnPositions.btn_start_game.width &&
        y >= BtnPositions.btn_start_game.y &&
        y <= BtnPositions.btn_start_game.y + BtnPositions.btn_start_game.height &&
        screen_name === "main_menu"
      ) {
        startGame();
      }

      if (
        x >= BtnPositions.btn_free_typing_back.x &&
        x <= BtnPositions.btn_free_typing_back.x + BtnPositions.btn_free_typing_back.width &&
        y >= BtnPositions.btn_free_typing_back.y &&
        y <= BtnPositions.btn_free_typing_back.y + BtnPositions.btn_free_typing_back.height &&
        screen_name === "free_typing"
      ) {
        main();
      }
    });
  }
};

export const initializeCanvas = (canvas: HTMLCanvasElement | null, theme: string): void => {
  context = null;
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
