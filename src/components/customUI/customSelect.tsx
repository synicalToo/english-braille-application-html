import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomSelectProps {
  header: string;
  placeHolder: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
}

export function CustomSelect({ header, placeHolder, selectedValue, onValueChange, options }: CustomSelectProps) {
  return (
    <div>
      <h2 className="text-lg pb-2">{header}</h2>
      <Select value={selectedValue} onValueChange={onValueChange}>
        <SelectTrigger className="dark:bg-gray-700">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-700">
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
