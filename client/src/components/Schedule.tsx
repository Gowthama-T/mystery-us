import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, ChevronRight, Flower2, PartyPopper, Trophy, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Schedule as ScheduleType } from "@shared/schema";

const iconMap: Record<string, typeof Flower2> = {
  "neon-gold": Flower2,
  "neon-cyan": PartyPopper,
  "neon-purple": Trophy,
};

function ScheduleSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center p-4">
            <Skeleton className="w-16 h-16 rounded-full mb-3" />
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
      <Card className="glass-card border-0">
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-8 w-48 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
        <div className="p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-4 mb-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TimelineNode({ 
  schedule, 
  index, 
  isActive, 
  onClick 
}: { 
  schedule: ScheduleType; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[schedule.color] || Flower2;

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      onClick={onClick}
      className={`relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
        isActive 
          ? `glass-card neon-glow-${schedule.color === 'neon-cyan' ? 'cyan' : schedule.color === 'neon-purple' ? 'purple' : 'gold'}` 
          : 'hover:glass'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      data-testid={`schedule-day-${schedule.id}`}
    >
      <motion.div
        className={`w-16 h-16 rounded-full glass flex items-center justify-center mb-3 transition-all duration-300 ${
          isActive ? `border-2 border-${schedule.color}` : ''
        }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Icon className={`w-7 h-7 ${isActive ? `text-${schedule.color}` : 'text-muted-foreground'}`} />
      </motion.div>
      <span className={`font-display font-bold ${isActive ? `text-${schedule.color}` : 'text-foreground'}`}>
        {schedule.day}
      </span>
      <span className="text-xs text-muted-foreground mt-1">{schedule.title}</span>
    </motion.button>
  );
}

function ScheduleDetails({ schedule }: { schedule: ScheduleType }) {
  return (
    <motion.div
      key={schedule.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass-card border-0 overflow-hidden">
        <div className={`p-6 border-b border-${schedule.color}/20`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <Badge variant="outline" className={`mb-2 border-${schedule.color}/50 text-${schedule.color}`}>
                {schedule.day}
              </Badge>
              <h3 className="text-2xl font-display font-bold">{schedule.title}</h3>
              <p className="text-muted-foreground">{schedule.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                {schedule.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {schedule.venue}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="relative">
            <div className={`absolute left-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-${schedule.color} via-${schedule.color}/50 to-transparent`} />
            
            <div className="space-y-4">
              {schedule.events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 relative"
                >
                  <div className={`w-6 h-6 rounded-full glass border-2 border-${schedule.color} flex items-center justify-center flex-shrink-0 z-10 bg-background`}>
                    <div className={`w-2 h-2 rounded-full bg-${schedule.color}`} />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className={`text-sm font-medium text-${schedule.color} flex items-center gap-1`}>
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: schedules, isLoading, error } = useQuery<ScheduleType[]>({
    queryKey: ["/api/schedules"],
  });

  const activeSchedule = schedules?.find((s) => s.id === activeDay) || schedules?.[0];

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="schedule-section"
    >
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-neon-gold/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-purple rounded-full"
          >
            Event Timeline
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="schedule-title">
            Event{" "}
            <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-gold bg-clip-text text-transparent">
              Schedule
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on each day to view the detailed schedule
          </p>
        </motion.div>

        {isLoading ? (
          <ScheduleSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load schedule. Please try again later.</p>
          </div>
        ) : schedules && schedules.length > 0 ? (
          <>
            <div className="flex justify-center gap-4 md:gap-8 mb-10 flex-wrap">
              {schedules.map((schedule, index) => (
                <TimelineNode
                  key={schedule.id}
                  schedule={schedule}
                  index={index}
                  isActive={activeDay === schedule.id}
                  onClick={() => setActiveDay(schedule.id)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeSchedule && <ScheduleDetails schedule={activeSchedule} />}
            </AnimatePresence>
          </>
        ) : null}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          * Schedule is tentative and may be subject to minor changes
        </motion.p>
      </div>
    </section>
  );
}
