import * as THREE from 'three';

abstract class Entity {
  protected position: THREE.Vector3;
  protected velocity: THREE.Vector3;
  protected acceleration: THREE.Vector3;
  protected mesh: THREE.Mesh;
  protected lifespan: number;

  constructor(position: THREE.Vector3) {
    this.position = position;
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.lifespan = 1.0;
    this.mesh = this.createMesh();
  }

  abstract createMesh(): THREE.Mesh;
  abstract update(entities: Entity[]): void;
  abstract interact(other: Entity): void;

  getMesh(): THREE.Mesh {
    return this.mesh;
  }

  getPosition(): THREE.Vector3 {
    return this.position;
  }

  isDead(): boolean {
    return this.lifespan <= 0;
  }
}

class Soul extends Entity {
  private partner: Soul | null = null;

  createMesh(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffaaaa });
    return new THREE.Mesh(geometry, material);
  }

  update(entities: Entity[]): void {
    // 魂の動きを更新
    if (this.partner) {
      const direction = this.partner.getPosition().sub(this.position);
      this.acceleration.add(direction.normalize().multiplyScalar(0.001));
    } else {
      this.acceleration.add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(0.001));
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.mesh.position.copy(this.position);

    // パートナーを探す
    if (!this.partner) {
      const potentialPartners = entities.filter(e => e instanceof Soul && e !== this && !(e as Soul).partner);
      if (potentialPartners.length > 0) {
        this.partner = potentialPartners[Math.floor(Math.random() * potentialPartners.length)] as Soul;
        this.partner.partner = this;
      }
    }

    // 寿命を減らす
    this.lifespan -= 0.0001;
  }

  interact(other: Entity): void {
    if (other instanceof Soul && this.partner === other) {
      this.lifespan += 0.0002;
      this.lifespan = Math.min(this.lifespan, 1.0);
    }
  }
}

class Celestial extends Entity {
  private mass: number;

  constructor(position: THREE.Vector3, mass: number) {
    super(position);
    this.mass = mass;
  }

  createMesh(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(this.mass * 0.1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffaa });
    return new THREE.Mesh(geometry, material);
  }

  update(entities: Entity[]): void {
    for (const e of entities) {
      if (e !== this) {
        this.interact(e);
      }
    }
    this.position.add(this.velocity);
    this.mesh.position.copy(this.position);
  }

  interact(other: Entity): void {
    const direction = other.getPosition().sub(this.position);
    const distance = direction.length();
    const forceMagnitude = (this.mass * 0.00001) / (distance * distance);
    const force = direction.normalize().multiplyScalar(forceMagnitude);
    this.acceleration.add(force);
  }
}

class Genome extends Entity {
  createMesh(): THREE.Mesh {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.05, 0, 0),
      new THREE.Vector3(0.05, 0, 0),
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(0, -0.05, 0)
    ]);
    const geometry = new THREE.TubeGeometry(curve, 64, 0.01, 8, false);
    const material = new THREE.MeshPhongMaterial({ color: 0xaaffaa });
    return new THREE.Mesh(geometry, material);
  }

  update(entities: Entity[]): void {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.position.add(this.velocity);
    this.mesh.position.copy(this.position);
  }

  interact(other: Entity): void {
    if (other instanceof Organism) {
      const direction = other.getPosition().sub(this.position);
      this.acceleration.add(direction.normalize().multiplyScalar(0.0001));
    }
  }
}

class Organism extends Entity {
  private shape: THREE.Shape;

  createMesh(): THREE.Mesh {
    this.shape = new THREE.Shape();
    this.updateShape();
    const geometry = new THREE.ShapeGeometry(this.shape);
    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaff, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
  }

  private updateShape(): void {
    this.shape.clear();
    const radius = 0.05;
    const segments = 8;
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta) * radius * (0.8 + Math.random() * 0.4);
      const y = Math.sin(theta) * radius * (0.8 + Math.random() * 0.4);
      if (i === 0) {
        this.shape.moveTo(x, y);
      } else {
        this.shape.lineTo(x, y);
      }
    }
    this.shape.closePath();
  }

  update(entities: Entity[]): void {
    this.updateShape();
    (this.mesh.geometry as THREE.ShapeGeometry).dispose();
    this.mesh.geometry = new THREE.ShapeGeometry(this.shape);

    for (const e of entities) {
      if (e !== this) {
        this.interact(e);
      }
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.mesh.position.copy(this.position);
  }

  interact(other: Entity): void {
    const direction = other.getPosition().sub(this.position);
    const distance = direction.length();
    if (distance < 0.2) {
      this.acceleration.add(direction.normalize().multiplyScalar(0.0001));
    }
  }
}

export { Entity, Soul, Celestial, Genome, Organism };