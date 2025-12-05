import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Trophy, Users, Timer, AlertCircle, Target, Circle, Hand, Dribbble, Dumbbell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Sport } from "@shared/schema";

const sportIcons: Record<string, typeof Trophy> = {
  cricket: Trophy,
  volleyball: Dribbble,
  throwball: Circle,
  tugofwar: Dumbbell,
  wristfight: Hand,
};

function SportCardSkeleton() {
  return (
    <Card className="glass-card border-0 p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
        <Skeleton className="w-6 h-6" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </Card>
  );
}

function SportCard({ sport, index }: { sport: Sport; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent = sportIcons[sport.id] || Trophy;

  const colorClass = sport.color === 'neon-cyan' ? 'text-neon-cyan' : 
                     sport.color === 'neon-purple' ? 'text-neon-purple' : 
                     sport.color === 'neon-gold' ? 'text-neon-gold' : 'text-neon-pink';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          className={`glass-card border-0 overflow-hidden cursor-pointer group transition-all duration-300 ${
            isExpanded ? `neon-glow-${sport.color === 'neon-cyan' ? 'cyan' : sport.color === 'neon-purple' ? 'purple' : 'gold'}` : ''
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid={`sport-card-${sport.id}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-14 h-14 rounded-xl glass flex items-center justify-center`}
                >
                  <IconComponent className={`w-7 h-7 ${colorClass}`} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-display font-bold">{sport.name}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {sport.teamSize}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      {sport.format}
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`text-${sport.color}`}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {sport.highlights.map((highlight) => (
                <Badge 
                  key={highlight} 
                  variant="outline"
                  className={`border-${sport.color}/30 text-${sport.color}/90 text-xs`}
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-6 pt-0 border-t border-${sport.color}/20 mt-2`}>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className={`w-4 h-4 text-${sport.color}`} />
                    Rules & Regulations
                  </h4>
                  <ul className="space-y-2">
                    {sport.rules.map((rule, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-${sport.color} mt-2 flex-shrink-0`} />
                        {rule}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function SportsRules() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: sports, isLoading, error } = useQuery<Sport[]>({
    queryKey: ["/api/sports"],
  });

  return (
    <section
      id="sports"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="sports-section"
    >
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-neon-purple/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-neon-cyan/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-cyan rounded-full"
          >
            Day 3 Sports
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="sports-title">
            Sports &{" "}
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-gold bg-clip-text text-transparent">
              Rules
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on each sport to view detailed rules and regulations
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <SportCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load sports data. Please try again later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sports?.map((sport, index) => (
              <SportCard key={sport.id} sport={sport} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-card p-6 rounded-lg text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-neon-gold" />
            <h4 className="font-display font-semibold">Fair Play</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            All matches will be supervised by referees. Please maintain sportsmanship and respect for fellow players.
            Decisions of the referee will be final.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
