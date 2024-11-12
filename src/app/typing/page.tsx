import { BottomBar } from "@/components/root/bottomBar";

export default function TypingPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Braille Typing Practice</h1>
        <div className="mb-4">
          <p>Welcome to the Braille typing practice page</p>
          <BottomBar />
        </div>
      </div>
    </main>
  );
}
