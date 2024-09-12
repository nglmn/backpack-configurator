import * as THREE from 'three';

// Направлене світло (імітація сонячного світла)
export const directionalLight = new THREE.DirectionalLight("#E1FFFD", 3);
directionalLight.position.set(0, 1, 0); // Розташування джерела світла
directionalLight.lookAt(0, 0, 0);
directionalLight.castShadow = true;       // Кидає тіні
directionalLight.shadow.mapSize.width = 1024; // Роздільна здатність тіней
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

// Точкове світло для деталізації
export const pointLight = new THREE.PointLight(0xffaa00, 0.6, 100);
pointLight.lookAt(0, 0, 0);
pointLight.position.set(0, 2, 2);


// Гемісферичне світло (м'яке природне освітлення неба та землі)
export const hemiLight = new THREE.HemisphereLight(0x87CEEB, "black", 0.5); // Блакитне небо і біла земля

// Прямокутне світло для імітації відбитого світла чи вікна
export const rectLight = new THREE.RectAreaLight(0xffffff, 2, 4, 10);
rectLight.position.set(5, 5, 0);
rectLight.lookAt(0, 0, 0); // Направляємо світло на сцену
