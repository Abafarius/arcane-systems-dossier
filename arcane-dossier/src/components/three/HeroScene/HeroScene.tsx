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
type ShardShape = "box" | "tetra" | "octa";

type ShardConfig = {
  id: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
  color: string;
  shape: ShardShape;
};

const shardPalette = ["#d8a84f", "#8f6cff", "#5da8ff", "#6ee7a8"] as const;

function ParticleField({ expanded = false }: Pick<HeroSceneProps, "expanded">) {
  const particles = useMemo(() => {
    const count = 240;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 1.6 + (((index * 37) % 100) / 100) * 3.8;
      const angle = index * 2.399963229728653;
      const height = Math.sin(index * 1.73) * 2.05;

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

    const speed = expanded ? 0.044 : 0.018;
    pointsRef.current.rotation.y = state.clock.elapsedTime * speed;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
  });

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        attach="material"
        blending={AdditiveBlending}
        color={expanded ? "#8f6cff" : "#d8a84f"}
        depthWrite={false}
        opacity={expanded ? 0.58 : 0.42}
        size={expanded ? 0.031 : 0.023}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function ArchiveCore({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const innerCoreRef = useRef<Mesh>(null);
  const haloRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    const breath = 1 + Math.sin(elapsed * (expanded ? 1.65 : 1.18)) * (expanded ? 0.065 : 0.035);

    groupRef.current.rotation.y = elapsed * (expanded ? 0.28 : 0.18);
    groupRef.current.rotation.x = Math.sin(elapsed * 0.32) * 0.11;

    if (innerCoreRef.current) {
      innerCoreRef.current.scale.setScalar(breath * (expanded ? 1.08 : 1));
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = elapsed * (expanded ? -0.22 : -0.12);
      haloRef.current.scale.setScalar((expanded ? 1.62 : 1.32) + Math.sin(elapsed * 0.8) * 0.035);
    }

    if (shellRef.current) {
      shellRef.current.rotation.y = elapsed * -0.16;
      shellRef.current.rotation.z = elapsed * 0.11;
      shellRef.current.scale.setScalar(expanded ? 1.18 : 1);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={haloRef}>
        <torusGeometry args={[1.08, 0.012, 12, 140]} />
        <meshBasicMaterial color="#d8a84f" opacity={expanded ? 0.58 : 0.38} transparent />
      </mesh>

      {[0, 1, 2, 3].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / (2.25 + ring * 0.08), ring * 0.45, Math.PI / (4 + ring)]} scale={1 + ring * 0.1}>
          <torusGeometry args={[1.18 + ring * 0.2 + (expanded ? 0.12 : 0), 0.006 + ring * 0.001, 10, 150]} />
          <meshBasicMaterial color={ring % 2 === 0 ? "#8f6cff" : "#5da8ff"} opacity={expanded ? 0.34 : 0.22} transparent />
        </mesh>
      ))}

      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.84, 3]} />
        <meshStandardMaterial
          color="#d8a84f"
          emissive={expanded ? "#8f6cff" : "#6b3cff"}
          emissiveIntensity={expanded ? 0.72 : 0.42}
          metalness={0.62}
          opacity={0.68}
          roughness={0.16}
          transparent
        />
      </mesh>

      <mesh ref={shellRef} scale={1.48}>
        <icosahedronGeometry args={[0.78, 2]} />
        <meshStandardMaterial
          color="#8f6cff"
          emissive="#8f6cff"
          emissiveIntensity={expanded ? 0.32 : 0.18}
          metalness={0.2}
          opacity={expanded ? 0.17 : 0.1}
          roughness={0.55}
          transparent
          wireframe
        />
      </mesh>

      <mesh scale={expanded ? 0.62 : 0.48} rotation={[0.6, 0.2, 0.8]}>
        <tetrahedronGeometry args={[0.82, 1]} />
        <meshBasicMaterial color="#f4efe4" opacity={expanded ? 0.13 : 0.08} transparent wireframe />
      </mesh>
    </group>
  );
}

function ShardGeometry({ shape }: { shape: ShardShape }) {
  if (shape === "tetra") return <tetrahedronGeometry args={[0.16, 0]} />;
  if (shape === "octa") return <octahedronGeometry args={[0.18, 0]} />;
  return <boxGeometry args={[0.045, 0.48, 0.13]} />;
}

