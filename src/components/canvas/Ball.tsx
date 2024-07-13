import React, { Suspense, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

interface BallProps {
  imgUrl: string;
  name: string;
  color?: string;
  scale?: number;
  rotationSpeed?: number;
}

const Ball: React.FC<BallProps> = ({
  imgUrl,
  name,
  color = "#fff8eb",
  scale = 2.75,
  rotationSpeed = 0.01,
}) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = React.useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      polygonOffset: true,
      polygonOffsetFactor: -5,
      flatShading: true,
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * rotationSpeed;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * rotationSpeed;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <primitive object={material} attach="material" />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas: React.FC<BallProps> = ({ icon, name, ...props }) => {
  const handleError = useCallback((error: ErrorEvent) => {
    console.error(`Error loading 3D ball for ${name}:`, error);
  }, [name]);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ alpha: false, antialias: false }}
      aria-label={`3D Ball with ${name} icon`}
      onError={handleError}
      style={{ touchAction: 'none' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} enablePan={false} makeDefault />
        <Ball imgUrl={icon} name={name} {...props} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default React.memo(BallCanvas);