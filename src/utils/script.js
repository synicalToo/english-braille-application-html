import { ButtonsPositions } from "@/config/constants";

var context;
var context_width, context_height;

export const startGame = () => {
  console.log("Game has started!");
};

export const startFreeTyping = () => {
  console.log("Free Typing has started!");
};

export const initializeCanvas = (canvas) => {
  if (canvas) {
    context = canvas.getContext("2d");
    context_width = canvas.width;
    context_height = canvas.height;

    console.log("Canvas context has been set!");
  } else {
    console.error("Canvas element not found!");
  }
};

export const drawImage = (imageSrc) => {
  if (context) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      context.drawImage(img, context_width / 2 - 464 / 2, context_height / 2 - 328 / 2, 464, 328);
    };
  } else {
    console.error("Canvas context is not initialized!");
  }
};
