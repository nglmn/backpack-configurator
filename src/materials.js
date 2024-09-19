import * as THREE from 'three';

/* denim */
const { denim_baseColor, denim_normal, denim_occlusionRoughnessMetallic } = loadTextures(['denim_baseColor', 'denim_normal', 'denim_occlusionRoughnessMetallic']);
export const denimMaterial = new THREE.MeshPhysicalMaterial({
    map: denim_baseColor,
    normalMap: denim_normal,
    aoMap: denim_occlusionRoughnessMetallic,
    roughnessMap: denim_occlusionRoughnessMetallic,
    metalnessMap: denim_occlusionRoughnessMetallic,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.5,
});

/* straps */
const { strap_baseColor, strap_normal, strap_occlusionRoughnessMetallic } = loadTextures(['strap_baseColor', 'strap_normal', 'strap_occlusionRoughnessMetallic']);

export const strapsMaterial = new THREE.MeshPhysicalMaterial({
    map: strap_baseColor,
    normalMap: strap_normal,
    aoMap: strap_occlusionRoughnessMetallic,
    roughnessMap: strap_occlusionRoughnessMetallic,
    metalnessMap: strap_occlusionRoughnessMetallic,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.3,
});

/* fabric */
const { fabric_baseColor, fabric_normal, fabric_occlusionRoughnessMetallic } = loadTextures(['fabric_baseColor', 'fabric_normal', 'fabric_occlusionRoughnessMetallic']);

export const fabricMaterial = new THREE.MeshPhysicalMaterial({
    map: fabric_baseColor,
    normalMap: fabric_normal,
    aoMap: fabric_occlusionRoughnessMetallic,
    roughnessMap: fabric_occlusionRoughnessMetallic,
    metalnessMap: fabric_occlusionRoughnessMetallic,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.3,
});

/* leather */
const { leather_baseColor, leather_normal, leather_occlusionRoughnessMetallic } = loadTextures(['leather_baseColor', 'leather_normal', 'leather_occlusionRoughnessMetallic']);

export const leatherMaterial = new THREE.MeshPhysicalMaterial({
    map: leather_baseColor,
    normalMap: leather_normal,
    normalScale: new THREE.Vector2(2, 2),
    aoMap: leather_occlusionRoughnessMetallic,
    roughnessMap: leather_occlusionRoughnessMetallic,
    metalnessMap: leather_occlusionRoughnessMetallic,
    roughness: 0.9,
    metalness: 0.1,
    reflectivity: 0.1,
    clearcoat: 0.7,
    clearcoatRoughness: 0.3,
    envMapIntensity: 0.5,
});

/* hardware */
const { metall_baseColor, metall_normal, metall_occlusionRoughnessMetallic } = loadTextures(['metall_baseColor', 'metall_normal', 'metall_occlusionRoughnessMetallic']);

export const silverMaterial = new THREE.MeshPhysicalMaterial({
    map: metall_baseColor,
    normalMap: metall_normal,
    roughnessMap: metall_occlusionRoughnessMetallic,
    metalness: 1,
    roughness: 0.4,
    envMapIntensity: 1,
    reflectivity: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: '#BDBDBD'
});

export const goldMaterial = new THREE.MeshPhysicalMaterial({
    map: metall_baseColor,
    normalMap: metall_normal,
    roughnessMap: metall_occlusionRoughnessMetallic,
    metalness: 1,
    roughness: 0.15,
    envMapIntensity: 1.0,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    color: '#C1A55C'
});

export const blackMetalMaterial = new THREE.MeshPhysicalMaterial({
    map: metall_baseColor,
    normalMap: metall_normal,
    aoMap: metall_occlusionRoughnessMetallic,
    metalness: 1,
    roughness: 0.2,
    envMapIntensity: 0,
    reflectivity: 0.8,
    color: "#414A53"
});



function configureTexture(texture, repeatX = 1, repeatY = -1) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
}

function loadTextures(textureNames) {
    const textures = {};
    textureNames.forEach(name => {
        textures[name] = new THREE.TextureLoader().load(`/textures/${name}.jpg`, texture => {
            configureTexture(texture);
        });
    });
    return textures;
}