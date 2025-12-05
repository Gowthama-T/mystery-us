import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, GraduationCap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Coordinator } from "@shared/schema";

function CoordinatorCardSkeleton() {
  return (
    <Card className="glass-card border-0 p-6">
      <div className="flex flex-col items-center text-center">
        <Skeleton className="w-20 h-20 rounded-full mb-4" />
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-28 mb-3" />
        <Skeleton className="h-3 w-36" />
      </div>
    </Card>
  );
}

function CoordinatorCard({ 
  person, 
  index 
}: { 
  person: Coordinator;
  index: number;
}) {
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").slice(0, 2);
  };

  const colorMap: Record<string, string> = {
    faculty: "neon-gold",
    student: "neon-cyan",
    tech: "neon-purple",
  };

  const color = colorMap[person.type] || "neon-cyan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group"
    >
      <Card className="glass-card border-0 p-6 h-full relative overflow-visible">
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
          style={{
            background: `radial-gradient(circle at center, hsl(var(--${color}) / 0.1) 0%, transparent 70%)`
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`mb-4 relative`}
          >
            <Avatar className={`w-20 h-20 border-2 border-${color}/50`}>
              <AvatarFallback className={`bg-${color}/20 text-${color} font-display text-lg`}>
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>
            <motion.div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full glass flex items-center justify-center`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {person.type === "faculty" && <GraduationCap className={`w-3.5 h-3.5 text-${color}`} />}
              {person.type === "student" && <Users className={`w-3.5 h-3.5 text-${color}`} />}
              {person.type === "tech" && <span className={`text-xs text-${color}`}>{"</>"}</span>}
            </motion.div>
          </motion.div>

          <h4 className="font-display font-semibold text-lg mb-1">{person.name}</h4>
          <Badge variant="outline" className={`mb-2 border-${color}/30 text-${color}/90 text-xs`}>
            {person.role}
          </Badge>
          
          {person.department && (
            <p className="text-xs text-muted-foreground mb-3">{person.department}</p>
          )}
          {person.year && (
            <p className="text-xs text-muted-foreground mb-3">{person.year}</p>
          )}

          <div className="flex flex-col gap-2 mt-auto pt-2 w-full">
            {person.phone && (
              <a 
                href={`tel:${person.phone}`}
                className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {person.phone}
              </a>
            )}
            {person.email && (
              <a 
                href={`mailto:${person.email}`}
                className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {person.email}
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Coordinators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: coordinators, isLoading, error } = useQuery<Coordinator[]>({
    queryKey: ["/api/coordinators"],
  });

  const facultyCoordinators = coordinators?.filter(c => c.type === "faculty") || [];
  const studentCoordinators = coordinators?.filter(c => c.type === "student") || [];
  const techCoordinators = coordinators?.filter(c => c.type === "tech") || [];

  return (
    <section
      id="coordinators"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="coordinators-section"
    >
      <motion.div
        className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-neon-cyan/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-neon-gold/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
            Meet the Team
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="coordinators-title">
            Event{" "}
            <span className="bg-gradient-to-r from-neon-gold via-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Coordinators
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The amazing team behind Mystery-us 2025
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-16">
            <div>
              <Skeleton className="h-7 w-48 mb-6" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl">
                {[1, 2].map((i) => (
                  <CoordinatorCardSkeleton key={i} />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-7 w-48 mb-6" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <CoordinatorCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load coordinators. Please try again later.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {facultyCoordinators.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-display font-semibold mb-6 flex items-center gap-3"
                >
                  <GraduationCap className="w-6 h-6 text-neon-gold" />
                  Faculty Coordinators
                </motion.h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl">
                  {facultyCoordinators.map((person, index) => (
                    <CoordinatorCard key={person.id} person={person} index={index} />
                  ))}
                </div>
              </div>
            )}

            {studentCoordinators.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-display font-semibold mb-6 flex items-center gap-3"
                >
                  <Users className="w-6 h-6 text-neon-cyan" />
                  Student Coordinators
                </motion.h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {studentCoordinators.map((person, index) => (
                    <CoordinatorCard key={person.id} person={person} index={index} />
                  ))}
                </div>
              </div>
            )}

            {techCoordinators.length > 0 && (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-display font-semibold mb-6 flex items-center gap-3"
                >
                  <span className="text-neon-purple text-lg">{"</>"}</span>
                  Tech & Design Team
                </motion.h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl">
                  {techCoordinators.map((person, index) => (
                    <CoordinatorCard key={person.id} person={person} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
