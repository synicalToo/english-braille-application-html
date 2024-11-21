import Image from "next/image";

import { BrailleFont } from "@/components/customUI/brailleFont";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import { BrailleMappings, BrailleUnicode } from "@/contents/en/customBrailleData";

function getUnicodeFromKeystrokes(keystrokes: string[]): string {
  return keystrokes.map((key) => BrailleUnicode[key]).join("");
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
          {Object.entries(BrailleMappings).map(([category]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div className="w-full">
                  <div className="flex flex-wrap gap-2 justify-start">
                    {Object.entries(BrailleMappings[category].content).map(([header, item]) => (
                      <div key={header} className="flex flex-col items-center min-w-[80px] w-[calc(20%-8px)] p-1 h-[80px] justify-between">
                        <p className="text-sm text-center line-clamp-2 h-[40px] flex items-center">{item.symbol || item.title}</p>
                        <BrailleFont>{getUnicodeFromKeystrokes(item.keystroke)}</BrailleFont>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <hr />
      <div className="flex mt-4 space-x-4">
        <a href="https://atdlab.jp/index.html#contact" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 text-lg text-white bg-gray-600 rounded-md hover:bg-gray-700">
          Contact Us
        </a>
      </div>
    </div>
  );
}
