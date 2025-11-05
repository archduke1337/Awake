import { Link } from "wouter";
import { Sparkles, ArrowLeft, Search, TrendingUp, Zap, Brain, Code2, Lightbulb, Flame, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import ModelExplorer from "@/components/ModelExplorer";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingModels = [
    {
      name: "DeepSeek V3.1",
      category: "Reasoning",
      emoji: "🧠",
      description: "Advanced reasoning with 164K context. Perfect for complex problems.",
      useCases: ["Math", "Coding", "Logic", "Research"],
      trending: true,
      badge: "Best Reasoning"
    },
    {
      name: "Claude 3.5 Sonnet",
      category: "All-Rounder",
      emoji: "✨",
      description: "Extremely capable at everything. Your go-to AI sidekick.",
      useCases: ["Writing", "Analysis", "Coding", "Creative"],
      trending: true,
      badge: "Fan Favorite"
    },
    {
      name: "Llama 3.1 70B",
      category: "Speed",
      emoji: "⚡",
      description: "Lightning-fast responses without sacrificing quality.",
      useCases: ["Quick Answers", "Coding", "Learning", "Drafts"],
      trending: true,
      badge: "Fastest"
    },
    {
      name: "Qwen 2.5 72B",
      category: "Coder",
      emoji: "💻",
      description: "Specialized for coding tasks. Understands complex architectures.",
      useCases: ["Code Review", "Debugging", "Refactoring", "Learning"],
      trending: false,
      badge: "Developer's Pick"
    }
  ];

  const useCasesWithModels = [
    {
      title: "💻 Software Development",
      icon: Code2,
      description: "Code generation, debugging, architecture planning, and code reviews.",
      color: "from-blue-500/20 to-cyan-500/20",
      bestModels: ["Qwen 2.5 72B", "DeepSeek V3.1", "Claude 3.5 Sonnet"],
      tips: [
        "Use Qwen for quick code generation",
        "DeepSeek excels at debugging complex issues",
        "Claude provides detailed architectural guidance"
      ]
    },
    {
      title: "📝 Content & Writing",
      icon: Sparkles,
      description: "Blog posts, copywriting, editing, and creative content creation.",
      color: "from-pink-500/20 to-purple-500/20",
      bestModels: ["Claude 3.5 Sonnet", "Mistral Large", "Qwen 2.5 72B"],
      tips: [
        "Claude's prose is naturally flowing and human-like",
        "Perfect for creative brainstorming sessions",
        "Great for editing and tone refinement"
      ]
    },
    {
      title: "🔬 Research & Analysis",
      icon: Brain,
      description: "Literature reviews, data analysis, hypothesis generation, and insights.",
      color: "from-purple-500/20 to-indigo-500/20",
      bestModels: ["DeepSeek V3.1", "Claude 3.5 Sonnet", "Llama 3.1 405B"],
      tips: [
        "DeepSeek's logical reasoning powers through complex analysis",
        "Great for breaking down research papers",
        "Structured thinking perfect for scientific work"
      ]
    },
    {
      title: "🎓 Learning & Education",
      icon: Lightbulb,
      description: "Tutoring, explanations, homework help, and concept clarification.",
      color: "from-emerald-500/20 to-teal-500/20",
      bestModels: ["Claude 3.5 Sonnet", "Llama 3.1 70B", "Gemini 2.0"],
      tips: [
        "Claude explains concepts with clarity and depth",
        "Perfect for patient, step-by-step learning",
        "Great for different learning styles"
      ]
    },
    {
      title: "🚀 Productivity & Automation",
      icon: Zap,
      description: "Task automation, workflows, data processing, and productivity hacks.",
      color: "from-yellow-500/20 to-orange-500/20",
      bestModels: ["Llama 3.1 70B", "Qwen 2.5 72B", "Claude 3.5 Sonnet"],
      tips: [
        "Llama is super fast for automation chains",
        "Great for building complex workflows",
        "Reliable for repetitive task handling"
      ]
    },
    {
      title: "🎨 Creative & Design",
      icon: Flame,
      description: "Brainstorming, conceptualization, design thinking, and innovation.",
      color: "from-red-500/20 to-pink-500/20",
      bestModels: ["Claude 3.5 Sonnet", "Mistral Large", "Qwen 2.5 72B"],
      tips: [
        "Claude is your creative thinking partner",
        "Great for divergent thinking and ideation",
        "Perfect for design thinking frameworks"
      ]
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
        {/* Hero Section */}
        <section className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Explore The AI Models We Offer
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover which AI models work best for your tasks. Find your perfect match and unlock your potential.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search models, use cases, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base rounded-lg border-2 border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="trending" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur p-1">
              <TabsTrigger value="trending" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="usecases" className="gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Use Cases</span>
              </TabsTrigger>
              <TabsTrigger value="allmodels" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">All Models</span>
              </TabsTrigger>
            </TabsList>

            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {trendingModels.map((model, i) => (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="group relative h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-3xl sm:text-4xl">{model.emoji}</span>
                          {model.trending && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                              <Flame className="h-3 w-3 mr-1" /> Trending
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-sm sm:text-base">{model.name}</CardTitle>
                        <Badge variant="outline" className="w-fit text-xs">{model.category}</Badge>
                        {model.badge && (
                          <Badge className="w-fit mt-2 bg-primary/20 text-primary text-xs">{model.badge}</Badge>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-xs sm:text-sm text-muted-foreground">{model.description}</p>
                        
                        <div>
                          <p className="text-xs font-semibold mb-2">Best For:</p>
                          <div className="flex flex-wrap gap-1">
                            {model.useCases.map(useCase => (
                              <Badge key={useCase} variant="secondary" className="text-xs">
                                {useCase}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full text-xs sm:text-sm bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50"
                        >
                          Try {model.name.split(" ")[0]}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Use Cases Tab */}
            <TabsContent value="usecases" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {useCasesWithModels.map((useCase, i) => {
                  const IconComponent = useCase.icon;
                  return (
                    <motion.div
                      key={useCase.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="group relative h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                        <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <CardTitle className="text-sm sm:text-base">{useCase.title}</CardTitle>
                          </div>
                          <CardDescription className="text-xs sm:text-sm">
                            {useCase.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold mb-2">Recommended Models:</p>
                            <div className="space-y-2">
                              {useCase.bestModels.map((model, idx) => (
                                <div key={model} className="flex items-center gap-2 text-xs sm:text-sm">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  <span>{model}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-border/50">
                            <p className="text-xs font-semibold mb-2">💡 Pro Tips:</p>
                            <ul className="space-y-1">
                              {useCase.tips.map((tip, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground">
                                  • {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* All Models Tab */}
            <TabsContent value="allmodels">
              <ModelExplorer />
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10"
          >
            <div className="p-6 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Ready to Explore?
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                Pick a model, any model. They're all free. Start exploring now.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <SignedIn>
                  <Link href="/chat">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                      Start Chatting
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </SignedIn>
                
                <SignedOut>
                  <Link href="/signup">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                      Get Started Free
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </SignedOut>

                <Link href="/docs">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 sm:mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">Product</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                <li><Link href="/chat"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Chat</a></Link></li>
                <li><Link href="/explore"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</a></Link></li>
                <li><Link href="/docs"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                <li><Link href="/about"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></Link></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><Link href="/help"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Help</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">Legal</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                <li><Link href="/privacy"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></Link></li>
                <li><Link href="/terms"><a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">Social</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2025 AWAKE. Built with ❤️ for curious minds everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
