import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import BrailleBox from "@/components/braille-box";

const tableData = [
  // First row with Japanese characters
  ["ア", "イ", "ウ", "エ", "オ", "カ"],

  // Second row with Braille symbols
  [{ text: "⠁" }, { text: "⠃" }, { text: "⠉" }, { text: "⠋" }, { text: "⠊" }, { text: "⠡" }],
];

export default function SidebarComponent() {
  return (
    <div id="sidebar" className="p-5 w-1/4">
      <h2 className="flex items-center justify-center m-3">
        <Image src={"/logo.png"} alt="logo" width={36} height={36} className="mt-0 me-3" />
        <a href="https://atdlab.jp">AT&D Lab.</a>
      </h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="alphabets">
          <AccordionTrigger>Alphabets</AccordionTrigger>
          <AccordionContent>
            <table className="text-center">
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      // Check if the cell is an object (i.e., has special attributes like className)
                      if (typeof cell === "object") {
                        return (
                          <td key={cellIndex}>
                            <BrailleBox>{cell.text}</BrailleBox>
                          </td>
                        );
                      }

                      // Simple string cell (no special attributes)
                      return <td key={cellIndex}>{cell}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
