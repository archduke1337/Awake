import { Link } from "wouter";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import ModelExplorer from "@/components/ModelExplorer";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 dark:to-primary/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 dark:border-border/40 backdrop-blur-sm bg-background/80 dark:bg-background/70 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm"
                className="gap-1 sm:gap-2 hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <span className="text-xs sm:text-sm text-muted-foreground">|</span>
            <Link href="/">
              <a className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                AWAKE
              </a>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            
            <SignedOut>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="text-xs sm:text-sm bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Link href="/chat">
                <Button size="sm" className="text-xs sm:text-sm bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                  Chat
                </Button>
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-colors"
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <ModelExplorer />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 sm:mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2025 AWAKE. Built for thinkers, by thinkers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
