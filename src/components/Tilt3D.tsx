import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}
/** Retains the wrapper API while keeping functional content level. */
const Tilt3D = ({ children, className }: Tilt3DProps) => (
  <div className={cn("relative qs-level-panel", className)}>{children}</div>
);
export default Tilt3D;
