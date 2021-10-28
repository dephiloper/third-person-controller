import { Player } from "./player";
import { ThirdPersonCamera } from "./camera";
import * as THREE from "three";
import { Clock } from "three";

class Game {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  clock: Clock = new Clock();
  player: Player;
  camera: ThirdPersonCamera;

  public Init(): void {
    this.scene = new THREE.Scene();
    this.player = new Player();
    this.player.position.set(0, .5, 0);
    
    this.camera = new ThirdPersonCamera(this.player);
    this.scene.add(this.player.mesh);
    this.setupLight();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera.main);

    document.body.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop(() => this.process());

    const geometry = new THREE.BoxGeometry(20, 0.1, 20);
    const color = new THREE.Color(0.8, 0.8, 0.8);
    const material = new THREE.MeshLambertMaterial({ color });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, -.05, 0);
    plane.castShadow = false;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  private setupLight(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.position.set(10, 20, 0);
    this.scene.add(directionalLight);

  }

  private process(): void {
    const delta = this.clock.getDelta();
    this.player.Update(delta);
    this.camera.Update(delta);
 

    this.renderer.render(this.scene, this.camera.main);
  }
}

const game = new Game();
game.Init();