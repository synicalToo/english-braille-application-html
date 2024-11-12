import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CustomRadioProps {
  title?: string;
  options: string[];
  defaultValue: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function CustomRadio({ title, defaultValue, options, value, onValueChange }: CustomRadioProps) {
  return (
    <div>
      <h2 className="text-lg pb-2">{title}</h2>
      <RadioGroup defaultValue={defaultValue} value={value} onValueChange={onValueChange} className="flex space-x-2">
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
