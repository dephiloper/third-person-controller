import { IInput, Input } from "./input";
import { IEntity } from "./entity";
import * as THREE from "three";

const speed: number = 2;
const input: IInput = Input.Instance;

export class Player implements IEntity {
  public mesh: THREE.Mesh;
  public vel: THREE.Vector3 = new THREE.Vector3();

  constructor() {
    this.init();
  }

  private init(): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const color = new THREE.Color(1.0, 0.0, 0.0);
    const material = new THREE.MeshLambertMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
  }

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  public set position(value: THREE.Vector3) {
    this.mesh.position.copy(value);
  }

  public Update(delta: number) {
    this.vel = new THREE.Vector3();
    if (input.forward) this.vel.add(new THREE.Vector3(0, 0, 1));
    if (input.backward) this.vel.add(new THREE.Vector3(0, 0, -1));
    if (input.right) this.vel.add(new THREE.Vector3(-1, 0, 0));
    if (input.left) this.vel.add(new THREE.Vector3(1, 0, 0));
    this.position.add(this.vel.normalize().multiplyScalar(speed * delta));
  }
}