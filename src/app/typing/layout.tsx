interface TypingLayoutProps {
  children: React.ReactNode;
}

import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }: TypingLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="flex flex-row mx-auto max-w-screen-2xl p-4">
        <Sidebar />

        <div id="game-board" className="flex-grow p-4 flex justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
}
