import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import Image from "next/image";
import { BrailleFont } from "@/components/customUI/brailleFont";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BrailleData, BrailleUnicode, Compatibility } from "@/contents/en/BrailleData";

function getUnicodeFromKeystrokes(keystrokes: string[]): string {
  return keystrokes.map((key) => BrailleUnicode[key]).join("");
}

export function Sidebar() {
  const [selectedGrade, setSelectedGrade] = useState<string>("grade_1");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedGradeSelected = localStorage.getItem("gradeSelect");
    if (storedGradeSelected) {
      setSelectedGrade(storedGradeSelected);
    }

    const handleGradeSelectedChange = (event: CustomEvent) => {
      setSelectedGrade(event.detail);
    };
    window.addEventListener("gradeSelectedChanged", handleGradeSelectedChange as EventListener);
    return () => {
      window.removeEventListener("gradeSelectedChanged", handleGradeSelectedChange as EventListener);
    };
  }, []);

  const selectedGradeCompatibility = Compatibility[`grade_${selectedGrade}`];

  function generateSubstrings(input: string): string[] {
    const substrings: string[] = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j <= input.length; j++) {
        substrings.push(input.substring(i, j));
      }
    }
    return substrings;
  }

  const substrings = generateSubstrings(searchQuery.toLowerCase());

  const filteredMappings = Object.entries(BrailleData).reduce((acc, [category, data]) => {
    if (data.compatibility <= selectedGradeCompatibility || data.compatibility === Compatibility.both) {
      const filteredContent = Object.entries(data.content).filter(
        ([header, item]) =>
          searchQuery === "" ||
          (item.symbol && item.symbol.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
          (item.title && item.title.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
          substrings.some((substring) => header.toLowerCase() == substring || (item.symbol && item.symbol.toLowerCase() == substring.toLowerCase()) || (item.title && item.title.toLowerCase() == substring.toLowerCase()))
      );

      if (filteredContent.length > 0) {
        acc[category] = { ...data, content: Object.fromEntries(filteredContent) };
      }
    }
    return acc;
  }, {} as typeof BrailleData);

  return (
    <div className="flex flex-col items-center space-y-2">
      <a className="flex justify-center space-x-2" href="https://atdlab.jp/">
        <Image src="/images/logo.png" alt="AT&D Lab. Logo" width={48} height={48} />
        <p className="text-2xl font-medium self-center pt-2">AT&D Lab.</p>
      </a>
      {/* Search Bar */}
      <div
        className="flex items-center w-5/6 px-4 py-2 border rounded-md mb-1"
        onKeyDown={(e) => e.stopPropagation()} // Prevent key events from propagating
        onKeyUp={(e) => e.stopPropagation()}
      >
        <FaSearch className="w-5 h-5 text-gray-500 mr-2" />
        <input type="text" placeholder="Search..." className="w-full px-2 py-1 text-base border-none focus:ring-0 focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} maxLength={20} />
      </div>
      <Accordion type="multiple" className="px-2 w-full">
        {Object.entries(filteredMappings).map(([category, data]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger>{data.title}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 justify-between">
                {Object.entries(data.content).map(([header, item]) => (
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
