import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Cubes() {
  const group = useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const size = 0.5 + Math.random() * 2;
      const hue = 0.68 + Math.random() * 0.05; // tight indigo band only
      const color = new THREE.Color().setHSL(hue, 0.45, 0.5);

      return {
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 12 - 3,
        ] as [number, number, number],
        size,
        color,
        opacity: 0.04 + Math.random() * 0.1,
        speed: 0.1 + Math.random() * 0.3,
        floatSpeed: 0.3 + Math.random() * 0.6,
        floatAmp: 0.3 + Math.random() * 0.7,
        seed: Math.random() * Math.PI * 2,
        baseY: 0,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    group.current.children.forEach((mesh, i) => {
      const c = cubes[i];
      mesh.rotation.x = t * c.speed * 0.5;
      mesh.rotation.y = t * c.speed;
      mesh.position.y = c.position[1] + Math.sin(t * c.floatSpeed + c.seed) * c.floatAmp;
    });
  });

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshBasicMaterial color={c.color} wireframe transparent opacity={c.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function CameraParallax() {
  const { camera, mouse } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useFrame(() => {
    target.current.x += (mouse.x * 1.2 - target.current.x) * 0.02;
    target.current.y += (mouse.y * 0.8 - target.current.y) * 0.02;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function GridPlane() {
  const ref = useRef<THREE.GridHelper>(null);
  return (
    <gridHelper
      ref={ref}
      args={[80, 40, "#6c5ce7", "#6c5ce7"]}
      position={[0, -8, 0]}
      material-transparent={true}
      material-opacity={0.04}
    />
  );
}

const BackgroundScene = () => {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <Cubes />
        <GridPlane />
        <CameraParallax />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
