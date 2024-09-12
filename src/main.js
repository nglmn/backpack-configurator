import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

import { denimMaterial, strapsMaterial, silverMaterial, fabricMaterial, goldMaterial, leatherMaterial, blackMetalMaterial } from './materials';
import { directionalLight, pointLight, rectLight } from './lights';


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

const pmremGenerator = new THREE.PMREMGenerator(renderer);

/* HDRI map */
const hdriLoader = new RGBELoader()
hdriLoader.load('assets/lebombo_2k.hdr', function (texture) {
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
loader.load('/assets/backpack.glb', function (gltf) {
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


/* backdrop plane */
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -0.2, 0);
plane.rotation.x = 90;
plane.receiveShadow = true;
scene.add(plane);

/* lights */
scene.add(directionalLight);
scene.add(pointLight);
scene.add(rectLight)

/* mouse control */
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

modelContainer.addEventListener('mousedown', () => {
  isDragging = true;
});

modelContainer.addEventListener('mouseup', () => {
  isDragging = false;
});

modelContainer.addEventListener('mousemove', (event) => {
  if (isDragging && backpack) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };
    backpack.rotation.y += deltaMove.x * 0.005;
    backpack.rotation.x -= deltaMove.y * 0.005;
  }
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
});

/* finger control */
modelContainer.addEventListener('touchstart', (event) => {
  isDragging = true;
  previousMousePosition = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  };
});

modelContainer.addEventListener('touchend', (event) => {
  isDragging = false;
});

modelContainer.addEventListener('touchmove', (event) => {
  if (isDragging && backpack) {
    const deltaMove = {
      x: event.touches[0].clientX - previousMousePosition.x,
      y: event.touches[0].clientY - previousMousePosition.y
    };
    backpack.rotation.y += deltaMove.x * 0.01;
    backpack.rotation.x -= deltaMove.y * 0.01;
    previousMousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
  }
});


/* render animation */
function render() {
  requestAnimationFrame(render);
  if (backpack) {
    backpack.rotation.y += 0.002
  }
  renderer.render(scene, camera);
}

render();


/* matherial change logic*/
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
// Відкриття модального вікна при натисканні на кнопку
arButton.onclick = function () {
  modal.style.display = 'block';
  scene.remove(backpack);
  modelContainer.appendChild(modal)
};

// Закриття модального вікна при натисканні на "x"
closeModalBtn.onclick = function () {
  modal.style.display = 'none';
  scene.add(backpack);
};
