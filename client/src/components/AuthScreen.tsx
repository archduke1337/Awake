import { Sparkles, Lock, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AuthScreen() {
  const features = [
    {
      icon: Sparkles,
      title: "45+ Free AI Models",
      description: "Access DeepSeek V3.1, Qwen3 Coder, Kimi K2, and more"
    },
    {
      icon: Zap,
      title: "Zero Cost",
      description: "All models completely free with no usage limits"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Protected by Clerk with OAuth and social login"
    }
  ];

  const handleSignIn = () => {
    console.log("Sign in clicked");
    // todo: remove mock functionality - integrate Clerk authentication
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-card-border">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">AWAKE Chatbot</CardTitle>
            <CardDescription className="text-base">
              Chat with cutting-edge AI models, completely free
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-accent/50 border border-accent-border"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleSignIn}
              data-testid="button-sign-in"
            >
              <Lock className="mr-2 h-4 w-4" />
              Sign in to continue
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
