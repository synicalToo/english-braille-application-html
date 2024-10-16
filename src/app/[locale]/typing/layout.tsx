import { ThemeProvider } from "@/components/theme-provider";

interface TypingLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: TypingLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
