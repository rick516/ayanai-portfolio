import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BuddhistIlluminationAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 100);
    
    const buddhistColors = [
      0xFFD700, // 金色（黄金）
      0xFF3131, // 深い赤
      0x8A2BE2, // 紫
      0x1E90FF, // 青
      0x00FA9A, // 緑
      0xFF8C00, // オレンジ
      0xFF69B4, // ピンク
      0xFFFFFF, // 白
      0x00FFFF, // 水色
      0x4B0082  // 濃い紫
    ];

    const mandalaGeometry = new THREE.TorusKnotGeometry(15, 4.5, 100, 16);
    const mandalaMaterial = new THREE.MeshBasicMaterial({
      color: buddhistColors[Math.floor(Math.random() * buddhistColors.length)],
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const mandala = new THREE.Mesh(mandalaGeometry, mandalaMaterial);
    mandala.position.set(0, 0, -50);
    scene.add(mandala);

    
    const particlesCount = 2000; 
    const spiralRadius = 30;
    const spiralHeight = 60;
    const spiralTurns = 5;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleVelocities = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const t = i / particlesCount;
      const angle = t * Math.PI * 2 * spiralTurns;
      const radius = spiralRadius * (1 - t);
      
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = Math.sin(angle) * radius;
      particlePositions[i + 2] = t * spiralHeight - spiralHeight / 2;

      particleVelocities[i] = Math.random() * 0.1 - 0.05;
      particleVelocities[i + 1] = Math.random() * 0.1 - 0.05;
      particleVelocities[i + 2] = Math.random() * 0.1 - 0.05;

      const color = new THREE.Color(buddhistColors[Math.floor(Math.random() * buddhistColors.length)]);
      particleColors[i] = color.r;
      particleColors[i + 1] = color.g;
      particleColors[i + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    const lotusGeometry = new THREE.IcosahedronGeometry(5, 1);
    const lotusMaterial = new THREE.MeshBasicMaterial({
      color: buddhistColors[Math.floor(Math.random() * buddhistColors.length)],
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const lotus = new THREE.Mesh(lotusGeometry, lotusMaterial);
    lotus.position.set(0, -5, -100);
    scene.add(lotus);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: buddhistColors[Math.floor(Math.random() * buddhistColors.length)],
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const lines: THREE.Line[] = [];
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.BufferGeometry();
      const linePoints: THREE.Vector3[] = [];
      linePoints.push(new THREE.Vector3(-100, Math.random() * 200 - 100, Math.random() * 200 - 100));
      linePoints.push(new THREE.Vector3(100, Math.random() * 200 - 100, Math.random() * 200 - 100));
      geometry.setFromPoints(linePoints);
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
      lines.push(line);
    }

    const mouse = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };

    window.addEventListener('mousemove', onMouseMove, false);

    const mouse3D = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    const onMouseMove3D = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      mouse3D.copy(raycaster.ray.direction).multiplyScalar(50).add(camera.position);
    };

    window.addEventListener('mousemove', onMouseMove3D, false);

    const cameraSpeed = 0.05;
    let cameraTheta = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      const colors = particleSystem.geometry.attributes.color.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const t = (i / 3) / particlesCount;
        const angle = t * Math.PI * 2 * spiralTurns + time;
        const radius = spiralRadius * (1 - t * 0.5);
        
        // 螺旋状の動きを計算
        const spiralX = Math.cos(angle) * radius;
        const spiralY = Math.sin(angle) * radius;
        const spiralZ = ((t + time * 0.1) % 1) * spiralHeight - spiralHeight / 2;

        // マウスとの相互作用（時空の歪み）
        const distanceToMouse = new THREE.Vector3(spiralX, spiralY, spiralZ).distanceTo(mouse3D);
        const influence = Math.max(0, 1 - distanceToMouse / 30);
        const distortion = new THREE.Vector3(
          (Math.random() - 0.5) * influence * 10,
          (Math.random() - 0.5) * influence * 10,
          (Math.random() - 0.5) * influence * 10
        );

        positions[i] = spiralX + distortion.x;
        positions[i + 1] = spiralY + distortion.y;
        positions[i + 2] = spiralZ + distortion.z;

        // 色の更新（輪廻転生を表現）
        const hue = (t + time * 0.1) % 1;
        const saturation = 0.5 + Math.sin(time + t * 10) * 0.5;
        const lightness = 0.5 + Math.cos(time + t * 15) * 0.3;
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.geometry.attributes.color.needsUpdate = true;

      // カメラの軌道を更新
      cameraTheta += 0.002;
      const cameraX = Math.sin(cameraTheta) * 10;
      const cameraY = Math.cos(cameraTheta) * 5;

      // カメラを前進させる
      camera.position.z -= cameraSpeed;

      // カメラの位置を螺旋状に調整
      camera.position.x = cameraX;
      camera.position.y = cameraY;

      // カメラが原点（0, 0, 0）を向くように設定
      camera.lookAt(0, 0, 0);

      // 曼荼羅と蓮の花を常にカメラの前に配置
      mandala.position.z = camera.position.z - 50;
      lotus.position.z = camera.position.z - 100;

      // カメラが一定の距離を進んだら位置をリセット（無限ループ効果）
      if (camera.position.z < -100) {
        camera.position.z = 100;
      }

      // マンダラの回転
      mandala.rotation.y += 0.001;
      mandala.rotation.z += 0.0005;

      for (const line of lines) {
        line.rotation.y += 0.002;
        line.rotation.z += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove3D);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default BuddhistIlluminationAnimation;