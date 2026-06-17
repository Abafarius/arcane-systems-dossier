import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry, MathUtils } from "three";
import { threePerformance } from "../../../lib/threePerformance";

interface HeroSceneProps {
  reducedMotion?: boolean;
  expanded?: boolean;
}

type Vector3Tuple = [number, number, number];
type LinePoint = [number, number, number];

type ShardConfig = {
  id: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: Vector3Tuple;
  color: string;
};

const shardPalette = ["#d8a84f", "#8f6cff", "#5da8ff", "#6ee7a8"] as const;

function ParticleField({ expanded = false }: Pick<HeroSceneProps, "expanded">) {
  const particles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.1 + (((index * 29) % 100) / 100) * 3.0;
      const angle = index * 2.399963229728653;
      const height = Math.sin(index * 1.31) * 1.75;

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
    pointsRef.current.rotation.y = state.clock.elapsedTime * (expanded ? 0.026 : 0.012);
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
  });

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        attach="material"
        blending={AdditiveBlending}
        color={expanded ? "#8f6cff" : "#d8a84f"}
        depthWrite={false}
        opacity={expanded ? 0.44 : 0.3}
        size={expanded ? 0.026 : 0.02}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function ArchiveCore({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    const targetScale = expanded ? 1.13 : 1;
    const breath = targetScale + Math.sin(elapsed * (expanded ? 1.25 : 0.88)) * (expanded ? 0.045 : 0.022);

    groupRef.current.rotation.y = elapsed * (expanded ? 0.22 : 0.12);
    groupRef.current.rotation.x = Math.sin(elapsed * 0.24) * 0.08;

    if (coreRef.current) coreRef.current.scale.setScalar(breath);
    if (shellRef.current) {
      shellRef.current.rotation.y = elapsed * -0.11;
      shellRef.current.rotation.z = elapsed * 0.08;
      shellRef.current.scale.setScalar(expanded ? 1.24 : 1.08);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.04, 3]} />
        <meshStandardMaterial
          color="#d8a84f"
          emissive={expanded ? "#8f6cff" : "#4e35b8"}
          emissiveIntensity={expanded ? 0.62 : 0.34}
          metalness={0.68}
          opacity={0.74}
          roughness={0.18}
          transparent
        />
      </mesh>

      <mesh ref={shellRef} scale={1.16}>
        <icosahedronGeometry args={[1.02, 2]} />
        <meshStandardMaterial
          color="#8f6cff"
          emissive="#8f6cff"
          emissiveIntensity={expanded ? 0.22 : 0.12}
          opacity={expanded ? 0.16 : 0.08}
          roughness={0.45}
          transparent
          wireframe
        />
      </mesh>

      <mesh scale={expanded ? 0.62 : 0.52} rotation={[0.55, 0.26, 0.86]}>
        <tetrahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#f4efe4" opacity={expanded ? 0.13 : 0.08} transparent wireframe />
      </mesh>
    </group>
  );
}

function OrbitRings({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  const ringRef = useRef<Group>(null);

  useFrame((state) => {
    if (!ringRef.current || reducedMotion) return;
    ringRef.current.rotation.y = state.clock.elapsedTime * (expanded ? 0.12 : 0.06);
    ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    ringRef.current.scale.setScalar(MathUtils.lerp(ringRef.current.scale.x, expanded ? 1.08 : 1, 0.03));
  });

  const rings = [
    { radius: 1.42, tube: 0.009, color: "#d8a84f", rotation: [Math.PI / 2.55, 0.2, Math.PI / 10] as Vector3Tuple, opacity: 0.42 },
    { radius: 1.82, tube: 0.006, color: "#8f6cff", rotation: [Math.PI / 2.0, 0.82, Math.PI / 4.6] as Vector3Tuple, opacity: 0.26 },
    { radius: 2.25, tube: 0.005, color: "#5da8ff", rotation: [Math.PI / 2.8, -0.55, -Math.PI / 7] as Vector3Tuple, opacity: 0.2 },
  ];

  return (
    <group ref={ringRef}>
      {rings.map((ring) => (
        <mesh key={ring.radius} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius + (expanded ? 0.12 : 0), ring.tube, 12, 180]} />
          <meshBasicMaterial color={ring.color} opacity={expanded ? ring.opacity + 0.1 : ring.opacity} transparent />
        </mesh>
      ))}
    </group>
  );
}

