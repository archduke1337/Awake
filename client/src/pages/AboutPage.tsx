import { Link } from "wouter";
import { Sparkles, ArrowRight, Github, Twitter, Mail, Zap, Shield, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Speed First",
      description: "We believe thinking shouldn't be delayed. Ultra-low latency from global servers."
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your conversations are yours. End-to-end encrypted, never sold, never trained on."
    },
    {
      icon: Code2,
      title: "Open Philosophy",
      description: "Built on open standards. Transparent pricing. No lock-in nonsense."
    }
  ];

  const team = [
    {
      name: "Aditya Yadav",
      role: "Founder & AI Researcher",
      image: <span role="img" aria-label="sparkles">✨</span>,
      social: { github: "https://github.com/adityayadav", linkedin: "https://linkedin.com/in/adityayadav" }
    },
    {
      name: "Gaurav Yadav",
      role: "Front End Developer",
      image: <span role="img" aria-label="rocket">🚀</span>,
      social: { github: "https://github.com/archduke1337", linkedin: "https://linkedin.com/in/gurvv" }
    },
    {
      name: "Sahil Mane",
      role: "Full Stack Developer",
      image: <span role="img" aria-label="rocket">🚀</span>,
      social: { github: "https://github.com/sahilmane69", linkedin: "https://linkedin.com/in/sahilmane" }
    },
    {
      name: "Salman Shaikh",
      role: "Product Designer",
      image: <span role="img" aria-label="palette">🎨</span>,
      social: { dribbble: "https://dribbble.com/salmanshaikh", linkedin: "https://linkedin.com/in/salmanshaikh" }
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
              <Link href="/docs">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
              </Link>
              <Link href="/">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
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
                  Chat
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/30 px-4 py-1.5">
            Our Story
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            We Built Awake Because
            <span className="block text-primary mt-2">Thinking Shouldn't Cost Money</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            In a world of walled gardens and paywalls, we decided to do something different. 
            Awake or answer to the question: What if AI was actually accessible to everyone?
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
                We believe the world's best AI models should be free and accessible to everyone. 
                Not locked behind $20/month subscriptions. Not gatekept by tech giants. 
                Not requiring corporate approval.
              </p>
              <p className="text-lg text-primary font-semibold">
                Our mission is to democratize access to artificial intelligence and help humanity think bigger.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Our Values</h2>
          <p className="text-muted-foreground">What drives everything we do</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-card/50 to-card border-primary/10 hover:border-primary/30 group hover-elevate">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
                    <value.icon className="h-6 w-6 text-primary group-hover:text-blue-500 transition-colors" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription className="mt-3">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Built by Builders</h2>
          <p className="text-muted-foreground">A small team of passionate AI enthusiasts</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center group hover-elevate">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Built With Love ❤️</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Modern tech for real problems</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Express.js", "Clerk Auth", "OpenRouter API", "Drizzle ORM"].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge className="bg-gradient-to-br from-primary/20 to-blue-500/20 text-primary hover:bg-primary/30 text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 border border-primary/30 hover:border-primary/50 transition-all">
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </section>

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
              <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                We're just getting started. Help us build the future of accessible AI.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 gap-2 text-lg px-8 font-semibold">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 gap-2 text-lg px-8">
                    Read the Docs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">AWAKE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Democratizing AI access, one model at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/"><a className="hover:text-primary">Home</a></Link></li>
                <li><Link href="/about"><a className="hover:text-primary">About</a></Link></li>
                <li><Link href="/docs"><a className="hover:text-primary">Docs</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary flex items-center gap-2"><Github className="h-4 w-4" /> GitHub</a></li>
                <li><a href="#" className="hover:text-primary flex items-center gap-2"><Twitter className="h-4 w-4" /> Twitter</a></li>
                <li><a href="#" className="hover:text-primary flex items-center gap-2"><Mail className="h-4 w-4" /> Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Awake. Open, transparent, human-first. ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
