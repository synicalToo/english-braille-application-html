import Image from "next/image";

import { BrailleFont } from "@/components/customUI/brailleFont";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import { BrailleMappings, BrailleUnicode } from "@/contents/en/customBrailleData";

function getUnicodeFromKeystrokes(keystrokes: string[]): string {
  return keystrokes.map((key) => BrailleUnicode[key]).join("");
}

export function Sidebar() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <a className="flex justify-center space-x-2" href="https://atdlab.jp/">
        <Image src="/images/logo.png" alt="AT&D Lab. Logo" width={48} height={48} />
        <p className="text-2xl font-medium self-center pt-2">AT&D Lab.</p>
      </a>
      <Accordion type="multiple" className="px-2 w-full">
        {Object.entries(BrailleMappings).map(([category]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 justify-between">
                {Object.entries(BrailleMappings[category].content).map(([header, item]) => (
                  <div key={header} className="flex flex-col items-center min-w-[80px] w-[calc(20%-12px)] p-1 justify-between">
                    <p className="text-sm text-center py-1 mb-2">{item.symbol || item.title}</p>
                    <BrailleFont>{getUnicodeFromKeystrokes(item.keystroke)}</BrailleFont>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <a className="text-lg px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700" href="https://atdlab.jp/#contact" target="_blank">
        Contact Us
      </a>
    </div>
  );
}
