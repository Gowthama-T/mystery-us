import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Heart, Sparkles, Music } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Unity",
    description: "Bringing seniors and juniors together as one MCA family",
    color: "neon-cyan",
  },
  {
    icon: Heart,
    title: "Culture",
    description: "Celebrating diversity, traditions, and shared heritage",
    color: "neon-purple",
  },
  {
    icon: Music,
    title: "Celebration",
    description: "Music, dance, games, and unforgettable moments",
    color: "neon-gold",
  },
  {
    icon: Sparkles,
    title: "New Beginnings",
    description: "Welcoming freshers to their new journey in MCA",
    color: "neon-pink",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="about-section"
    >
      <motion.div
        className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-neon-purple/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-neon-cyan/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-purple rounded-full"
            >
              About the Event
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              data-testid="about-title"
            >
              What is{" "}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Mystery-us?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg mb-6 leading-relaxed"
              data-testid="about-description"
            >
              A celebration of culture, curiosity, and connection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4 text-foreground/80"
            >
              <p>
                <strong className="text-neon-cyan">Mystery-us</strong> is a 3-day celebration organized by the MCA Department 
                of Bangalore Institute of Technology. It's more than just an event — it's where 
                new friendships begin and lasting memories are made.
              </p>
              <p>
                This fest unites seniors and juniors through culture, music, games, sports, and 
                shared experiences. We celebrate who we are, where we come from, and the beautiful 
                diversity we share as one family.
              </p>
              <p>
                It marks the <strong className="text-neon-gold">beginning of new journeys</strong> — 
                welcoming freshers into the MCA family with open arms and open hearts.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className="group"
              >
                <Card className="glass-card p-6 h-full border-0 relative overflow-visible">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
                    style={{
                      background: `radial-gradient(circle at center, hsl(var(--${feature.color}) / 0.15) 0%, transparent 70%)`
                    }}
                  />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg glass flex items-center justify-center mb-4 group-hover:neon-glow-${feature.color === 'neon-cyan' ? 'cyan' : feature.color === 'neon-purple' ? 'purple' : 'gold'} transition-all duration-300`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-block px-8 py-4 rounded-full">
            <p className="text-lg font-medium">
              <span className="text-muted-foreground">Three days of </span>
              <span className="text-neon-cyan">culture</span>
              <span className="text-muted-foreground">, </span>
              <span className="text-neon-purple">chaos</span>
              <span className="text-muted-foreground">, and </span>
              <span className="text-neon-gold">unforgettable memories</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
