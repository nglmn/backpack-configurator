import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { denimMaterial, strapsMaterial, silverMaterial, fabricMaterial, goldMaterial, leatherMaterial, blackMetalMaterial } from './materials';
import { directionalLight, pointLight, rectLight } from './lights';


const arButton = document.querySelector('.ar-btn');
const arScene = document.querySelector('a-scene');
const modal = document.getElementById('arModal');
const closeModalBtn = document.querySelector('.close');
const modelContainer = document.querySelector('.model-container');


/* backpack materials */
const bodyMaterials = {
  denim: denimMaterial,
  fabric: fabricMaterial,
  leather: leatherMaterial
};
const hardwareMaterials = {
  silver: silverMaterial,
  gold: goldMaterial,
  black: blackMetalMaterial
}
const bodyColor = {
  brown: '#8B5727',
  black: '#1D2125',
  blue: '#01356D'
}

/* scene */
const scene = new THREE.Scene();

/* camera */
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 0.8;


/* renderer */
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(750, 750);
modelContainer.appendChild(renderer.domElement);


/* HDRI map */
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const hdriLoader = new RGBELoader()
hdriLoader.load('/lebombo_2k.hdr', function (texture) {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  texture.dispose();
  scene.environment = envMap
});

/* scene shadow */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/* backpack */
let backpack;
const loader = new GLTFLoader();
loader.load('/backpack.glb', function (gltf) {
  backpack = gltf.scene;
  backpack.scale.set(1, 1, 1)
  backpack.position.set(0, 0, 0);
  backpack.rotation.set(0.1, 0, 0);
  scene.add(backpack);

  // document.querySelector('a-maker').appendChild(backpack)

  backpack.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.name === "Mesh") {
        child.material = denimMaterial;
        child.material.color.setHex(Number(bodyColor.brown.toString().replace('#', '0x')))
      }
      if (child.name === "Mesh_1") {
        child.material = silverMaterial;
      }
      if (child.name === "Mesh_2") {
        child.material.color.setHex(Number(bodyColor.brown.toString().replace('#', '0x')))
      }
    }
  });
});

/* lights */
scene.add(directionalLight);
scene.add(pointLight);
scene.add(rectLight)

/* orbit controls */
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableZoom = true;
orbitControls.minDistance = 0.7;
orbitControls.maxDistance = 0.9;

/* render animation */
function render() {
  requestAnimationFrame(render);
  if (backpack) {
    backpack.rotation.y += 0.002
  }
  orbitControls.update()
  renderer.render(scene, camera);
}

render();


/* matherial change */
document.querySelectorAll('input[name="material"]').forEach((input) => {
  input.addEventListener('change', (event) => {
    const selectedMaterial = bodyMaterials[event.target.value];
    const selectedColor = document.querySelector('input[name = "body-color"]:checked').value;
    const color = bodyColor[selectedColor];
    if (backpack) {
      backpack.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Mesh") {
            child.material = selectedMaterial;
          }
          if (child.name === "Mesh") {
            child.material.color.setHex(Number(color.toString().replace('#', '0x')))
          }
          if (child.name === "Mesh_2") {
            child.material.color.setHex(Number(color.toString().replace('#', '0x')))
          }
        }
      });
    }
  });
});

/* hardware change */
document.querySelectorAll('input[name="hardware-color"]').forEach((input) => {
  input.addEventListener('change', (event) => {
    const selectedMaterial = hardwareMaterials[event.target.value];
    if (backpack) {
      backpack.traverse((child) => {
        if (child.isMesh && child.name === "Mesh_1") {
          child.material = selectedMaterial;
        }
      });
    }
  });
});

/* color change */
document.querySelectorAll('input[name="body-color"]').forEach((input) => {
  input.addEventListener('change', (event) => {
    const color = bodyColor[event.target.value];
    if (backpack) {
      backpack.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Mesh") {
            child.material.color.setHex(Number(color.toString().replace('#', '0x')))
          }
          if (child.name === "Mesh_2") {
            child.material.color.setHex(Number(color.toString().replace('#', '0x')))
          }
        }
      });
    }
  });
});


/* modal */
/* open */
arButton.onclick = function () {
  modal.style.display = 'block';
  scene.remove(backpack);
  modelContainer.appendChild(modal)
};
/* close */
closeModalBtn.onclick = function () {
  modal.style.display = 'none';
  scene.add(backpack);
};
