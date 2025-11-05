import ThemeToggle from "../ThemeToggle";
import { ThemeProvider } from "@/lib/theme-provider";

export default function ThemeToggleExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="p-8 bg-background">
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">Toggle theme:</span>
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}
