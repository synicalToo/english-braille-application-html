import { Button } from "@/components/ui/button";
import GameCanvasComponent from "@/components/game-canvas";

export default function GameCardComponent() {
  return (
    <div className="p-3 rounded-lg border-2">
      <div className="text-center mt-3 font-semibold text-4xl">Braille Typing Game</div>
      <GameCanvasComponent />
      <div className="flex items-center justify-center p-10">
        <Button className="mx-3 bg-red-500">Free Typing</Button>
        <Button className="mx-3 bg-slate-500">Start Game</Button>
      </div>
    </div>
  );
}
