import * as THREE from 'three';
import type { Entity, Soul, Celestial, Genome, Organism } from './Entity';

class World {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private entities: Entity[] = [];
  private composer: THREE.EffectComposer;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    this.composer = new THREE.EffectComposer(this.renderer);
    const renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    this.composer.addPass(bloomPass);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.initEntities();
  }

  private initEntities(): void {
    for (let i = 0; i < 20; i++) {
      const position = new THREE.Vector3(
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
      );
      const entityType = Math.random();
      let entity: Entity;

      if (entityType < 0.25) {
        entity = new Soul(position);
      } else if (entityType < 0.5) {
        entity = new Celestial(position, Math.random() * 0.5 + 0.5);
      } else if (entityType < 0.75) {
        entity = new Genome(position);
      } else {
        entity = new Organism(position);
      }

      this.entities.push(entity);
      this.scene.add(entity.getMesh());
    }
  }

  public update(): void {
    for (const entity of this.entities) {
      entity.update(this.entities);
    }

    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        this.entities[i].interact(this.entities[j]);
        this.entities[j].interact(this.entities[i]);
      }
    }

    this.entities = this.entities.filter(entity => !entity.isDead());

    this.composer.render();
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
}

export { World };