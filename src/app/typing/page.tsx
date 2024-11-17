import { BottomBar } from "@/components/root/bottomBar";
import Screen from "@/components/root/screen";
import { ScreenTwo } from "@/components/root/screen2.0";
import { ScreenThree } from "@/components/root/screen3.0";
import { Sidebar } from "@/components/root/sidebar";

export default function TypingPage() {
  return (
    <main className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4 overflow-y-auto h-full dark:bg-gray-500">
      <div className="w-full md:w-1/4 min-w-[25%] max-w-[25%]">
        <Sidebar />
      </div>
      <div className="w-full md:w-3/4">
        {/* <Screen /> */}
        {/* <ScreenTwo /> */}
        <ScreenThree />
        <BottomBar />
      </div>
    </main>
  );
}
