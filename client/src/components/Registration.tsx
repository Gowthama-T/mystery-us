import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const benefits = [
  "Confirm your participation for all 3 days",
  "Help us plan food, seating & activities better",
  "Get updates & reminders before the event",
  "Be part of the official attendee list",
];

export function Registration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="register"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="registration-section"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
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
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-cyan rounded-full"
          >
            Join Us
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="registration-title">
            Register for{" "}
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-gold bg-clip-text text-transparent">
              Mystery-us
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Help us plan better! Please fill out the registration form so we can arrange 
            everything smoothly for all three days.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-cyan/20 pointer-events-none" />
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center neon-glow-purple"
                    >
                      <FileText className="w-6 h-6 text-neon-purple" />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-bold text-xl">Registration Form</h3>
                      <p className="text-sm text-muted-foreground">Quick & easy process</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3 text-foreground/80"
                      >
                        <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 animate-pulse-glow-purple"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-neon-purple" />
                  </motion.div>

                  <p className="text-muted-foreground mb-6 text-sm">
                    Click the button below to open the registration form
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-semibold px-10 py-6 text-lg rounded-full neon-glow-purple group"
                      onClick={() => {
                        window.open("#registration-form", "_blank");
                      }}
                      data-testid="button-register-form"
                    >
                      Fill Registration Form
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground mt-4">
                    Form Link (to be updated later)
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-gold"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            For any queries regarding registration, contact the coordinators listed below
          </p>
        </motion.div>
      </div>
    </section>
  );
}
