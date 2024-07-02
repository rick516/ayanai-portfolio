import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, useTexture, OrbitControls, Preload } from '@react-three/drei'

import CanvasLoader from '../Loader'

interface BallProps {
  imgUrl: string
}

const Ball = (props: BallProps) => {
  const [decal] = useTexture([props.imgUrl])
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ffffff"  // より白い色に変更
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  )
}

interface BallCanvasProps {
  icon: string
}

const BallCanvas = (props: BallCanvasProps) => {


  return (
    <Canvas
      frameloop="demand"
      shadows
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={props.icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;