import { BottomBar } from "@/components/root/bottomBar";
import { Sidebar } from "@/components/root/sidebar";

export default function TypingPage() {
  return (
    <main className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4 overflow-y-auto h-full">
      <div className="bg-purple-300 w-full md:w-1/4 min-w-[25%] max-w-[25%]">
        <Sidebar />
      </div>
      <div className="bg-red-300 w-full md:w-3/4">
        <BottomBar />
      </div>
    </main>
  );
}
