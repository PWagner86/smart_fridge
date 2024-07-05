import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default class Fridge {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private screen: HTMLDivElement;
    private loader: OBJLoader;
    private orbitControls: OrbitControls;
    private hemiLight: THREE.HemisphereLight;
    private dirLight: THREE.DirectionalLight;

    constructor() {

        this.screen = document.querySelector('[data-fridge-screen]') as HTMLDivElement;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            this.screen.clientWidth / this.screen.clientHeight,
            0.1,
            10000
        );
        this.camera.position.set(0, 0, 4);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.screen.clientWidth, this.screen.clientHeight);

        this.screen.append(this.renderer.domElement);

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)

        this.loader = new OBJLoader();

        this.hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 3);

        this.dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.dirLight.position.set(5, 10, 20)
        this.dirLight.castShadow = true;
        this.dirLight.receiveShadow = true;


    }

    private loadFridge() {
        this.loader.load(
            '/fridge_model/Kitchen_Fridge.obj',
            (object) => {
                object.position.set(0, -1.6, 0);
                object.rotateY(Math.PI / 7)
                object.traverse(d => {
                    d.castShadow = true;
                    d.receiveShadow = true;
                })
                this.scene.add(object);
            },
            (xhr) => {
                console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            (error) => {
                console.log(`An error happend: ${error}`);
            }
        )
    }

    private animate() {
        
        requestAnimationFrame(() => {
            this.orbitControls.update();
            this.renderer.render( this.scene, this.camera );
            this.animate();
        });
    }

    public initFridge() {
        this.scene.add(this.hemiLight, this.dirLight);
        this.loadFridge();
        this.animate();
    }

}