import * as THREE from '/bulid/three.module.js';
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './jsm/controls/OrbitControls.js';


// console.log(OrbitControls)
// console.log(GLTFLoader)
// console.log(THREE)

let scene;
let camera;
let renderer;
let model;
let model_container = document.querySelector('.web-gl');
const canvasSize = document.querySelector('.canvas-element');


const init = ()=>{
    scene = new THREE.Scene();
    // console.log(scene);

    const fov = 40;
    const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight ;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
        // console.log(camera)
        camera.position.set(0,0,25);
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true,
            canvas:model_container
        })
        renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
        renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio :1);
        renderer.autoClear = false;
        renderer.setClearColor(0X000000, 0.0);

        const controls = new OrbitControls(camera, renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const spotLight1 = new THREE.SpotLight(0x1d27f0,5);
        spotLight1.position.set(6,11,6);
        const spotLighthelper1 = new THREE.SpotLightHelper(spotLight1,1,0x00ff00);
        scene.add(spotLight1);
        // scene.add(spotLighthelper1);

        const spotLight2 = new THREE.SpotLight(0xf57d22,2);
        spotLight2.position.set(-1,5,12);
        const spotLighthelper2 = new THREE.SpotLightHelper(spotLight2,2,0xffffff);
        scene.add(spotLight2);
        // scene.add(spotLighthelper2);




        const loader = new GLTFLoader();
        loader.load('./model/p1.glb', (gltf)=>{
            model = gltf.scene.children[0];
            model.scale.set(40, 40, 40);
            model.position.set(0.5, -0.4,0.4);
            model.rotation.x = Math.PI / -11;

            scene.add(gltf.scene);
        });
        animate();


}

const render = ()=>{
    renderer.render(scene, camera); 
}

const animate = ()=>{
    requestAnimationFrame(animate);
    render();
}

const windowResize = ()=>{
    camera.aspect = canvasSize.offsetWidth/ canvasSize.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    render()
}
window.addEventListener('resize', windowResize,false);
window.onload = init;