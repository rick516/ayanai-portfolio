import { useRef, useEffect } from 'react';
import { World } from '../entities/World';
import { Molecule } from '../entities/Molecule';

const MoleculeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const world = new World(canvasRef.current);

      // 複数の分子を生成
      for (let i = 0; i < 20; i++) {
        const molecule = new Molecule(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        );
        world.addMolecule(molecule);
      }

      return () => {
        world.dispose();
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MoleculeCanvas;