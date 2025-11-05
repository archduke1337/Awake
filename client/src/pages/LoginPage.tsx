import { SignIn } from "@clerk/clerk-react";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate cursor-pointer">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-semibold">Awake</span>
            </a>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <SignIn 
          routing="virtual"
          signUpUrl="/signup"
          afterSignInUrl="/chat"
        />
      </div>
    </div>
  );
}
