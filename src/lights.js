import * as THREE from 'three';


export const directionalLight = new THREE.DirectionalLight("#E1FFFD", 0.2);
directionalLight.position.set(0, 12, 0);
directionalLight.lookAt(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

/* shadows camera */
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.near = 0.33;
directionalLight.shadow.camera.far = 50;

/* shift shadows */
directionalLight.shadow.bias = -0.001;

export const directionalLeftSideLight = new THREE.DirectionalLight("#E1FFFD", 0.5);
directionalLeftSideLight.position.set(-4, 2, 4);
directionalLeftSideLight.lookAt(0, 0, 0);
directionalLeftSideLight.shadow.mapSize.width = 512;
directionalLeftSideLight.shadow.mapSize.height = 512;
directionalLeftSideLight.shadow.camera.near = 0.5;
directionalLeftSideLight.shadow.camera.far = 50;

export const directionalTopLight = new THREE.DirectionalLight("#FFFFFF", 0.5);
directionalTopLight.position.set(0, 5, -2);
directionalTopLight.lookAt(0, 0, 0);
directionalTopLight.shadow.mapSize.width = 512;
directionalTopLight.shadow.mapSize.height = 512;


export const ambientLight = new THREE.AmbientLight(0xE7F3FE, 4);