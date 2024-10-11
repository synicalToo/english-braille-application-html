import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DottedSeparator } from "./dotted-separator";

export default function MainSidebarComponent() {
  return (
    <div className=" rounded-lg p-5 w-1/3">
      <div className="flex flex-row items-center justify-center space-x-3">
        <Image src={"/logo.png"} alt="logo" width={36} height={36} />
        <a className="pt-2" href="https://atdlab.jp">
          AT&D Lab.
        </a>
      </div>
      <div className="pt-3">
        <DottedSeparator color="#3b3b" dotSize="4px" />
        <Accordion type="multiple">
          <AccordionItem value="alphabets">
            <AccordionTrigger>Alphabets</AccordionTrigger>
            <AccordionContent>Item - 1</AccordionContent>
          </AccordionItem>

          <AccordionItem value="numbers">
            <AccordionTrigger>Numbers</AccordionTrigger>
            <AccordionContent>Item - 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
