import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NestedCubes() {
  const outer = useRef<THREE.LineSegments>(null);
  const middle = useRef<THREE.LineSegments>(null);
  const inner = useRef<THREE.LineSegments>(null);
  const particles = useRef<THREE.Points>(null);

  const particleGeom = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const r = 2.5;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x = t * 0.3;
      outer.current.rotation.y = t * 0.4;
    }
    if (middle.current) {
      middle.current.rotation.x = -t * 0.5;
      middle.current.rotation.y = t * 0.6;
    }
    if (inner.current) {
      inner.current.rotation.x = t * 0.8;
      inner.current.rotation.y = -t * 0.7;
    }
    if (particles.current) {
      particles.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group>
      <lineSegments ref={outer}>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#6c5ce7" transparent opacity={0.7} />
      </lineSegments>
      <lineSegments ref={middle}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.2, 1.2)]} />
        <lineBasicMaterial color="#8b7ee8" transparent opacity={0.45} />
      </lineSegments>
      <lineSegments ref={inner}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.6, 0.6, 0.6)]} />
        <lineBasicMaterial color="#a89cf0" transparent opacity={0.5} />
      </lineSegments>
      <points ref={particles} geometry={particleGeom}>
        <pointsMaterial color="#8b7ee8" size={0.04} transparent opacity={0.7} />
      </points>
    </group>
  );
}

const HeroCube = () => {
  return (
    <div className="w-full h-[400px] max-w-[400px] mx-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <NestedCubes />
      </Canvas>
    </div>
  );
};

export default HeroCube;
