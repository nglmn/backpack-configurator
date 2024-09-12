import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

import { denimMaterial, strapsMaterial, silverMaterial, fabricMaterial, goldMaterial, leatherMaterial, blackMetalMaterial } from './materials';
import { directionalLight, pointLight, rectLight } from './lights';


const arButton = document.querySelector('.ar-btn');
const modal = document.getElementById('arModal');
const closeModal = document.getElementsByClassName('close')[0];
const modelContainer = document.querySelector('.model-container');

// Відкриття модального вікна при натисканні на кнопку
arButton.onclick = function () {
  modal.style.display = 'block';
  modelContainer.style.display = 'none'
};

// Закриття модального вікна при натисканні на "x"
closeModal.onclick = function () {
  modal.style.display = 'none';
  modelContainer.style.display = 'block'
};

// Закриття модального вікна при натисканні поза його межами
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Матеріали
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

// Ініціалізуємо сцену
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 0.8;


// Рендерер
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(750, 750);
modelContainer.appendChild(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const hdriLoader = new RGBELoader()
hdriLoader.load('assets/lebombo_2k.hdr', function (texture) {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  texture.dispose();
  scene.environment = envMap
});

// Налаштування тіней
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // М'які тіні

// Завантажуємо модель рюкзака
let backpack;
const loader = new GLTFLoader();
loader.load('/assets/backpack.glb', function (gltf) {
  backpack = gltf.scene;
  backpack.scale.set(1.2, 1.2, 1.2)
  backpack.position.set(0, -0.2, 0);
  backpack.rotation.set(0.1, 0, 0);
  scene.add(backpack);

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

const planeGeometry = new THREE.PlaneGeometry(1, 1);

// Створюємо матеріал для площини (тут базовий матеріал з червоним кольором)
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 })

// Створюємо Mesh (площину) і додаємо в сцену
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -0.2, 0);  // Позиціонуємо площину на сцені
plane.rotation.x = 90;
plane.receiveShadow = true;
scene.add(plane);

scene.add(directionalLight);
scene.add(pointLight);
scene.add(rectLight)


// Анімація обертання
function render() {
  requestAnimationFrame(render);

  if (backpack) {
    backpack.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}

render();



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


