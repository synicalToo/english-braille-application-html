import { BrailleDot } from "./brailleDot";

interface BrailleCharacterProps {
  char: string;
  code: string;
  position: number;
}

export function BrailleCharacter({ char, code, position }: BrailleCharacterProps) {
  const dots = [1, 2, 3, 4, 5, 6];

  return (
    <div
      className="absolute right-8 grid grid-cols-2 gap-2 transition-all duration-100"
      style={{
        bottom: `${100 - position * 10}%`,
      }}
    >
      {dots.map((dot) => (
        <BrailleDot key={dot} active={code.includes(dot.toString())} position={dot} />
      ))}
    </div>
  );
}
