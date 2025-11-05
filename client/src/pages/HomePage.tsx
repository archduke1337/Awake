import { Link } from "wouter";
import { Sparkles, Zap, Shield, Code2, Brain, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { FREE_AI_MODELS } from "@shared/models";

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "45+ Free AI Models",
      description: "Access state-of-the-art models from DeepSeek, Qwen, NVIDIA, OpenAI, and more - all completely free"
    },
    {
      icon: Brain,
      title: "Advanced Reasoning",
      description: "Use models optimized for complex reasoning, coding, research, and multi-step problem solving"
    },
    {
      icon: Code2,
      title: "Code Generation",
      description: "Specialized coding models with up to 262K context length for large repository analysis"
    },
    {
      icon: Zap,
      title: "Zero Cost",
      description: "All models are completely free with no usage limits or hidden charges"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Protected by Clerk with OAuth, email, and social login options"
    },
    {
      icon: MessageSquare,
      title: "Conversation History",
      description: "Your chat history is saved and organized for easy access and continuation"
    }
  ];

  const topModels = FREE_AI_MODELS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-semibold">AWAKE</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <Badge variant="secondary" className="mb-4">
            Powered by OpenRouter
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Chat with the World's Best
            <span className="text-primary"> Free AI Models</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access 45+ cutting-edge AI models including DeepSeek V3.1, Qwen3 Coder, and Kimi K2.
            All free, no limits, no credit card required.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2" data-testid="button-hero-start">
                Start Chatting Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Top Models Showcase */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured AI Models</h2>
          <p className="text-muted-foreground">
            Industry-leading models, available for free
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription className="mt-1">{model.provider}</CardDescription>
                    </div>
                    <Badge variant="outline">{model.contextLength}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {model.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose AWAKE?</h2>
          <p className="text-muted-foreground">
            Everything you need for powerful AI conversations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Join thousands of users already chatting with the world's best AI models.
              Sign up now and start your first conversation in seconds.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">AWAKE Chatbot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AWAKE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
