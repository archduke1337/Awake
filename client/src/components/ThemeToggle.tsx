import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="relative hover-elevate active-elevate-2 group"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-400/20 via-transparent to-blue-500/20 blur" />
      
      {/* Sun Icon */}
      <motion.div
        animate={{ rotate: theme === "dark" ? 90 : 0, scale: theme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </motion.div>
      
      {/* Moon Icon */}
      <motion.div
        animate={{ rotate: theme === "light" ? -90 : 0, scale: theme === "light" ? 0 : 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-blue-400" />
      </motion.div>
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