function DataShardRing({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const shards = useMemo<ShardConfig[]>(
    () =>
      Array.from({ length: 24 }, (_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const radius = index % 2 === 0 ? 2.42 : 2.86;
        const y = Math.sin(angle * 2) * 0.38;
        const size = index % 6 === 0 ? 1.05 : 0.74;

        return {
          id: `shard-${index}`,
          position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
          rotation: [Math.sin(angle) * 0.55, angle + Math.PI / 2, Math.cos(angle) * 0.35],
          scale: [0.055 * size, 0.48 * size, 0.14 * size],
          color: shardPalette[index % shardPalette.length],
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * (expanded ? -0.13 : -0.065);
    groupRef.current.rotation.z = Math.sin(elapsed * 0.14) * 0.045;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard) => (
        <mesh key={shard.id} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={shard.color}
            emissive={shard.color}
            emissiveIntensity={expanded ? 0.56 : 0.3}
            metalness={0.38}
            opacity={expanded ? 0.72 : 0.48}
            roughness={0.25}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function EnergyTrails({ expanded = false }: Pick<HeroSceneProps, "expanded">) {
  const trails = useMemo<LinePoint[][]>(() => {
    return Array.from({ length: 3 }, (_, trail) =>
      Array.from({ length: 72 }, (_, index) => {
        const t = index / 71;
        const angle = t * Math.PI * 2 + trail * 1.25;
        const radius = 1.55 + trail * 0.32;
        return [Math.cos(angle) * radius, Math.sin(angle * 1.55 + trail) * 0.34, Math.sin(angle) * radius] as LinePoint;
      }),
    );
  }, []);

  return (
    <group>
      {trails.map((points, index) => (
        <Line
          key={`energy-trail-${index}`}
          color={index % 2 === 0 ? "#5da8ff" : "#d8a84f"}
          lineWidth={expanded ? 1.15 : 0.7}
          opacity={expanded ? 0.24 : 0.12}
          points={points}
          transparent
        />
      ))}
    </group>
  );
}

function ConstellationLines({ expanded = false }: Pick<HeroSceneProps, "expanded">) {
  const paths = useMemo<LinePoint[][]>(
    () => [
      [[-3.0, -0.8, -0.35], [-1.1, 0.14, 0.15], [1.0, -0.18, -0.12], [3.0, 0.76, 0.22]],
      [[-2.45, 1.1, 0.05], [-0.4, 1.35, -0.18], [1.8, 0.95, 0.2], [2.85, 1.28, -0.1]],
      [[-2.1, -1.45, 0.28], [0.05, -1.05, -0.12], [2.25, -1.38, 0.18]],
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
          opacity={expanded ? 0.34 : 0.18}
          points={points}
          transparent
        />
      ))}
    </group>
  );
}

function SceneContent({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  const sceneRef = useRef<Group>(null);

  useFrame((state) => {
    if (!sceneRef.current || reducedMotion) return;
    sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, state.pointer.y * 0.11, 0.032);
    sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, state.pointer.x * 0.18, 0.032);
    sceneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.035;
  });

  return (
    <group ref={sceneRef} position={[0, 0.02, 0]}>
      <ParticleField expanded={expanded} />
      <ConstellationLines expanded={expanded} />
      <EnergyTrails expanded={expanded} />
      <OrbitRings reducedMotion={reducedMotion} expanded={expanded} />
      <ArchiveCore reducedMotion={reducedMotion} expanded={expanded} />
      <DataShardRing reducedMotion={reducedMotion} expanded={expanded} />
    </group>
  );
}

export function HeroScene({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ fov: 38, position: [0, 0.08, 6.15] }}
        dpr={threePerformance.dpr}
        gl={{ alpha: true, antialias: threePerformance.antialias, powerPreference: threePerformance.powerPreference }}
      >
        <color attach="background" args={["#070812"]} />
        <fog attach="fog" args={["#070812", 5.3, 9.2]} />
        <ambientLight intensity={0.46} />
        <pointLight color="#d8a84f" intensity={expanded ? 4.8 : 3.2} position={[2.8, 2.65, 3.2]} />
        <pointLight color="#8f6cff" intensity={expanded ? 3.0 : 1.9} position={[-3.0, -1.4, 2.4]} />
        <pointLight color="#5da8ff" intensity={expanded ? 1.9 : 1.1} position={[0, -2.2, 3.0]} />
        <SceneContent reducedMotion={reducedMotion} expanded={expanded} />
      </Canvas>
    </div>
  );
}
