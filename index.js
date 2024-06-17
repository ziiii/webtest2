
//import * as THREE from 'three';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';


const modelPosZ=600;
const cameraPosZ=modelPosZ+850; //850
let logoDisappear=false;
let magicPosZ=modelPosZ;

//load the video 
let video = document.getElementById('video');
let videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
// const tl = gsap.timeline();
let scanModel;
let logoModel;
let blenderModel;

const movieMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.FrontSide,
    toneMapped: false,
})


const scene = new THREE.Scene();
const sizes = (window.innerWidth, window.innerHeight);
const near = 0.1;
const far = 3000;
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, near, far);
camera.position.set(70, -40, cameraPosZ);
scene.add(camera);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000); // Set backgroxsund color to black
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);



const logoStartX=35;
const logoStartY=-45;
const logoStartZ=1200;

//LOAD LOGO pink
const loader2= new GLTFLoader();
loader2.load('asset/logoModel-PINK/logo copy.gltf', function (gltf) {
    logoModel=gltf.scene;
     scene.add(gltf.scene);
     gltf.scene.scale.set(600, 600, 600);
     gltf.scene.position.set(logoStartX, logoStartY, logoStartZ);
     console.log(gltf.scene);

 }, function (xhr) {
     console.log((xhr.loaded / xhr.total * 100) + "%");
 }, function (error) {
     console.error('An error occurred:', error);
 
 });

//load gallery
 const loader = new GLTFLoader();
loader.load('asset/testModel/untitled.gltf', function (gltf) {
    scanModel=gltf.scene;
    scene.add(gltf.scene);
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.set(20, -200, modelPosZ);
   gltf.scene.rotation.y = Math.PI /80;
    console.log(gltf);
   // logoModel.visible=false;
   // gltf.scene.visible=false;
   fadeOut(logoModel);
// if(logoDisappear==true){
   // playTimeline();
// }
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%");
}, function (error) {
    console.error('An error occurred:', error);
});


//load BLENDER mesh
const loader3 = new GLTFLoader();
loader3.load('asset/galleryGLTF/gallerymodel.gltf',function(gltf){
     blenderModel=gltf.scene;
    // scene.add(gltf.scene);
     gltf.scene.scale.set(1,1,1);
     gltf.scene.position.set(30,-200,magicPosZ);
     // gltf2.scene.rotation.y=Math.PI /10;
     console.log(gltf);
    //   gltf.scene.visible=magicWorld;
 },function(xhr){
     console.log((xhr.loaded/xhr.total*100)+"%");
 },function(error){
     console.error('An error occurred:', error);
 
 });


 const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });


//ADD lighting
const topLight = new THREE.SpotLight(0xffffff, 0.8, 200,0.5); // (color, intensity)
topLight.position.set(logoStartX, logoStartY, logoStartZ+100) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);
const spotLightHelper = new THREE.SpotLightHelper( topLight );
//scene.add( spotLightHelper );

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
ambientLight.position.set(30, 20, 500);
scene.add(ambientLight);


//Orbitcontrols
const controls = new OrbitControls( camera, renderer.domElement );
//camera.position.set(40,-40, 850 );
//controls.update();



//fade out logo
function fadeOut(object) {
    let opacity = 1;

    function deOpacity() {
        if (opacity > 0) {
            opacity -= 0.01;
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.transparent = true;
                    child.material.opacity = opacity;
                }
            });
            requestAnimationFrame(deOpacity);


        } else {
            scene.remove(object);
           playTimeline();   //after the fading out is done, start animation
        }
    }
    deOpacity();
    
}






//ANIMATE
function animate() {
    requestAnimationFrame(animate);
    //controls.update();

if(logoModel){
 logoModel.rotation.y+=0.02;
}
    renderer.render(scene, camera);
}
animate();


//TIMELINE animation 一个完了再另一个
//  window.addEventListener('mousedown', function () {

  function playTimeline(){
    const tl = gsap.timeline();

    tl.to(camera.position, {      //MOVE IN from gate
        z: cameraPosZ-900,
        duration: 4.5,
        // ease: "power2.inOut",
        onUpdate: () => {
            console.log("Turning: ", camera.rotation.y);
            camera.updateProjectionMatrix(); // Ensure camera updates
        }
    })

    .to(camera.rotation, {
        y: 0.9,                // turn left
        duration: 2.5
    })


    .to(camera.rotation, {
        y: 0,                  // Turn right
        duration: 3
        
    })
    //  .to(camera.position, {
    //     z: cameraPosZ-900,  
    //     duration: 2.5
    // },"<")

   
    .to(camera.position, {
        z: cameraPosZ-1100,  
        x:120,
        y:-60,
        duration: 2.5
    })
 

    .to(camera.position, {
        z: cameraPosZ-1400,  
        duration: 1.5
    })

  



;
   
  }




