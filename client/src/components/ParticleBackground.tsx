import { motion } from "framer-motion";

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, #2a1f3d 0%, #1a1625 100%)",
        }}
        animate={{
          background: [
            "radial-gradient(circle at center, #2a1f3d 0%, #1a1625 100%)",
            "radial-gradient(circle at center, #1f2a3d 0%, #161a25 100%)",
            "radial-gradient(circle at center, #2a1f3d 0%, #1a1625 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.3,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
