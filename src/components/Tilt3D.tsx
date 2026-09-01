import { useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt degrees
  glare?: boolean;
}

/**
 * Lightweight 3D tilt wrapper using CSS transforms — no extra deps.
 * Tracks pointer over the element and applies perspective rotation.
 */
const Tilt3D = ({ children, className, max = 8, glare = true }: Tilt3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 2 * max;
    const rotX = -(y - 0.5) * 2 * max;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, hsl(var(--primary) / 0.18), transparent 50%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "relative transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform",
        className,
      )}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
        />
      )}
    </div>
  );
};

export default Tilt3D;
