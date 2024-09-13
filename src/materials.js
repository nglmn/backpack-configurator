import * as THREE from 'three';

/* denim */
const textureLoaderDenimBase = new THREE.TextureLoader();
const denimBaseColor = textureLoaderDenimBase.load('/textures/denim_baseColor.jpg');
const denimNormalMap = textureLoaderDenimBase.load('/textures/denim_normal.jpg');
const denimORMMap = textureLoaderDenimBase.load('/textures/denim_occlusionRoughnessMetallic.jpg');
denimBaseColor.wrapS = THREE.RepeatWrapping;
denimBaseColor.wrapT = THREE.RepeatWrapping;
denimBaseColor.repeat.set(1, -1);
denimNormalMap.wrapS = THREE.RepeatWrapping;
denimNormalMap.wrapT = THREE.RepeatWrapping;
denimNormalMap.repeat.set(1, -1);
denimORMMap.wrapS = THREE.RepeatWrapping;
denimORMMap.wrapT = THREE.RepeatWrapping;
denimORMMap.repeat.set(1, -1);

export const denimMaterial = new THREE.MeshPhysicalMaterial({
    map: denimBaseColor,
    normalMap: denimNormalMap,
    aoMap: denimORMMap,
    roughnessMap: denimORMMap,
    metalnessMap: denimORMMap,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.3,
});


/* straps */
const textureStraps = new THREE.TextureLoader();
const strapBaseColor = textureStraps.load('/textures/strap_baseColor.jpg');
const strapNormalMap = textureStraps.load('/textures/strap_normal.jpg');
const strapORMMap = textureStraps.load('/textures/strap_occlusionRoughnessMetallic.jpg');
strapBaseColor.wrapS = THREE.RepeatWrapping;
strapBaseColor.wrapT = THREE.RepeatWrapping;
strapBaseColor.repeat.set(1, -1);
strapNormalMap.wrapS = THREE.RepeatWrapping;
strapNormalMap.wrapT = THREE.RepeatWrapping;
strapNormalMap.repeat.set(1, -1);
strapORMMap.wrapS = THREE.RepeatWrapping;
strapORMMap.wrapT = THREE.RepeatWrapping;
strapORMMap.repeat.set(1, -1);

export const strapsMaterial = new THREE.MeshPhysicalMaterial({
    map: strapBaseColor,
    normalMap: strapNormalMap,
    aoMap: strapORMMap,
    roughnessMap: strapORMMap,
    metalnessMap: strapORMMap,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.3,
});

/* fabric */
const textureLoaderFabricBase = new THREE.TextureLoader();
const fabricBaseColor = textureLoaderFabricBase.load('/textures/fabric_baseColor.jpg');
const fabricNormalMap = textureLoaderFabricBase.load('/textures/fabric_normal.jpg');
const fabricORMMap = textureLoaderFabricBase.load('/textures/fabric_occlusionRoughnessMetallic.jpg');
fabricBaseColor.wrapS = THREE.RepeatWrapping;
fabricBaseColor.wrapT = THREE.RepeatWrapping;
fabricBaseColor.repeat.set(1, -1);
fabricNormalMap.wrapS = THREE.RepeatWrapping;
fabricNormalMap.wrapT = THREE.RepeatWrapping;
fabricNormalMap.repeat.set(1, -1);
fabricORMMap.wrapS = THREE.RepeatWrapping;
fabricORMMap.wrapT = THREE.RepeatWrapping;
fabricORMMap.repeat.set(1, -1);

export const fabricMaterial = new THREE.MeshPhysicalMaterial({
    map: fabricBaseColor,
    normalMap: fabricNormalMap,
    aoMap: fabricORMMap,
    roughnessMap: fabricORMMap,
    metalnessMap: fabricORMMap,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.3,
});


/* leather */
const textureLoaderLeatherBase = new THREE.TextureLoader();
const leatherBaseColor = textureLoaderLeatherBase.load('/textures/leather_baseColor.jpg');
const leatherNormalMap = textureLoaderLeatherBase.load('/textures/leather_normal.jpg');
const leatherORMMap = textureLoaderLeatherBase.load('/textures/leather_occlusionRoughnessMetallic.jpg');
leatherBaseColor.wrapS = THREE.RepeatWrapping;
leatherBaseColor.wrapT = THREE.RepeatWrapping;
leatherBaseColor.repeat.set(1, -1);
leatherNormalMap.wrapS = THREE.RepeatWrapping;
leatherNormalMap.wrapT = THREE.RepeatWrapping;
leatherNormalMap.repeat.set(1, -1);
leatherORMMap.wrapS = THREE.RepeatWrapping;
leatherORMMap.wrapT = THREE.RepeatWrapping;
leatherORMMap.repeat.set(1, -1);

export const leatherMaterial = new THREE.MeshPhysicalMaterial({
    map: leatherBaseColor,
    normalMap: leatherNormalMap,
    aoMap: leatherORMMap,
    roughnessMap: leatherORMMap,
    metalnessMap: leatherORMMap,
    roughness: 0.8,
    metalness: 0.3,
    clearcoat: 0.4,
    clearcoatRoughness: 0.7,
    reflectivity: 0.2,
    envMapIntensity: 0.9,
});

/* hardware */
const textureSivlerHardware = new THREE.TextureLoader();
const silverBaseColor = textureSivlerHardware.load('/textures/strap_baseColor.jpg');
const silverNormalMap = textureSivlerHardware.load('/textures/strap_normal.jpg');
const silverORMMap = textureSivlerHardware.load('/textures/strap_occlusionRoughnessMetallic.jpg');
silverBaseColor.wrapS = THREE.RepeatWrapping;
silverBaseColor.wrapT = THREE.RepeatWrapping;
silverBaseColor.repeat.set(1, -1);
silverNormalMap.wrapS = THREE.RepeatWrapping;
silverNormalMap.wrapT = THREE.RepeatWrapping;
silverNormalMap.repeat.set(1, -1);
silverORMMap.wrapS = THREE.RepeatWrapping;
silverORMMap.wrapT = THREE.RepeatWrapping;
silverORMMap.repeat.set(1, -1);

export const silverMaterial = new THREE.MeshPhysicalMaterial({
    map: silverBaseColor,
    normalMap: silverNormalMap,
    roughnessMap: silverORMMap,
    metalness: 1,
    roughness: 0.2,
    envMapIntensity: 0.8,
    reflectivity: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: '#BDBDBD'
});

export const goldMaterial = new THREE.MeshPhysicalMaterial({
    map: silverBaseColor,
    normalMap: silverNormalMap,
    roughnessMap: silverORMMap,
    metalness: 1,
    roughness: 0.15,
    envMapIntensity: 1.0,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    color: '#C1A55C'
});

export const blackMetalMaterial = new THREE.MeshPhysicalMaterial({
    map: silverBaseColor,
    normalMap: silverNormalMap,
    aoMap: silverORMMap,
    metalness: 1,
    roughness: 0.2,
    envMapIntensity: 0,
    reflectivity: 0.8,
    color: "#414A53"
});
