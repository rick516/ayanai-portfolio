import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float size;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec3 pos = position;
    
    float dist = distance(uMouse, pos.xy);
    pos.z += sin(uTime * 2.0 + dist * 0.5) * 0.1;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(uTime + dist) * 0.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.0, dist);
    vec3 finalColor = vColor * (0.5 + 0.5 * sin(uTime * 0.5));
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const SmokeTrailAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2());

  const particleCount = 10000;

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;  // Reduced range
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;  // Reduced range
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;  // Reduced range

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.1 + 0.05;  // Reduced size
    }

    return [positions, colors, sizes];
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 2;  // Adjusted camera position

    const animate = (time: number) => {
      requestAnimationFrame(animate);
      material.uniforms.uTime.value = time * 0.001;
      material.uniforms.uMouse.value.copy(mouseRef.current);
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [positions, colors, sizes]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default SmokeTrailAnimation;