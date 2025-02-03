import { Switch } from "@/components/ui/switch";

interface CustomSwitchProps {
  id: string;
  text: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

// This code extends on the switch UI component found in
// components/ui/switch.tsx
// Allows props to be passed for reusability
export function CustomSwitch({ id, text, checked, onCheckedChange }: CustomSwitchProps) {
  return (
    <div className="flex items-center mb-4">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="ml-2">
        {text}
      </label>
    </div>
  );
}
