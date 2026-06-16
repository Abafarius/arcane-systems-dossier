import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import type { Group, Points } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry, MathUtils } from "three";

interface HeroSceneProps {
  reducedMotion?: boolean;
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123;
  return value - Math.floor(value);
}

function ParticleField() {
  const particles = useMemo<BufferGeometry>(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.2 + seededRandom(index * 1.7 + 0.1) * 2.4;
      const angle = seededRandom(index * 2.9 + 1.7) * Math.PI * 2;
      const height = (seededRandom(index * 3.3 + 2.1) - 0.5) * 3.6;

      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = height;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useEffect(() => {
    return () => {
      particles.dispose();
    };
  }, [particles]);

  const pointsRef = useRef<Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  if (!particles) return null;

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        attach="material"
        blending={AdditiveBlending}
        color="#d8a84f"
        depthWrite={false}
        opacity={0.52}
        size={0.025}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function ArchiveCore({ reducedMotion = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * 0.22;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.35) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshStandardMaterial
          color="#d8a84f"
          emissive="#6b3cff"
          emissiveIntensity={0.34}
          metalness={0.42}
          opacity={0.58}
          roughness={0.22}
          transparent
        />
      </mesh>
      <mesh scale={1.42}>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshStandardMaterial
          color="#8f6cff"
          emissive="#8f6cff"
          emissiveIntensity={0.18}
          metalness={0.2}
          opacity={0.12}
          roughness={0.6}
          transparent
          wireframe
        />
      </mesh>
    </group>
  );
}

function DataShardRing({ reducedMotion = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        const radius = index % 2 === 0 ? 2.05 : 2.55;
        const y = Math.sin(angle * 1.5) * 0.44;

        return {
          id: `shard-${index}`,
          position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as const,
          rotation: [Math.sin(angle) * 0.8, angle, Math.cos(angle) * 0.4] as const,
          scale: index % 3 === 0 ? 1.15 : 0.86,
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * -0.16;
    groupRef.current.rotation.z = Math.sin(elapsed * 0.18) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard) => (
        <mesh key={shard.id} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <boxGeometry args={[0.06, 0.42, 0.14]} />
          <meshStandardMaterial
            color="#5da8ff"
            emissive="#5da8ff"
            emissiveIntensity={0.35}
            metalness={0.36}
            opacity={0.74}
            roughness={0.28}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

type LinePoint = [number, number, number];

function ConstellationLines() {
  const paths = useMemo<LinePoint[][]>(
    () => [
      [
        [-2.7, -0.95, -0.45],
        [-1.2, 0.25, 0.18],
        [0.4, -0.1, -0.12],
        [2.6, 0.75, 0.28],
      ],
      [
        [-2.2, 1.1, 0.1],
        [-0.5, 1.45, -0.2],
        [1.6, 0.95, 0.24],
      ],
      [
        [-1.8, -1.4, 0.35],
        [0.1, -1.1, -0.15],
        [1.8, -1.6, 0.2],
      ],
    ],
    [],
  );

  return (
    <group>
      {paths.map((points, index) => (
        <Line
          key={`constellation-line-${index}`}
          color={index === 1 ? "#d8a84f" : "#8f6cff"}
          lineWidth={1}
          opacity={0.38}
          points={points}
          transparent
        />
      ))}
    </group>
  );
}

function SceneContent({ reducedMotion = false }: HeroSceneProps) {
  const sceneRef = useRef<Group>(null);

  useFrame((state) => {
    if (!sceneRef.current || reducedMotion) return;

    sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, state.pointer.y * 0.12, 0.04);
    sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, state.pointer.x * 0.18, 0.04);
  });

  return (
    <group ref={sceneRef}>
      <ParticleField />
      <ConstellationLines />
      <ArchiveCore reducedMotion={reducedMotion} />
      <DataShardRing reducedMotion={reducedMotion} />
    </group>
  );
}

export function HeroScene({ reducedMotion = false }: HeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ fov: 42, position: [0, 0, 6.4] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#070812"]} />
        <ambientLight intensity={0.52} />
        <pointLight color="#d8a84f" intensity={3.4} position={[2.8, 2.6, 3]} />
        <pointLight color="#8f6cff" intensity={2.2} position={[-3, -1.5, 2]} />
        <SceneContent reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
