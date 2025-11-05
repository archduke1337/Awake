import { Link } from "wouter";
import { Sparkles, ChevronRight, Code2, BookOpen, Zap, Shield, MessageSquare, Settings, Lightbulb, Rocket, CheckCircle, Users, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("guides");

  const sections = [
    {
      id: "api-docs",
      title: "API Documentation",
      icon: Code2,
      description: "Future API access for power users",
      content: `
        # AWAKE API - Coming Soon 🚀

        We're building a powerful API to unlock integration possibilities for power users.

        ## Why An API?

        The API will enable developers to:
        - **Build custom integrations** - Connect AWAKE to your existing tools and workflows.
        - **Automate tasks** - Process hundreds of requests programmatically.
        - **Create plugins** - Build AI-powered features for your own products.
        - **Scale operations** - Move beyond the web interface for enterprise use.

        ## API Endpoint Reference (Preview)

        ### Authentication
        All API requests require an API key. Get yours from your account dashboard.

        \`\`\`
        Authorization: Bearer YOUR_API_KEY
        Content-Type: application/json
        \`\`\`

        ### Send a Message
        **POST /api/v1/chat**

        Request body:
        \`\`\`
        {
          "model": "claude-3.5-sonnet",
          "messages": [
            {"role": "user", "content": "What's the meaning of life?"}
          ],
          "temperature": 0.7,
          "max_tokens": 2048
        }
        \`\`\`

        Response:
        \`\`\`
        {
          "id": "msg_abc123",
          "model": "claude-3.5-sonnet",
          "content": "The meaning of life is...",
          "usage": {"input_tokens": 10, "output_tokens": 150}
        }
        \`\`\`

        ### List Available Models
        **GET /api/v1/models**

        Response returns 45+ available models with specs.

        ### Manage Conversations
        **GET /api/v1/conversations** - List all your conversations
        **POST /api/v1/conversations** - Create a new conversation
        **GET /api/v1/conversations/{id}** - Get conversation details
        **DELETE /api/v1/conversations/{id}** - Delete a conversation

        ## Rate Limits

        | Plan | Requests/Minute | Daily Limit | Max Tokens/Request |
        |------|-----------------|-------------|-------------------|
        | Free Tier | 10 | 1,000 | 4,096 |
        | Pro (Future) | 100 | 100,000 | 32,768 |
        | Enterprise | Custom | Custom | Custom |

        ## Authentication Methods

        ### API Key (Recommended)
        Generate in your account settings. Include in Authorization header.

        ### OAuth 2.0
        Coming soon for third-party app integrations.

        ## Error Handling

        All errors return standard HTTP status codes:

        - **200** - Success. Your request worked perfectly.
        - **400** - Bad Request. Check your syntax and parameters.
        - **401** - Unauthorized. Invalid or missing API key.
        - **429** - Rate Limited. Slow down. We apply backoff.
        - **500** - Server Error. We're fixing it. Retry in a few seconds.

        Error response format:
        \`\`\`
        {
          "error": {
            "type": "invalid_request_error",
            "message": "Invalid model specified"
          }
        }
        \`\`\`

        ## Code Examples

        ### Python
        \`\`\`
        import requests

        headers = {
          "Authorization": "Bearer YOUR_API_KEY",
          "Content-Type": "application/json"
        }

        data = {
          "model": "claude-3.5-sonnet",
          "messages": [{"role": "user", "content": "Hello!"}]
        }

        response = requests.post(
          "https://api.awake.ai/v1/chat",
          headers=headers,
          json=data
        )

        print(response.json())
        \`\`\`

        ### JavaScript
        \`\`\`
        const apiKey = "YOUR_API_KEY";

        const response = await fetch("https://api.awake.ai/v1/chat", {
          method: "POST",
          headers: {
            "Authorization": \`Bearer \${apiKey}\`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "claude-3.5-sonnet",
            messages: [{ role: "user", content: "Hello!" }]
          })
        });

        const data = await response.json();
        console.log(data);
        \`\`\`

        ### cURL
        \`\`\`
        curl https://api.awake.ai/v1/chat \\
          -H "Authorization: Bearer YOUR_API_KEY" \\
          -H "Content-Type: application/json" \\
          -d '{
            "model": "claude-3.5-sonnet",
            "messages": [{"role": "user", "content": "Hello!"}]
          }'
        \`\`\`

        ## Webhooks (Coming Soon)

        Get real-time updates without polling:
        - **Message completed** - When a response finishes
        - **Rate limit approaching** - Before you hit limits
        - **Model maintenance** - When models go down

        ## SDKs (Coming Soon)

        - Python SDK
        - JavaScript/TypeScript SDK
        - Go SDK
        - Rust SDK

        ## API Status & Uptime

        - **Current Status**: In Development
        - **Expected Launch**: Q1 2026
        - **Uptime SLA**: 99.5% (after launch)
        - **Status Page**: status.awake.ai

        ## Support

        Have questions about the API?
        - Email: api-support@awake.ai
        - Discord: #api-dev channel
        - Docs: api.awake.ai/docs

        ## Roadmap

        - ✅ Basic Chat API
        - ✅ Model listing & details
        - ✅ Conversation management
        - 🔄 Streaming responses
        - 🔄 File uploads (images, PDFs)
        - 📅 Fine-tuning endpoints
        - 📅 Embeddings API
        - 📅 Vision models support
        - 📅 Function calling
      `
    },
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Rocket,
      description: "Get up and running in under 60 seconds",
      content: `
        # Your Journey Starts Here 🚀

        ## Step 1: Create Your Account
        Sign up with your email or log in with Google. Takes literally 30 seconds. No spam, no BS.

        ## Step 2: Pick Your AI Brain
        Browse through 45+ models. Each one thinks differently. Claude's a philosopher, DeepSeek's a math wizard, Llama's a speedster. Pick your vibe.

        ## Step 3: Start Asking Questions
        Type naturally. Ask anything. No special syntax needed. We handle the heavy lifting behind the scenes.

        ## 💡 Pro Tips Nobody Tells You
        - **Try different models** - Same question, different perspectives. It's wild how much variety exists.
        - **Keep context** - Your conversation remembers everything. Build on previous messages.
        - **Copy and remix** - Copy any AI response and ask follow-ups. Iterate to perfection.
        - **Dark mode exists** - Save your eyes. Thank us later.
      `
    },
    {
      id: "models",
      title: "Choose Your AI Sidekick",
      icon: Code2,
      description: "45+ models, each with superpowers",
      content: `
        # Which AI Should You Talk To? 🤖

        ## The All-Rounders (Try These First)
        **Claude 3.5 Sonnet** - Like talking to your smartest friend. Great at everything. Our personal favorite.
        **Claude 3 Opus** - More powerful than Sonnet but slower. For the complex stuff.

        ## The Reasoning Wizards (Deep Thinkers)
        **DeepSeek V3.1** - Breaks down problems step-by-step. Perfect for logic puzzles, coding, math.
        **QwQ-32B** - Open-source powerhouse. Quick AND smart. Underrated gem.

        ## The Speed Demons (Fast & Capable)
        **Llama 3.1 70B** - 80% of Opus's power, 50% of the wait time.
        **Qwen2.5 72B** - Super responsive. Great for rapid iteration.

        ## The Big Boys (When You Need Firepower)
        **Llama 3.1 405B** - Massive model. Overkill for most things. But wow, it's thorough.

        ## 🎯 Matching Task to Model
        | Task | Use This | Why |
        |------|----------|-----|
        | Writing / Creative | Claude Sonnet | Best prose. Natural flow. |
        | Math / Coding | DeepSeek V3.1 | Logical step-by-step reasoning. |
        | Quick answers | Llama 70B | Fast. Accurate. Done. |
        | Complex reasoning | Opus | Most powerful. Worth the wait. |
        | Learning new topics | Claude Sonnet | Explains concepts beautifully. |

        💡 **Here's the secret**: Try them all. They're free. Find your favorites.
      `
    },
    {
      id: "features",
      title: "What Can You Actually Do?",
      icon: Flame,
      description: "Seriously cool stuff",
      content: `
        # The Features That Matter ⚡

        ## Chat Like You Mean It
        - **Live Streaming** - Watch responses appear in real-time. It's weirdly satisfying.
        - **Perfect Memory** - Conversations are saved forever. Go back anytime.
        - **One-Click Copy** - Copy any response instantly. No right-click nonsense.

        ## Smart Switching
        Halfway through a chat? Want a second opinion? Switch models mid-conversation. Context travels with you. The AI picks up exactly where you left off.

        ## Real Privacy (Not the Fake Kind)
        - **Your data stays yours** - We don't train on your conversations.
        - **No tracking nonsense** - We know what you hate about other AI apps. We don't do that.
        - **Delete anytime** - Your chats, your rules.

        ## Works Everywhere
        Desktop. Mobile. Tablet. Anywhere with a browser. Responsive design that actually works.

        ## No Rate Limits
        Chat as much as you want. No hidden restrictions. No "upgrade to premium." Just go wild.
      `
    },
    {
      id: "troubleshooting",
      title: "Something Weird Happened?",
      icon: Settings,
      description: "We've got solutions",
      content: `
        # Troubleshooting (We've Seen It All) 🔧

        ## "The AI went silent"
        1. Refresh the page (fixes 70% of issues)
        2. Try a different model (maybe it's just having a day)
        3. Check your internet (you'd be surprised)
        4. Contact us if it persists

        ## "My conversation disappeared"
        Don't panic. Make sure you're signed in with the same account. Conversations are tied to your profile.

        ## "Dark mode looks weird"
        Click the sun/moon icon. Your preference saves automatically. If it acts up, refresh.

        ## "Responses are taking forever"
        Popular models get traffic spikes. Try a different one. Llama is usually faster.

        ## "I'm seeing rate limit errors"
        You're either sending messages *really* fast or there's a connectivity blip. Wait 30 seconds and retry.

        ## Still Stuck?
        Real humans at founderofzocav@gmail.com read every message. We respond fast. Seriously.
      `
    }
  ];

  const faqItems = [
    {
      question: "Is this actually free forever?",
      answer: "100%. No tricks. No hidden paywalls. No 'upgrade to pro.' We cover the costs because we believe AI access shouldn't be gatekept. Use it as much as you want.",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      question: "What about my privacy?",
      answer: "Your conversations are yours. We don't train models on them. We don't sell them. We don't share them. If we did that stuff, we'd feel bad. So we just... don't.",
      icon: Shield,
      color: "text-blue-500"
    },
    {
      question: "Can I actually download my chats?",
      answer: "Coming soon! We're building export features. Want PDF? Plain text? We'll make it happen. Just give us a bit.",
      icon: Lightbulb,
      color: "text-yellow-500"
    },
    {
      question: "Which model is the best?",
      answer: "There's no 'best.' Claude crushes creative writing. DeepSeek dominates logic problems. Llama is lightning fast. Try them all. They're all free. Pick your favorite.",
      icon: Sparkles,
      color: "text-purple-500"
    },
    {
      question: "Will you ever build an API?",
      answer: "Probably. Drop us a line if you're interested. We read everything and actually think about feature requests. We're not some black box.",
      icon: Code2,
      color: "text-pink-500"
    },
    {
      question: "Is the AI gonna take my job?",
      answer: "Use it to get better at yours. That's what we think about it. AI is a tool. The people who use it well will thrive. You're already ahead by asking.",
      icon: Rocket,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 dark:to-primary/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-blue-500/5 dark:from-primary/15 dark:to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-purple-500/5 dark:from-blue-500/15 dark:to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 rounded-full blur-3xl"
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
                Awake Docs
              </a>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link href="/">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
              </Link>
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              </Link>
            </nav>
            
            <ThemeToggle />
            
            <SignedOut>
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/50">
                  Chat Now
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Badge variant="outline" className="bg-primary/10 border-primary/40 dark:bg-primary/15 dark:border-primary/50 px-4 py-1.5 backdrop-blur">
              <BookOpen className="h-3.5 w-3.5 mr-2 inline" />
              Learn Everything
            </Badge>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Master AWAKE
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Get started in 60 seconds. Become a power user in an hour. Join thousands who've already figured out how to get the most from their AI.
          </motion.p>
        </motion.div>
      </section>

      {/* Documentation Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">Guides</p>
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm hover:bg-primary/10 dark:hover:bg-primary/20 transition-all group"
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <section.icon className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                    {section.title}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-16"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                  />
                  
                  <Card className="bg-gradient-to-br from-card/60 to-card dark:from-card/40 dark:to-card/20 border-primary/20 dark:border-primary/30 backdrop-blur relative group hover:border-primary/40 dark:hover:border-primary/50 transition-colors overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/30 to-blue-500/30 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <section.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <h2 className="text-2xl font-bold">{section.title}</h2>
                          <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-muted-foreground space-y-4">
                      {section.content.split('\n\n').map((paragraph, i) => {
                        const isBold = paragraph.startsWith('**') || paragraph.startsWith('##');
                        const isCode = paragraph.startsWith('|');
                        
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {isCode ? (
                              <div className="overflow-x-auto bg-black/30 dark:bg-black/50 p-4 rounded-lg text-xs font-mono text-green-400 dark:text-green-300 border border-border/50">
                                {paragraph}
                              </div>
                            ) : (
                              <p className={`leading-relaxed ${isBold ? 'font-semibold text-foreground' : ''}`}>
                                {paragraph
                                  .replace(/^# /g, '')
                                  .replace(/^## /g, '')
                                  .replace(/^- /g, '• ')
                                  .replace(/\*\*/g, '')
                                }
                              </p>
                            )}
                          </motion.div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Lightbulb className="h-12 w-12 text-primary/40" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Got Questions? (We've Got Answers)</h2>
          <p className="text-muted-foreground text-lg">Real answers from real people. Not AI-generated corporate nonsense.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ x: 4 }}
              >
                <Card className="hover-elevate cursor-pointer group border-border/50 dark:border-border/40 hover:border-primary/40 dark:hover:border-primary/50 transition-all overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className={`mt-1 ${item.color} flex-shrink-0`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </motion.div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
                          {item.question}
                        </CardTitle>
                      </div>
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                        className="text-primary/50 group-hover:text-primary transition-colors flex-shrink-0"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.p
                      initial={{ opacity: 0.7 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {item.answer}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            
            <Card className="bg-gradient-to-r from-primary/90 via-blue-500/90 to-purple-500/90 text-white border-0 backdrop-blur overflow-hidden relative">
              <CardContent className="p-12 text-center relative z-10">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Sparkles className="h-12 w-12 text-white/80" />
                </motion.div>
                
                <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  We're real humans. We read every message. We respond fast. No bots, no automated responses.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
                      Email Us
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/20 font-semibold">
                      Discord Community
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 dark:border-border/40 mt-20 bg-gradient-to-b from-background/50 to-background dark:from-background/30 dark:to-background backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/">
                <a className="text-lg font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent inline-block mb-4">
                  Awake
                </a>
              </Link>
              <p className="text-sm text-muted-foreground">AI that feels like talking to a human.</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-4 text-foreground">Docs</p>
              <ul className="space-y-2">
                {sections.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-4 text-foreground">Links</p>
              <ul className="space-y-2">
                <li><Link href="/"><a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a></Link></li>
                <li><Link href="/about"><a className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></Link></li>
                <li><a href="mailto:support@awake.ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-4 text-foreground">Status</p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <Badge className="bg-green-500/30 text-green-600 dark:text-green-400 border-green-500/50">
                  ● All Systems Go
                </Badge>
              </motion.div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 Awake. Built by thinkers, for thinkers. All rights reserved. Designed by humans — no corporations, no surveillance. ✨
            </p>
            <p className="text-xs text-muted-foreground/70">
              <Link href="/"><a className="hover:text-foreground transition-colors">Back to Home</a></Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
