import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Clock, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

function Particle({ delay, duration, size, startX, startY }: { delay: number; duration: number; size: number; startX: number; startY: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-neon-cyan/40 to-neon-purple/40"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      animate={{
        y: [0, -100, -200],
        x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function GlowingOrb({ className, color }: { className: string; color: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingCube() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="relative w-48 h-48 md:w-64 md:h-64"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[
          { transform: "translateZ(80px)", bg: "from-neon-purple/30 to-neon-cyan/30" },
          { transform: "translateZ(-80px) rotateY(180deg)", bg: "from-neon-gold/30 to-neon-purple/30" },
          { transform: "rotateY(90deg) translateZ(80px)", bg: "from-neon-cyan/30 to-neon-gold/30" },
          { transform: "rotateY(-90deg) translateZ(80px)", bg: "from-neon-purple/30 to-neon-pink/30" },
          { transform: "rotateX(90deg) translateZ(80px)", bg: "from-neon-gold/30 to-neon-cyan/30" },
          { transform: "rotateX(-90deg) translateZ(80px)", bg: "from-neon-pink/30 to-neon-purple/30" },
        ].map((face, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-40 h-40 md:w-48 md:h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-card bg-gradient-to-br ${face.bg} border border-neon-purple/30 rounded-lg flex items-center justify-center`}
            style={{
              transform: face.transform,
              backfaceVisibility: "visible",
            }}
          >
            {i === 0 && (
              <span className="font-display text-lg md:text-xl font-bold text-neon-cyan neon-text-cyan">
                Mystery-us
              </span>
            )}
            {i === 1 && (
              <span className="font-display text-base md:text-lg font-bold text-neon-gold neon-text-gold">
                BIT - MCA
              </span>
            )}
            {i === 2 && (
              <span className="text-neon-purple text-2xl md:text-3xl">?</span>
            )}
            {i === 3 && (
              <span className="text-neon-cyan text-2xl md:text-3xl">2025</span>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-12-11T09:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4" data-testid="countdown-timer">
      {timeUnits.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className="glass-card p-3 md:p-4 rounded-lg min-w-[70px] md:min-w-[80px] text-center animate-pulse-glow"
        >
          <motion.span
            key={unit.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="block text-2xl md:text-3xl font-display font-bold text-neon-cyan"
          >
            {unit.value.toString().padStart(2, "0")}
          </motion.span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.5,
    duration: 4 + Math.random() * 4,
    size: 4 + Math.random() * 8,
    startX: Math.random() * 100,
    startY: 80 + Math.random() * 20,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 pointer-events-none">
        <GlowingOrb className="w-96 h-96 -top-48 -left-48" color="hsl(280 100% 60% / 0.15)" />
        <GlowingOrb className="w-80 h-80 top-1/4 -right-40" color="hsl(185 100% 50% / 0.12)" />
        <GlowingOrb className="w-64 h-64 bottom-20 left-1/4" color="hsl(45 100% 55% / 0.1)" />
        
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        <motion.div
          className="absolute top-20 right-20 w-2 h-2 rounded-full bg-neon-cyan"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 left-32 w-1.5 h-1.5 rounded-full bg-neon-purple"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-40 right-40 w-2 h-2 rounded-full bg-neon-gold"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-cyan rounded-full">
                December 11-13, 2025
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-4"
              data-testid="hero-title"
            >
              <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-gold bg-clip-text text-transparent">
                Mystery-us
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-foreground/90">
                2025
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-2"
            >
              Ethnic Day, Freshers Party & Sports
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm md:text-base text-muted-foreground/80 mb-6"
            >
              MCA Department, Bangalore Institute of Technology
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-neon-cyan/90 font-medium mb-8 italic"
              data-testid="hero-tagline"
            >
              "Where Curiosity Meets Celebration"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("register")}
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-semibold px-8 rounded-full neon-glow-purple transition-all duration-300"
                data-testid="button-register-hero"
              >
                Register Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("schedule")}
                className="border-neon-cyan/50 text-neon-cyan rounded-full glass"
                data-testid="button-schedule-hero"
              >
                View Schedule
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
            >
              {[
                { icon: Calendar, title: "Ethnic Day", date: "Dec 11", detail: "Venue 621", color: "neon-gold" },
                { icon: Clock, title: "Freshers Party", date: "Dec 12", detail: "10:30 AM", color: "neon-cyan" },
                { icon: Shirt, title: "Sports Carnival", date: "Dec 13", detail: "5 Events", color: "neon-purple" },
              ].map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass-card p-4 rounded-lg text-center group"
                  data-testid={`event-card-${i}`}
                >
                  <event.icon className={`w-5 h-5 mx-auto mb-2 text-${event.color}`} />
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className={`text-${event.color} text-sm font-display`}>{event.date}</p>
                  <p className="text-xs text-muted-foreground">{event.detail}</p>
                </motion.div>
              ))}
            </motion.div>

            <CountdownTimer />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <FloatingCube />
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/60 hover:text-neon-cyan transition-colors"
          data-testid="scroll-down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </section>
  );
}
