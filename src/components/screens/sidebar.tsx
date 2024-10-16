"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useState } from "react";

import BrailleBox from "@/components/braille-box";
import BrailleData from "@/components/data/braille-data";

export const Sidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <Image src="/logo.png" alt="AT&D Lab Logo" width={36} height={36} className="mr-2" />
        <a href="https://atdlab.jp/index.html#contact" className="text-lg font-semibold">
          AT&D Lab.
        </a>
      </div>
      <div className="flex-1 px-3 ">
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
          {BrailleData.map((section) => (
            <AccordionItem key={section.heading} value={section.heading} className="w-full border-b dark:border-gray-600">
              <AccordionTrigger
                onClick={() => toggleItem(section.heading)}
                className={cn(
                  "custom-accordion-trigger text-lg font-semibold p-3 w-full hover:border-4 hover:border-blue-300",
                  `${openItems.includes(section.heading) ? "bg-blue-200 dark:bg-gray-700" : "bg-white dark:bg-gray-700"}`
                )}
              >
                {section.heading}
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="p-4 flex flex-wrap">
                  {section.items.map((item) => (
                    <div key={item.title} className={cn("flex flex-col mb-2", item.className)}>
                      <span className="text-lg font-bold text-center bg-gray-200">{item.title}</span>
                      <div className="flex p-2 items-center justify-center">
                        {item.content.split("").map((char, index) => (
                          <BrailleBox key={index}>
                            <span className="text-black text-4xl">{char}</span>
                          </BrailleBox>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
