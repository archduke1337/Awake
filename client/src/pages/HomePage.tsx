import { Link } from "wouter";
import { Sparkles, Zap, Shield, Code2, Brain, MessageSquare, ArrowRight, Flame, Cpu, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { FREE_AI_MODELS } from "@shared/models";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UseCaseCards from "@/components/UseCaseCards";
import TrustIndicators from "@/components/TrustIndicators";

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: "Think Deeper",
      description: "DeepSeek V3.1 with 164K context and hybrid reasoning modes for complex problems that need real thinking"
    },
    {
      icon: Code2,
      title: "Code Like a Pro",
      description: "Specialized coding models designed to understand your entire codebase and generate production-ready code"
    },
    {
      icon: Flame,
      title: "Lightning Speed",
      description: "Ultra-low latency responses from globally distributed servers - no waiting around"
    },
    {
      icon: Lightbulb,
      title: "Creative Thinking",
      description: "Unleash your creativity with models tuned for brainstorming, writing, and ideation"
    },
    {
      icon: Cpu,
      title: "Pure Power",
      description: "45+ models ranging from lightweight to massive - pick what you need, when you need it"
    },
    {
      icon: Zap,
      title: "Zero Friction",
      description: "No paywalls, no rate limits, no corporate nonsense - just you and the models"
    }
  ];

  const useCases = [
    {
      title: "For Developers",
      description: "Code reviews, debugging, architecture planning, and learning new frameworks without the Stack Overflow rabbit hole.",
      icon: Code2,
      color: "indigo",
      emoji: "💻",
      models: ["Qwen3 Coder", "Llama 3.1", "GPT-OSS"]
    },
    {
      title: "For Researchers",
      description: "Literature summaries, data analysis, hypothesis generation, and turning months of work into actually productive hours.",
      icon: Brain,
      color: "purple",
      emoji: "🔬",
      models: ["DeepSeek V3.1", "Tongyi DeepResearch", "Nemotron"]
    },
    {
      title: "For Content Creators",
      description: "Brainstorming, copywriting, editing, and beating creative block without sounding like a robot wrote it.",
      icon: Sparkles,
      color: "pink",
      emoji: "✍️",
      models: ["Claude", "Mistral", "Qwen"]
    },
    {
      title: "For Students",
      description: "Learning explanations, homework help, essay outlining, and actually understanding concepts instead of memorizing.",
      icon: Lightbulb,
      color: "cyan",
      emoji: "🎓",
      models: ["Gemini 2.0", "Llama 3.1", "DeepSeek"]
    }
  ];

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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/50"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <Link href="/">
              <a className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                Awake
              </a>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link href="/explore">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</a>
              </Link>
              <Link href="/docs">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
              </Link>
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              </Link>
            </nav>
            
            <ThemeToggle />
            
            <SignedOut>
              <Link href="/login">
                <Button variant="ghost" data-testid="button-login" className="hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button data-testid="button-signup" className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                  Chat
                </Button>
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-colors"
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/30 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-2 inline" />
              45+ Free AI Models Available
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-black tracking-tighter leading-tight"
          >
            Meet your new
            <motion.span
              animate={{ color: ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              thinking partner
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Imagine having access to the world's best AI models – DeepSeek, Qwen, Claude, and more – all for free. 
            No waitlists. No paywalls. No nonsense. Just pure thinking power at your fingertips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4 justify-center pt-4 flex-wrap"
          >
            <Link href="/signup">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-500 hover:shadow-xl hover:shadow-primary/50 text-lg px-8" data-testid="button-hero-start">
                Start Thinking Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8">
                See What's Possible
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm text-muted-foreground/70"
          >
            💡 Psst: No credit card needed. Seriously.
          </motion.p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Real People Choose AWAKE</h2>
          <p className="text-lg text-muted-foreground">
            Because sometimes you just need answers that actually make sense
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full bg-gradient-to-br from-card/50 to-card border-primary/10 hover:border-primary/30 group hover-elevate">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-blue-500 transition-colors" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="mt-3">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
            <CardContent className="p-6">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold text-primary mb-2"
              >
                45+
              </motion.div>
              <p className="text-muted-foreground">Free AI Models</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
            <CardContent className="p-6">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="text-4xl font-bold text-blue-500 mb-2"
              >
                ∞
              </motion.div>
              <p className="text-muted-foreground">Zero Usage Limits</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
            <CardContent className="p-6">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="text-4xl font-bold text-purple-500 mb-2"
              >
                $0
              </motion.div>
              <p className="text-muted-foreground">Cost Forever</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Use Cases Section */}
      <UseCaseCards useCases={useCases} />

      {/* Trust Indicators Section */}
      <TrustIndicators />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/80 via-blue-500/80 to-purple-500/80 text-white border-0 backdrop-blur overflow-hidden relative">
            <div className="absolute inset-0 -z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
              />
            </div>
            <CardContent className="p-12 text-center relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Wake Up?</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Stop settling for limited AI. Start using the best models the world has to offer.
                Join the awakening in seconds – no barriers, no corporate theater.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 gap-2 text-lg px-8 font-semibold shadow-xl">
                  Claim Your Free Access
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-white/70 text-sm mt-6">
                ✨ Already exploring? <Link href="/login"><a className="underline hover:text-white">Sign in here</a></Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">Awake</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Think bigger. Code faster. Dream wilder.
              </p>
            </motion.div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features"><a className="hover:text-primary">Features</a></Link></li>
                <li><Link href="/explore"><a className="hover:text-primary">Explore</a></Link></li>
                <li><Link href="#"><a className="hover:text-primary">Pricing</a></Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#"><a className="hover:text-primary">Docs</a></Link></li>
                <li><Link href="#"><a className="hover:text-primary">Community</a></Link></li>
                <li><Link href="#"><a className="hover:text-primary">Contact</a></Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#"><a className="hover:text-primary">Privacy</a></Link></li>
                <li><Link href="#"><a className="hover:text-primary">Terms</a></Link></li>
                <li><Link href="#"><a className="hover:text-primary">License</a></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 Awake. Built for thinkers, by thinkers. No AI generated nonsense here.
            </p>
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm text-muted-foreground"
            >
              ✨ Stay A
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
