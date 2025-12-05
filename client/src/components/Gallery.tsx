import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Image, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const galleryItems = [
  { id: 1, category: "Ethnic Day", aspect: "aspect-square" },
  { id: 2, category: "Performances", aspect: "aspect-video" },
  { id: 3, category: "Sports", aspect: "aspect-square" },
  { id: 4, category: "Freshers", aspect: "aspect-video" },
  { id: 5, category: "Group Photo", aspect: "aspect-square" },
  { id: 6, category: "Cultural", aspect: "aspect-square" },
];

function GalleryCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const gradients = [
    "from-neon-purple/30 via-neon-cyan/20 to-neon-gold/30",
    "from-neon-cyan/30 via-neon-gold/20 to-neon-purple/30",
    "from-neon-gold/30 via-neon-purple/20 to-neon-cyan/30",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, rotate: Math.random() > 0.5 ? 1 : -1 }}
      className="group cursor-pointer"
    >
      <Card className={`glass-card border-0 overflow-hidden ${item.aspect} relative`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 3]}`} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 rounded-full glass flex items-center justify-center"
          >
            <Camera className="w-7 h-7 text-muted-foreground" />
          </motion.div>
          <p className="text-sm font-medium text-foreground/80">{item.category}</p>
          <p className="text-xs text-muted-foreground">Photo coming soon</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-neon-purple/20 flex items-center justify-center"
        >
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <Image className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm">View</span>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-testid="gallery-section"
    >
      <motion.div
        className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-neon-purple/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase glass-card text-neon-purple rounded-full"
          >
            Memories
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="gallery-title">
            Event{" "}
            <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-gold bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Capturing the moments that make Mystery-us unforgettable
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="glass-card border-0 p-8 inline-block max-w-md">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 mx-auto mb-4 rounded-full glass flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-neon-gold" />
            </motion.div>
            <h3 className="font-display font-semibold text-lg mb-2">Photos Coming Soon!</h3>
            <p className="text-sm text-muted-foreground">
              This gallery will be updated with photos from the event. 
              Stay tuned for amazing memories!
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
