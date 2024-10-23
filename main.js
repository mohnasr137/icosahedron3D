// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import WebGL from "three/addons/capabilities/WebGL.js";
// import getStarfield from "./getStarfield.js";
// import { getFresnelMat } from "./getFresnelMat.js";

// if (WebGL.isWebGL2Available()) {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
//   const renderer = new THREE.WebGLRenderer({ antialias: true });

//   document.body.appendChild(renderer.domElement);
//   renderer.setAnimationLoop(animate);
//   renderer.setSize(width, height);
//   camera.position.z = 3;

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.dampingFactor = 0.2;
//   controls.minDistance = 2.3;
//   controls.maxDistance = 8;
//   window.addEventListener("resize", onWindowResize);

//   const loader = new THREE.TextureLoader();
//   const earthMap = loader.load("./images/earth_atmos_4096.jpg");
//   earthMap.colorSpace = THREE.SRGBColorSpace;
//   earthMap.anisotropy = 8;
//   const earthCloud = loader.load("./images/earth_clouds_2048.png");
//   earthCloud.colorSpace = THREE.SRGBColorSpace;
//   earthCloud.anisotropy = 8;

//   const geometry = new THREE.IcosahedronGeometry(1, 16);
//   const material = new THREE.MeshStandardMaterial({
//     map: earthMap,
//   });
//   const earth = new THREE.Mesh(geometry, material);
//   // earth.rotation.z = (-23.5 * Math.PI) / 180;
//   earth.scale.set(1.25, 1.25, 1.25);
//   scene.add(earth);

//   const cloudsMat = new THREE.MeshStandardMaterial({
//     map: earthCloud,
//     blending: THREE.AdditiveBlending,
//   });
//   const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
//   cloudsMesh.scale.setScalar(1.003);
//   earth.add(cloudsMesh);

//   const fresnelMat = getFresnelMat();
//   const glowMesh = new THREE.Mesh(geometry, fresnelMat);
//   glowMesh.scale.setScalar(1.01);
//   earth.add(glowMesh);

//   const stars = getStarfield({ numStars: 1500 });
//   scene.add(stars);

//   const sunLight = new THREE.AmbientLight(0xffffff, 2);
//   scene.add(sunLight);

//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }
//   function animate() {
//     earth.rotation.y += 0.002;
//     cloudsMesh.rotation.y += 0.001;
//     renderer.render(scene, camera);
//     controls.update();
//   }
// } else {
//   const warning = WebGL.getWebGL2ErrorMessage();
//   document.getElementById("container").appendChild(warning);
// }

// const text = "Your text goes here.";
// const typingTextElement = document.getElementById("typing-text");
// let index = 0;
// function type() {
//   if (index < text.length) {
//     typingTextElement.textContent += text.charAt(index);
//     index++;
//     setTimeout(type, 35);
//   }
// }
// type();


import * as THREE from "three";
import { getFXScene } from "./imports/FXScene.js";
import { getTransition } from "./imports/Transition.js";

const clock = new THREE.Clock();
let transition;
init();
animate();

function init() {
  const container = document.getElementById("container");

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const materialA = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  const materialB = new THREE.MeshStandardMaterial({
    color: 0xff9900,
    flatShading: true,
  });
  const sceneA = getFXScene({
    renderer,
    material: materialA,
    clearColor: 0x000000,
  });
  const sceneB = getFXScene({
    renderer,
    material: materialB,
    clearColor: 0x000000,
    needsAnimatedColor: true,
  });

  transition = getTransition({ renderer, sceneA, sceneB });
}

function animate() {
  requestAnimationFrame(animate);
  transition.render(clock.getDelta());
}