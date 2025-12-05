import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, Shirt, Trophy, PartyPopper, Flower2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@shared/schema";

const iconMap: Record<string, typeof Flower2> = {
  "neon-gold": Flower2,
  "neon-cyan": PartyPopper,
  "neon-purple": Trophy,
};

const gradientMap: Record<string, string> = {
  "neon-gold": "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
  "neon-cyan": "from-cyan-500/20 via-teal-500/20 to-blue-500/20",
  "neon-purple": "from-purple-500/20 via-violet-500/20 to-fuchsia-500/20",
};

function DecorativeParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-${color}/40`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function DayCardSkeleton() {
  return (
    <Card className="glass-card border-0 overflow-hidden h-full">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <Skeleton className="h-5 w-16 mb-3" />
            <Skeleton className="h-8 w-48 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="w-14 h-14 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
        <Skeleton className="h-20 w-full mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
}

function DayCard({ day, index }: { day: Event; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[day.color] || Flower2;
  const gradient = gradientMap[day.color] || gradientMap["neon-gold"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className={`glass-card relative overflow-hidden h-full border-0 group`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
          <DecorativeParticles color={day.color} />
          
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
              <div>
                <Badge 
                  variant="outline" 
                  className={`mb-3 border-${day.color}/50 text-${day.color}`}
                >
                  {day.day}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-1">
                  {day.title}
                </h3>
                <p className={`text-${day.color} font-medium`}>{day.subtitle}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`w-14 h-14 rounded-xl glass flex items-center justify-center neon-glow-${day.color === 'neon-cyan' ? 'cyan' : day.color === 'neon-purple' ? 'purple' : 'gold'}`}
              >
                <Icon className={`w-7 h-7 text-${day.color}`} />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass p-3 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Date</span>
                </div>
                <p className="font-medium text-sm">{day.date}</p>
              </div>
              <div className="glass p-3 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Venue</span>
                </div>
                <p className="font-medium text-sm">{day.venue}</p>
              </div>
              {day.time && (
                <div className="glass p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Time</span>
                  </div>
                  <p className="font-medium text-sm">{day.time}</p>
                </div>
              )}
              {day.dressCode && (
                <div className="glass p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Shirt className="w-4 h-4" />
                    <span>Dress Code</span>
                  </div>
                  <p className="font-medium text-sm">{day.dressCode}</p>
                </div>
              )}
            </div>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              {day.description}
            </p>
            {day.extendedDescription && (
              <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                {day.extendedDescription}
              </p>
            )}

            {day.sports && day.sports.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {day.sports.map((sport) => (
                  <motion.span
                    key={sport}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full glass border border-${day.color}/30 text-${day.color}`}
                  >
                    {sport}
                  </motion.span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
              {day.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="text-xs text-muted-foreground"
                >
                  {i > 0 && <span className="mr-2">•</span>}
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function DaysEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  return (
    <section
      id="days"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="days-section"
    >
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-neon-gold/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-gold rounded-full"
          >
            3-Day Experience
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="days-title">
            Days &{" "}
            <span className="bg-gradient-to-r from-neon-gold via-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three incredible days of culture, celebration, and sportsmanship
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-gold via-neon-cyan to-neon-purple opacity-30" />
          
          {isLoading ? (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <DayCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Failed to load events. Please try again later.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {events?.map((day, index) => (
                <DayCard key={day.id} day={day} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
