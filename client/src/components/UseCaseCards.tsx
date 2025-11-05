import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UseCaseItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  models: string[];
  emoji: string;
}

interface UseCaseCardsProps {
  useCases: UseCaseItem[];
}

export default function UseCaseCards({ useCases }: UseCaseCardsProps) {
  return (
    <section className="container mx-auto px-3 sm:px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Built for Your Workflow</h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
          Whether you're coding, creating, researching, or learning – AWAKE has the perfect AI partner for the job.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className={`h-full bg-gradient-to-br from-card to-card/50 border-${useCase.color}/30 hover:border-${useCase.color}/60 group hover:shadow-depth-3 transition-all duration-300 cursor-pointer`}>
                <CardHeader className="p-4 sm:p-6">
                  <div className={`h-12 sm:h-14 w-12 sm:w-14 rounded-lg sm:rounded-xl bg-${useCase.color}/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-${useCase.color}/30 transition-all`}>
                    <span className="text-xl sm:text-2xl">{useCase.emoji}</span>
                  </div>
                  <CardTitle className={`text-lg sm:text-xl group-hover:text-${useCase.color} transition-colors`}>
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs sm:text-sm">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {useCase.models.map((model, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className={`bg-${useCase.color}/10 text-${useCase.color} hover:bg-${useCase.color}/20 text-xs`}
                      >
                        {model}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
