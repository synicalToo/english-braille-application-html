import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomSelectProps {
  title?: string;
  placeholder: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export function CustomSelect({ title, placeholder, options, value, onValueChange }: CustomSelectProps) {
  return (
    <div>
      <h2 className="text-lg pb-2">{title}</h2>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="dark:bg-gray-700">
          <SelectValue placeholder={placeholder} />
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
