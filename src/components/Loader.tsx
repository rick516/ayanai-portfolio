import { Html, useProgress } from  "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  
  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span className="canvas-loader mt-[80px]"/>
      <p 
        style={{
          fontSize: 14,
          color: '#0fffeb',
          fontWeight: 800,
          marginTop: 80,
        }}
      >{progress.toFixed(2)}%</p>
    </Html>
  )
}

export default CanvasLoader