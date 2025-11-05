import { Switch, Route, Redirect } from "wouter";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/pages/not-found";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Authentication will not work until configured.");
}

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  return (
    <>
      <SignedIn>
        <Component />
      </SignedIn>
      <SignedOut>
        <Redirect to="/login" />
      </SignedOut>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/chat">
        <ProtectedRoute component={ChatPage} />
      </Route>
      <Route path="/profile">
        <ProtectedRoute component={ProfilePage} />
      </Route>
      <Route path="/account">
        <ProtectedRoute component={AccountPage} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="awake-theme">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
