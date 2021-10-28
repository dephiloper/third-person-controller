import * as THREE from "three";

export interface IEntity {
  mesh: THREE.Mesh;
  get position(): THREE.Vector3;
  set position(position: THREE.Vector3);
}