import { IEntity } from "./entity";
import * as THREE from "three";
import { Vector3 } from "three";

export class ThirdPersonCamera {
  main: THREE.Camera;
  target: IEntity;
  position: THREE.Vector3 = new Vector3();
  lookAt: THREE.Vector3 = new Vector3();

  constructor(target: IEntity) {
    this.main = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1.0, 1000.0);
    
    this.target = target;
  }
  public Update(delta: number) {
    const idealOffset = this.calculateIdealOffset();
    const idealLookAt = this.calculateIdealLookAt();

    const t = 1.0 - Math.pow(0.01, delta);

    this.position.lerp(idealOffset, t);
    this.lookAt.lerp(idealLookAt, t);

    this.main.position.copy(this.position);
    this.main.lookAt(this.lookAt);
  }

  private calculateIdealOffset(): THREE.Vector3 {
    const idealOffset = new THREE.Vector3(-1, 2, -6);
    idealOffset.applyQuaternion(this.target.mesh.quaternion);
    idealOffset.add(this.target.position);
    return idealOffset;
  }
  
  private calculateIdealLookAt(): THREE.Vector3 {
    const idealLookAt = new THREE.Vector3(0, 1, 10);
    idealLookAt.applyQuaternion(this.target.mesh.quaternion);
    idealLookAt.add(this.target.position);
    return idealLookAt;
  }
}