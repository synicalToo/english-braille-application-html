import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CustomRadioProps {
  header: string;
  defaultValue: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
}

// This code extends on the radio-group UI component found in
// components/ui/radio-group.tsx
// Allows props to be passed for reusability
export function CustomRadio({ header, defaultValue, selectedValue, onValueChange, options }: CustomRadioProps) {
  return (
    <div>
      <h2 className="text-lg pb-2">{header}</h2>
      <RadioGroup defaultValue={defaultValue.toString()} value={selectedValue.toString()} onValueChange={(value) => onValueChange(value)} className="flex space-x-2">
        {options.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <RadioGroupItem id={`${item}`} value={`${item}`} />
            <label htmlFor={`${item}`} className="ml-2">
              {item}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
