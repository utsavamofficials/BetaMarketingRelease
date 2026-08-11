import { motion } from "framer-motion";

const FLOWER_COLORS = [
  "#f59e0b", // saffron
  "#f97316", // orange
  "#ef4444", // red
  "#ec4899", // pink
  "#facc15", // yellow
  "#fb7185", // rose
];

const flowers = Array.from({ length: 120 }, (_, i) => {
  const angle = Math.random() * Math.PI * 2;

  // Much larger explosion radius
  const distance = 350 + Math.random() * 850;

  return {
    id: i,

    x: Math.cos(angle) * distance,

    // Give some petals a stronger downward trajectory
    y: Math.sin(angle) * distance + 150 + Math.random() * 300,

    rotate: Math.random() * 1080 - 540,

    scale: 0.7 + Math.random() * 1.3,

    delay: Math.random() * 0.5,

    duration: 2.5 + Math.random() * 2,

    size: 10 + Math.random() * 16,

    color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
  };
});

export function FlowerBurst() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Explosion origin */}
      <div className="absolute left-1/2 top-[35%]">
        {flowers.map((flower) => (
          <motion.span
            key={flower.id}
            className="absolute block"
            style={{
              width: flower.size,
              height: flower.size * 0.7,
              backgroundColor: flower.color,

              // Petal shape
              borderRadius: "100% 0 100% 0",

              boxShadow: `
                0 2px 6px ${flower.color}66,
                0 0 10px ${flower.color}22
              `,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              x: flower.x,
              y: flower.y,
              scale: flower.scale,
              opacity: [0, 1, 1, 0],
              rotate: flower.rotate,
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              ease: [0.16, 1, 0.3, 1],

              opacity: {
                duration: flower.duration,
                delay: flower.delay,
                times: [0, 0.08, 0.7, 1],
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
