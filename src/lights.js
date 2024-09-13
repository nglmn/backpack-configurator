import * as THREE from 'three';


export const directionalLight = new THREE.DirectionalLight("#E1FFFD", 3);
directionalLight.position.set(0, 1, 0);
directionalLight.lookAt(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;


export const pointLight = new THREE.PointLight(0xffaa00, 0.6, 100);
pointLight.lookAt(0, 0, 0);
pointLight.position.set(0, 2, 2);



export const hemiLight = new THREE.HemisphereLight(0x87CEEB, "black", 0.5);


export const rectLight = new THREE.RectAreaLight(0xffffff, 2, 4, 10);
rectLight.position.set(5, 5, 0);
rectLight.lookAt(0, 0, 0); 
