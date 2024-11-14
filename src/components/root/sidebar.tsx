import Image from "next/image";
import { BrailleEncodings, AllBrailleUnicode } from "@/contents/en/brailleData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BrailleFont } from "../customUI/brailleFont";

function getUnicodeFromKeystrokes(keystrokes: string[]): string {
  return keystrokes.map((key) => AllBrailleUnicode[key]).join("");
}

export function Sidebar() {
  return (
    <div className="p-4">
      <div id="sidebar-logo">
        <a className="flex space-x-2 justify-center">
          <Image src="/images/logo.png" alt="AT&D Lab. Logo" width={48} height={48} />
          <p className="text-2xl font-medium self-center pt-2">AT&D Lab.</p>
        </a>
      </div>

      <div id="accordion-list" className="mt-4 overflow-auto overflow-x-hidden h-auto">
        <Accordion type="multiple">
          {Object.entries(BrailleEncodings).map(([category, content]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div className="w-full">
                  <div className="flex flex-wrap gap-2 justify-start">
                    {content.map((entry: any, index: number) =>
                      entry.title || entry.symbol ? (
                        <div key={index} className="flex flex-col items-center min-w-[80px] w-[calc(20%-8px)] p-1 h-[80px] justify-between">
                          <p className="text-sm text-center line-clamp-2 h-[40px] flex items-center">{entry.symbol || entry.title}</p>
                          <BrailleFont>{getUnicodeFromKeystrokes(entry.keystroke)}</BrailleFont>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
