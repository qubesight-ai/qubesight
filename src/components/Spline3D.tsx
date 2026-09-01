import { Suspense, lazy, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface Spline3DProps {
  scene: string;
  className?: string;
}

/**
 * Lazy-loaded Spline 3D scene wrapper with graceful fallback.
 * Pass any public Spline scene URL (e.g. https://prod.spline.design/XXXX/scene.splinecode).
 */
const Spline3D = ({ scene, className }: Spline3DProps) => {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={className}
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={className}>
      <Suspense
        fallback={<div className="w-full h-full" style={{ background: "var(--gradient-glow)" }} />}
      >
        <ErrorBoundary onError={() => setErrored(true)}>
          <Spline scene={scene} style={{ width: "100%", height: "100%" }} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

import { Component, ReactNode } from "react";
class ErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default Spline3D;
