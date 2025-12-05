import { motion } from "framer-motion";
import { Sparkles, Instagram, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" data-testid="footer">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
      
      <motion.div
        className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-neon-purple/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 mb-8 group"
            data-testid="footer-logo"
          >
            <Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" />
            <span className="font-display text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-gold bg-clip-text text-transparent">
              Mystery-us
            </span>
          </motion.button>

          <p className="text-lg text-foreground/80 mb-2 font-medium">
            MCA Department, Bangalore Institute of Technology
          </p>
          <p className="text-muted-foreground mb-8 italic">
            "Designed for the MCA family — where mystery meets memories."
          </p>

          <div className="flex items-center gap-4 mb-8">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center group"
              data-testid="social-instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-neon-pink transition-colors" />
            </motion.a>
            <motion.a
              href="mailto:mca@bit.edu.in"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center group"
              data-testid="social-email"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
            </motion.a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
            {["Home", "About", "Days & Events", "Sports", "Schedule", "Register"].map((item) => (
              <motion.button
                key={item}
                onClick={() => {
                  const id = item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
                  const element = document.getElementById(id === "home" ? "home" : id === "days-events" ? "days" : id);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ color: "hsl(185 100% 50%)" }}
                className="transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>

          <div className="pt-8 border-t border-border/30 w-full max-w-xl">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
              <span>© 2025 Mystery-us. All Rights Reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3.5 h-3.5 text-neon-pink fill-neon-pink" /> by MCA Students
              </span>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            variant="outline"
            onClick={scrollToTop}
            className="rounded-full glass border-neon-purple/30 neon-glow-purple"
            data-testid="scroll-to-top"
          >
            <ArrowUp className="w-5 h-5 text-neon-purple" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
