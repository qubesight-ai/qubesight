import { motion } from "framer-motion";

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
        className="logo-cube-spin relative h-full w-full max-w-10 shrink-0 aspect-square"
        style={{ perspective: 500, transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-full w-full aspect-square"
          style={{
            filter:
              "drop-shadow(0 0 10px hsl(var(--primary) / 0.4)) drop-shadow(0 0 25px hsl(var(--primary) / 0.15))",
          }}
          aria-hidden="true"
        >
          <path
            d="M24 8L40 18V34L24 44L8 34V18L24 8Z"
            fill="url(#frontGrad)"
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M24 8L40 18L24 28L8 18L24 8Z"
            fill="url(#topGrad)"
            stroke="hsl(var(--primary))"
            strokeWidth="0.6"
            strokeLinejoin="round"
            opacity="0.65"
          />
          <path
            d="M40 18V34L24 44V28L40 18Z"
            fill="url(#rightGrad)"
            stroke="hsl(var(--primary))"
            strokeWidth="0.6"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <path
            d="M24 28V44"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
          <path
            d="M24 28L8 18"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
          <path
            d="M24 28L40 18"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
          <circle cx="24" cy="26" r="3.5" fill="url(#glowGrad)">
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle
            cx="24"
            cy="26"
            r="7"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="0.5"
          >
            <animate attributeName="r" values="6;9;6" dur="3s" repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <defs>
            <linearGradient
              id="frontGrad"
              x1="8"
              y1="8"
              x2="40"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.1)" />
            </linearGradient>
            <linearGradient
              id="topGrad"
              x1="8"
              y1="8"
              x2="40"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.22)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.06)" />
            </linearGradient>
            <linearGradient
              id="rightGrad"
              x1="40"
              y1="18"
              x2="24"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="hsl(var(--accent) / 0.15)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.04)" />
            </linearGradient>
            <radialGradient id="glowGrad" cx="24" cy="26" r="5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.7)" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
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
