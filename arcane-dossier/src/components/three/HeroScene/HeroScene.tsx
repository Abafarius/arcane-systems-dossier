import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry, MathUtils } from "three";

interface HeroSceneProps {
  reducedMotion?: boolean;
}

type Vector3Tuple = [number, number, number];

type ShardConfig = {
  id: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
  color: string;
};

const shardPalette = ["#d8a84f", "#8f6cff", "#5da8ff"] as const;

function ParticleField() {
  const particles = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 1.8 + ((index * 37) % 100) / 100 * 3.2;
      const angle = index * 2.399963229728653;
      const height = Math.sin(index * 1.73) * 1.9;

      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = height;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const pointsRef = useRef<Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
  });

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        attach="material"
        blending={AdditiveBlending}
        color="#d8a84f"
        depthWrite={false}
        opacity={0.46}
        size={0.023}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function ArchiveCore({ reducedMotion = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const innerCoreRef = useRef<Mesh>(null);
  const haloRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    const breath = 1 + Math.sin(elapsed * 1.18) * 0.035;

    groupRef.current.rotation.y = elapsed * 0.18;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.32) * 0.11;

    if (innerCoreRef.current) {
      innerCoreRef.current.scale.setScalar(breath);
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = elapsed * -0.12;
      haloRef.current.scale.setScalar(1.32 + Math.sin(elapsed * 0.8) * 0.035);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={haloRef}>
        <torusGeometry args={[1.08, 0.012, 12, 120]} />
        <meshBasicMaterial color="#d8a84f" opacity={0.38} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 2.35, 0.1, Math.PI / 4]} scale={1.05}>
        <torusGeometry args={[1.38, 0.009, 10, 140]} />
        <meshBasicMaterial color="#8f6cff" opacity={0.32} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 2.1, Math.PI / 5, Math.PI / 9]} scale={1.24}>
        <torusGeometry args={[1.26, 0.007, 10, 140]} />
        <meshBasicMaterial color="#5da8ff" opacity={0.24} transparent />
      </mesh>

      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.84, 2]} />
        <meshStandardMaterial
          color="#d8a84f"
          emissive="#6b3cff"
          emissiveIntensity={0.42}
          metalness={0.58}
          opacity={0.64}
          roughness={0.18}
          transparent
        />
      </mesh>

      <mesh scale={1.48}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial
          color="#8f6cff"
          emissive="#8f6cff"
          emissiveIntensity={0.2}
          metalness={0.2}
          opacity={0.1}
          roughness={0.55}
          transparent
          wireframe
        />
      </mesh>
    </group>
  );
}

function DataShardRing({ reducedMotion = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const shards = useMemo<ShardConfig[]>(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const angle = (index / 30) * Math.PI * 2;
        const radius = index % 2 === 0 ? 2.1 : 2.68;
        const y = Math.sin(angle * 1.8) * 0.52 + Math.cos(index * 0.7) * 0.08;

        return {
          id: `shard-${index}`,
          position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
          rotation: [Math.sin(angle) * 0.85, angle + Math.PI / 3, Math.cos(angle) * 0.5],
          scale: index % 5 === 0 ? 1.25 : index % 3 === 0 ? 1.02 : 0.78,
          color: shardPalette[index % shardPalette.length],
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * -0.12;
    groupRef.current.rotation.z = Math.sin(elapsed * 0.16) * 0.065;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard) => (
        <mesh key={shard.id} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <boxGeometry args={[0.045, 0.46, 0.13]} />
          <meshStandardMaterial
            color={shard.color}
            emissive={shard.color}
            emissiveIntensity={0.42}
            metalness={0.4}
            opacity={0.72}
            roughness={0.22}
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
        [-3.2, -1.15, -0.45],
        [-1.5, 0.1, 0.18],
        [0.2, -0.2, -0.12],
        [2.9, 0.86, 0.28],
      ],
      [
        [-2.55, 1.2, 0.1],
        [-0.6, 1.55, -0.2],
        [1.85, 1.02, 0.24],
        [3.1, 1.42, -0.12],
      ],
      [
        [-2.4, -1.55, 0.35],
        [-0.2, -1.18, -0.15],
        [2.18, -1.7, 0.2],
      ],
      [
        [-1.1, 2.0, -0.2],
        [0.15, 0.95, 0.3],
        [1.52, 1.7, -0.1],
      ],
    ],
    [],
  );

  return (
    <group>
      {paths.map((points, index) => (
        <Line
          key={`constellation-line-${index}`}
          color={index % 2 === 0 ? "#d8a84f" : "#8f6cff"}
          lineWidth={1}
          opacity={0.32}
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

    sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, state.pointer.y * 0.13, 0.035);
    sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, state.pointer.x * 0.2, 0.035);
    sceneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group ref={sceneRef} position={[0, 0.05, 0]}>
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
        camera={{ fov: 40, position: [0, 0.08, 6.4] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#070812"]} />
        <fog attach="fog" args={["#070812", 5.5, 10]} />
        <ambientLight intensity={0.48} />
        <pointLight color="#d8a84f" intensity={3.8} position={[2.8, 2.7, 3]} />
        <pointLight color="#8f6cff" intensity={2.4} position={[-3, -1.5, 2.2]} />
        <pointLight color="#5da8ff" intensity={1.4} position={[0, -2.2, 3.1]} />
        <SceneContent reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