function DataShardRing({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  const groupRef = useRef<Group>(null);
  const shards = useMemo<ShardConfig[]>(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const angle = (index / 42) * Math.PI * 2;
        const radius = index % 2 === 0 ? 2.06 : 2.78;
        const y = Math.sin(angle * 1.8) * 0.56 + Math.cos(index * 0.7) * 0.1;

        return {
          id: `shard-${index}`,
          position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
          rotation: [Math.sin(angle) * 0.85, angle + Math.PI / 3, Math.cos(angle) * 0.5],
          scale: index % 7 === 0 ? 1.32 : index % 5 === 0 ? 1.05 : 0.78,
          color: shardPalette[index % shardPalette.length],
          shape: index % 9 === 0 ? "octa" : index % 6 === 0 ? "tetra" : "box",
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * (expanded ? -0.22 : -0.12);
    groupRef.current.rotation.z = Math.sin(elapsed * 0.16) * (expanded ? 0.1 : 0.065);
    groupRef.current.scale.setScalar(MathUtils.lerp(groupRef.current.scale.x, expanded ? 1.08 : 1, 0.04));
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard) => (
        <mesh key={shard.id} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <ShardGeometry shape={shard.shape} />
          <meshStandardMaterial
            color={shard.color}
            emissive={shard.color}
            emissiveIntensity={expanded ? 0.64 : 0.42}
            metalness={0.42}
            opacity={expanded ? 0.84 : 0.68}
            roughness={0.2}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

type LinePoint = [number, number, number];

function ConstellationLines({ expanded = false }: Pick<HeroSceneProps, "expanded">) {
  const paths = useMemo<LinePoint[][]>(
    () => [
      [[-3.2, -1.15, -0.45], [-1.5, 0.1, 0.18], [0.2, -0.2, -0.12], [2.9, 0.86, 0.28]],
      [[-2.55, 1.2, 0.1], [-0.6, 1.55, -0.2], [1.85, 1.02, 0.24], [3.1, 1.42, -0.12]],
      [[-2.4, -1.55, 0.35], [-0.2, -1.18, -0.15], [2.18, -1.7, 0.2]],
      [[-1.1, 2.0, -0.2], [0.15, 0.95, 0.3], [1.52, 1.7, -0.1]],
      [[-3.5, 0.42, 0.12], [-1.6, -0.48, -0.08], [0.64, 0.72, 0.18], [3.45, -0.46, 0.1]],
    ],
    [],
  );

  return (
    <group>
      {paths.map((points, index) => (
        <Line
          key={`constellation-line-${index}`}
          color={index % 2 === 0 ? "#d8a84f" : "#8f6cff"}
          lineWidth={expanded ? 1.25 : 1}
          opacity={expanded ? 0.46 : 0.28}
          points={points}
          transparent
        />
      ))}
    </group>
  );
}

function EnergyTrails({ expanded = false }: Pick<HeroSceneProps, "expanded">) {
  const trails = useMemo<LinePoint[][]>(() => {
    return Array.from({ length: 5 }, (_, trail) => {
      return Array.from({ length: 80 }, (_, index) => {
        const t = index / 79;
        const angle = t * Math.PI * 2 + trail * 0.82;
        const radius = 1.42 + trail * 0.25 + Math.sin(t * Math.PI * 4) * 0.05;
        return [Math.cos(angle) * radius, Math.sin(angle * 1.7 + trail) * 0.44, Math.sin(angle) * radius] as LinePoint;
      });
    });
  }, []);

  return (
    <group>
      {trails.map((points, index) => (
        <Line
          key={`energy-trail-${index}`}
          color={index % 2 === 0 ? "#5da8ff" : "#d8a84f"}
          lineWidth={expanded ? 1.3 : 0.8}
          opacity={expanded ? 0.25 : 0.14}
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

    sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, state.pointer.y * 0.16, 0.035);
    sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, state.pointer.x * 0.26, 0.035);
    sceneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    sceneRef.current.scale.setScalar(MathUtils.lerp(sceneRef.current.scale.x, expanded ? 1.06 : 1, 0.04));
  });

  return (
    <group ref={sceneRef} position={[0, 0.05, 0]}>
      <ParticleField expanded={expanded} />
      <ConstellationLines expanded={expanded} />
      <EnergyTrails expanded={expanded} />
      <ArchiveCore reducedMotion={reducedMotion} expanded={expanded} />
      <DataShardRing reducedMotion={reducedMotion} expanded={expanded} />
    </group>
  );
}

export function HeroScene({ reducedMotion = false, expanded = false }: HeroSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ fov: 40, position: [0, 0.08, 6.4] }}
        dpr={threePerformance.dpr}
        gl={{ alpha: true, antialias: threePerformance.antialias, powerPreference: threePerformance.powerPreference }}
      >
        <color attach="background" args={["#070812"]} />
        <fog attach="fog" args={["#070812", 5.5, 10]} />
        <ambientLight intensity={0.48} />
        <pointLight color="#d8a84f" intensity={expanded ? 5.1 : 3.8} position={[2.8, 2.7, 3]} />
        <pointLight color="#8f6cff" intensity={expanded ? 3.4 : 2.4} position={[-3, -1.5, 2.2]} />
        <pointLight color="#5da8ff" intensity={expanded ? 2.2 : 1.4} position={[0, -2.2, 3.1]} />
        <SceneContent reducedMotion={reducedMotion} expanded={expanded} />
      </Canvas>
    </div>
  );
}
