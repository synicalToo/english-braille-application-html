import Image from "next/image";
import { BrailleEncoding, BrailleEncodings } from "@/contents/en/brailleData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BrailleFont } from "../customUI/brailleFont";

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
                  <table className="w-full border-collapse">
                    <tbody>
                      {content
                        .reduce((rows: any[], entry: BrailleEncoding, index: number) => {
                          if (index % 5 === 0) rows.push([]);
                          if (entry.title || entry.symbol) {
                            rows[rows.length - 1].push(
                              <td key={index} className="p-2 text-center">
                                <p className="pb-1">{entry.title}</p>
                                <BrailleFont>{entry.brailleText}</BrailleFont>
                              </td>
                            );
                          }
                          return rows;
                        }, [])
                        .map((row, rowIndex) => (
                          <tr key={rowIndex}>{row}</tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
