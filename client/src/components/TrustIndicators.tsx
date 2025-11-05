import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Users, Eye, Zap, Code } from "lucide-react";

interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  emoji: string;
}

const indicators: TrustIndicator[] = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your conversations are encrypted on our servers. We literally can't read them even if we wanted to.",
    emoji: "🔐",
  },
  {
    icon: Eye,
    title: "Privacy First",
    description: "We don't train on your data, sell it, or use it for anything. Your prompts are yours alone.",
    emoji: "👁️",
  },
  {
    icon: Code,
    title: "Open Source Philosophy",
    description: "Our infrastructure relies on open-source models. Transparency matters. Vendor lock-in doesn't.",
    emoji: "🧠",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by developers, for developers. We listen to feedback and ship what matters.",
    emoji: "👥",
  },
  {
    icon: Shield,
    title: "No Corporate Games",
    description: "No dark patterns. No hidden fees. No 'surprise' rate limits. What you see is what you get.",
    emoji: "🛡️",
  },
  {
    icon: Zap,
    title: "Performance You Can Trust",
    description: "Responses in <500ms average. Powered by globally distributed infrastructure.",
    emoji: "⚡",
  },
];

export default function TrustIndicators() {
  return (
    <section className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Built on Trust, Not Hype</h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
          We're tired of AI companies making empty promises. Here's what we actually stand for.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full bg-gradient-to-br from-card/50 to-card/25 border-indigo-500/20 hover:border-indigo-500/50 group hover:shadow-depth-3 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute -top-8 sm:-top-10 -right-8 sm:-right-10 h-16 sm:h-20 w-16 sm:w-20 bg-indigo-500/10 rounded-full group-hover:scale-150 transition-transform duration-300" />
                
                <CardContent className="p-4 sm:p-6 relative">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-3xl sm:text-4xl flex-shrink-0"
                    >
                      {indicator.emoji}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {indicator.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {indicator.description}
                  </p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="mt-3 sm:mt-4 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full origin-left"
                  />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30"
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Our Promise to You</h3>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30">
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3 text-sm sm:text-base">🤝 We Promise:</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>✓ Never sell your data</li>
              <li>✓ Always be transparent about costs</li>
              <li>✓ Support open-source models</li>
              <li>✓ Prioritize your privacy</li>
            </ul>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2 sm:mb-3 text-sm sm:text-base">🚫 We'll Never:</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>✗ Lock you into proprietary models</li>
              <li>✗ Show dark patterns or tricks</li>
              <li>✗ Hide surprise fees in fine print</li>
              <li>✗ Train on your conversations</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
