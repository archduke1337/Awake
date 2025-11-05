import { useUser } from "@clerk/clerk-react";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Mail, User as UserIcon, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AccountPage() {
  const { user, isLoaded } = useUser();

  // Load conversation count for stats
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await fetch("/api/conversations");
      if (!response.ok) throw new Error("Failed to load conversations");
      return response.json();
    },
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-semibold">AWAKE</span>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Please sign in to view your account.</p>
            <Link href="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-semibold">AWAKE</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Account Overview</h1>
            <p className="text-muted-foreground">
              View your account information and manage settings
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your basic account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                  <AvatarFallback className="text-lg">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">
                      {user.username || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.createdAt!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>Your conversation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Conversations</p>
                  <p className="text-sm text-muted-foreground">
                    {conversations.length} chat session{conversations.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/profile">
                <Button variant="outline" className="w-full justify-start">
                  Edit Profile Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
