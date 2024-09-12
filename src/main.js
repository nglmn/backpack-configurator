import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

import { denimMaterial, denimStrapMaterial, silverMaterial, fabricMaterial, goldMaterial, leatherMaterial } from './materials';
import { directionalLight, pointLight, rectLight } from './lights';
// Ініціалізуємо сцену
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.8;


// Рендерер
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
  backpack.position.set(0, -0.1, 0);
  backpack.rotation.set(0.3, 0, 0);
  scene.add(backpack);

  backpack.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      switch (child.name) {
        case "Mesh": {
          child.material = leatherMaterial
          break;
        };
        case "Mesh_1": {
          child.material = silverMaterial;
          break;
        };
        case "Mesh_2": {
          child.material = denimStrapMaterial;
          break;
        };
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

// Створюємо матеріали
// const materials = {
//   denim: denimMaterial,
//   fabric: fabricMaterial,
//   leather: leatherMaterial
// };

// Створюємо фурнітуру (матеріали для металевих частин)
// const hardwareMaterials = {
//   silver: new THREE.MeshBasicMaterial({ color: "#fffddd" }),
//   black: new THREE.MeshBasicMaterial({ color: 0x000000 }),
//   gold: new THREE.MeshBasicMaterial({ color: 0xffd700 })
// };

// // Функції для оновлення матеріалів, кольорів і фурнітури
// function updateMaterial(material) {
//   if (backpack) {
//     backpack.traverse((child) => {
//       if (child.isMesh) {
//         child.material = materials[material];
//       }
//     });
//   }
// }

// function updateColor(color) {
//   if (backpack) {
//     backpack.traverse((child) => {
//       if (child.isMesh) {
//         child.material.color.set(colors[color]);
//       }
//     });
//   }
// }

// function updateHardware(hardware) {
//   if (backpack) {
//     backpack.traverse((child) => {
//       if (child.isMesh && child.name.includes('hardware')) { // Приклад пошуку фурнітури
//         child.material = hardwareMaterials[hardware];
//       }
//     });
//   }
// }

// // Відстеження вибору користувача
// document.getElementById('material').addEventListener('change', (e) => {
//   updateMaterial(e.target.value);
// });

// document.getElementById('color').addEventListener('change', (e) => {
//   updateColor(e.target.value);
// });

// document.getElementById('hardware').addEventListener('change', (e) => {
//   updateHardware(e.target.value);
// });


