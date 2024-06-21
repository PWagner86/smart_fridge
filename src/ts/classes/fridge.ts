import * as THREE from 'three';

export default class Fridge {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private screen: HTMLDivElement;

    constructor() {

        this.screen = document.querySelector('[data-fridge-screen]') as HTMLDivElement;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.screen.clientWidth / this.screen.clientHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize( this.screen.clientWidth, this.screen.clientHeight );
        this.screen.append(this.renderer.domElement);

        this.animate();
    }

    private animate() {
        
        requestAnimationFrame((t) => {
            // console.log(t);
            this.renderer.render( this.scene, this.camera );
            this.animate();
        });
    }
}