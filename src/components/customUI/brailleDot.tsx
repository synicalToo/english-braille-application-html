interface BrailleDotProps {
  active: boolean;
  position: number;
}

export function BrailleDot({ active, position }: BrailleDotProps) {
  return <div className={`w-4 h-4 rounded-full ${active ? "bg-black" : "bg-gray-200"} border border-gray-300`} data-position={position} />;
}
