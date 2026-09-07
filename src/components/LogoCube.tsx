import { motion } from "framer-motion";
import qubeSightMark from "@/assets/qubesight-mark.webp";

interface LogoCubeProps {
  className?: string;
}

const LogoCube = ({ className = "" }: LogoCubeProps) => {
  return (
    <motion.div
      className={`group/logo relative flex h-full w-full min-w-0 items-center gap-2 leading-none sm:gap-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative h-full w-full max-w-10 shrink-0 aspect-square"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <img
          src={qubeSightMark}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-contain"
          draggable={false}
        />
      </motion.div>

      <motion.span
        className="logo-text-mobile whitespace-nowrap font-display text-lg font-bold tracking-normal text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl"
        whileHover={{ scale: 1.02 }}
        style={{
          textShadow: "0 0 20px hsl(var(--primary) / 0.15)",
          transition: "text-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textShadow =
            "0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textShadow = "0 0 20px hsl(var(--primary) / 0.15)";
        }}
      >
        QubeSight
      </motion.span>
    </motion.div>
  );
};

export default LogoCube;
