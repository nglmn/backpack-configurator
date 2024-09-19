import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { denimMaterial, silverMaterial, fabricMaterial, goldMaterial, leatherMaterial, blackMetalMaterial } from './materials';
import { directionalLight, directionalLeftSideLight, directionalTopLight, ambientLight } from './lights';


const arButton = document.querySelector('.ar-btn');
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
  'metalic-black': blackMetalMaterial
}
const bodyColor = {
  brown: '#8D5928',
  black: '#1D2125',
  blue: '#01356D'
}

/* scene */
export const scene = new THREE.Scene();
scene.rotateX(0.15)

/* camera */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

/* renderer */
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
modelContainer.appendChild(renderer.domElement);

/* scene shadow */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/* lights */
scene.add(directionalLight)
scene.add(directionalLeftSideLight)
scene.add(directionalTopLight);
scene.add(ambientLight);

/* HDRI map */
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const hdriLoader = new RGBELoader()
hdriLoader.load('brown_photostudio_02_1k.hdr', function (texture) {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  texture.dispose();
  scene.environment = envMap;
});

/* shadow plane */
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.25 });
const plane = new THREE.Mesh(planeGeometry, shadowMaterial);
plane.position.set(0, 0, 0);
plane.scale.set(5, 5, 5);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

/* backpack */
let backpack;
const loader = new GLTFLoader();
loader.load('backpack.glb', function (gltf) {
  backpack = gltf.scene;
  adjustBackpackScale();
  backpack.position.set(0, 0, 0.1);
  backpack.castShadow = true;
  scene.add(backpack);

  backpack.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.name === "Mesh") {
        child.material = denimMaterial;
        child.material.color.setHex(changeFormatColor(bodyColor.brown))
      }
      if (child.name === "Mesh_1") {
        child.material = silverMaterial;
      }
      if (child.name === "Mesh_2") {
        child.material.color.setHex(changeFormatColor(bodyColor.brown))
      }
    }
  });
  centerScene(scene);
});

/* orbit controls */
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableZoom = false;
adjustControls();

/* render animation */
function render() {
  requestAnimationFrame(render);
  orbitControls.update()
  renderer.render(scene, camera);
}
render();


/* material change */
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
            child.material.color.setHex(changeFormatColor(color))
          }
          if (child.name === "Mesh_2") {
            child.material.color.setHex(changeFormatColor(color))
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
            child.material.color.setHex(changeFormatColor(color))
          }
          if (child.name === "Mesh_2") {
            child.material.color.setHex(changeFormatColor(color))
          }
        }
      });
    }
  });
});


/* modal */
arButton.addEventListener('click', () => {
  modal.style.display = 'block';
  scene.remove(backpack);
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  scene.add(backpack);
});

window.addEventListener('click', (event) => {
  if (event.target !== modal && event.target !== arButton) {
    modal.style.display = 'none';
    scene.add(backpack);
  }
});



//===============
/* AXIS HELPERS */
//===============

/* floor helper */
// const size = 10;
// const divisions = 10;

// const gridHelper = new THREE.GridHelper(size, divisions);
// scene.add(gridHelper);

// const lightHelper = new THREE.DirectionalLightHelper(directionalTopLight, 1);
// scene.add(lightHelper);

/* backpack adaptation scaling */
function adjustBackpackScale() {
  if (window.innerWidth >= 768) {
    backpack.scale.set(12, 12, 12);
  }
  if (window.innerWidth >= 200 && window.innerWidth < 768) {
    backpack.scale.set(10, 10, 10);
  }
}

/* controls adaptation */
function adjustControls() {
  if (window.innerWidth >= 768) {
    orbitControls.enableZoom = true;
    orbitControls.minDistance = 8;
    orbitControls.maxDistance = 10;
  }
}

/* scene center */
function centerScene(scene) {
  const box = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3(); //find scene center
  box.getCenter(center);
  scene.position.sub(center); //scene center === center (0,0,0)
}

function changeFormatColor(color) {
  return Number(color.toString().replace('#', '0x'));
}