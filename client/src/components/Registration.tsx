import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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
  const [openModal, setOpenModal] = useState(false);

  return (
    <section
      id="register"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/******** Background Animation ********/}
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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Register for{" "}
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-gold bg-clip-text text-transparent">
              Mystery-us
            </span>
          </h2>
        </motion.div>

        {/******** Main Card ********/}
        <Card className="glass-card border-0 overflow-hidden relative p-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-cyan/20"
          />

          <div className="relative z-10 text-center">
            <motion.div
              className="w-24 h-24 rounded-full glass flex items-center justify-center mx-auto mb-6 animate-pulse-glow-purple"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-neon-purple" />
            </motion.div>

            <p className="text-muted-foreground mb-6 text-sm">
              Click below to choose your event registration type.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-semibold px-10 py-6 text-lg rounded-full neon-glow-purple group"
                onClick={() => setOpenModal(true)}
              >
                Fill Registration Form
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </Card>

        {/******** MODAL ********/}
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-[9999]"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-black/40 glass-card border border-white/10 p-10 rounded-3xl shadow-2xl w-[90%] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center text-2xl font-bold mb-8 text-white">
                Choose Registration Type
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {/******** Each Card ********/}
                {[
                  {
                    title: "Main Registration",
                    desc: "Participation for all 3 days",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLScHPi0NbYVK8wNbjdsDSHIikNP4EGOgpY3ME_rhVWSv3Wkh5w/viewform?usp=header",
                  },
                  {
                    title: "Cultural Events",
                    desc: "Dance · Singing · Skit · Talent",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLSd5sdg09pujlqy8Iuh_x_7CbZcZNZASjuv3qnBYHwj5xMej3g/viewform?usp=header",
                  },
                  {
                    title: "Sports",
                    desc: "Cricket · Volleyball · Tug of War",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLSfjRDBUuMCv9YVCyGqLlHDREWvCpWeOR5k-p1OXtirDQUYY9Q/viewform?usp=header",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, rotateY: 8 }}
                    className="p-6 rounded-2xl glass cursor-pointer text-center border border-white/10 neon-glow-purple"
                    onClick={() => window.open(card.link, "_blank")}
                  >
                    <h4 className="font-bold text-xl mb-2 text-white">{card.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
                    <Button className="rounded-full px-6 py-2 bg-neon-cyan text-black font-bold">
                      Register
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-neon-cyan underline" onClick={() => setOpenModal(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
