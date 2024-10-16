import { MainContent } from "@/components/screens/main-content";
import { Sidebar } from "@/components/screens/sidebar";

export default function Page() {
  return (
    <div className="flex h-screen flex-col lg:flex-row bg-background bg-white dark:bg-gray-700">
      <div className="flex-grow max-w-[500px] min-w-[500px]">
        <Sidebar />
      </div>
      <div className="w-full lg:w-[900px] p-4">
        <MainContent />
      </div>
    </div>
  );
}
