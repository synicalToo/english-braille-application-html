interface TypingLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: TypingLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div>{children}</div>
    </main>
  );
}
