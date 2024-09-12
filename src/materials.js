import * as THREE from 'three';

/* denim */
const textureLoaderDenimBase = new THREE.TextureLoader();
const denimBaseColor = textureLoaderDenimBase.load('/assets/textures/denim_baseColor.jpg');
const denimNormalMap = textureLoaderDenimBase.load('/assets/textures/denim_normal.jpg');
const denimORMMap = textureLoaderDenimBase.load('/assets/textures/denim_occlusionRoughnessMetallic.jpg');
denimBaseColor.wrapS = THREE.RepeatWrapping;
denimBaseColor.wrapT = THREE.RepeatWrapping;
denimBaseColor.repeat.set(1, -1);  // Налаштування повторення текстури
denimNormalMap.wrapS = THREE.RepeatWrapping;
denimNormalMap.wrapT = THREE.RepeatWrapping;
denimNormalMap.repeat.set(1, -1);
denimORMMap.wrapS = THREE.RepeatWrapping;
denimORMMap.wrapT = THREE.RepeatWrapping;
denimORMMap.repeat.set(1, -1);  // Налаштування повторення текстури

// Якщо потрібно зсунути текстуру по UV
// testUVTexture.offset.set(0.5, 0.5);
// Створюємо тестовий матеріал з UV-текстурою
export const denimMaterial = new THREE.MeshPhysicalMaterial({
    map: denimBaseColor,         // Основна текстура кольору
    normalMap: denimNormalMap,   // Карта нормалей для дрібних деталей
    aoMap: denimORMMap,          // Карта навколишнього затемнення (Ambient Occlusion)
    roughnessMap: denimORMMap,   // Карта шорсткості
    metalnessMap: denimORMMap,   // Карта металевості
    roughness: 0.8,              // Високий рівень шорсткості для деніму
    metalness: 1,              // Низька металевість, оскільки денім - це тканина
    clearcoat: 0.1,              // Додає легке покриття для блиску
    clearcoatRoughness: 0.9,     // Шорсткість покриття, щоб не було занадто блискучим
    reflectivity: 0.1,           // Легкий ефект відбивання для реалізму
    envMapIntensity: 0.3,         // Імітація впливу оточення
    color: '#A37B5C'
});

const textureDenimStraps = new THREE.TextureLoader();
const denimStrapBaseColor = textureDenimStraps.load('/assets/textures/strap_baseColor.jpg');
const denimStrapNormalMap = textureDenimStraps.load('/assets/textures/strap_normal.jpg');
const denimStrapORMMap = textureDenimStraps.load('/assets/textures/strap_occlusionRoughnessMetallic.jpg');
denimStrapBaseColor.wrapS = THREE.RepeatWrapping;
denimStrapBaseColor.wrapT = THREE.RepeatWrapping;
denimStrapBaseColor.repeat.set(1, -1);  // Налаштування повторення текстури
denimStrapNormalMap.wrapS = THREE.RepeatWrapping;
denimStrapNormalMap.wrapT = THREE.RepeatWrapping;
denimStrapNormalMap.repeat.set(1, -1);
denimStrapORMMap.wrapS = THREE.RepeatWrapping;
denimStrapORMMap.wrapT = THREE.RepeatWrapping;
denimStrapORMMap.repeat.set(1, -1);  // Налаштування повторення текстури

export const denimStrapMaterial = new THREE.MeshPhysicalMaterial({
    map: denimStrapBaseColor,
    normalMap: denimStrapNormalMap,
    aoMap: denimStrapORMMap,
    roughnessMap: denimStrapORMMap,
    metalnessMap: denimStrapORMMap,
    roughness: 0.8,
    metalness: 1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.9,
    reflectivity: 0.1,
    envMapIntensity: 0.3,
    color: '#A37B5C'
});

/* fabric */
const textureLoaderFabricBase = new THREE.TextureLoader();
const fabricBaseColor = textureLoaderFabricBase.load('/assets/textures/fabric_baseColor.jpg');
const fabricNormalMap = textureLoaderFabricBase.load('/assets/textures/fabric_normal.jpg');
const fabricORMMap = textureLoaderFabricBase.load('/assets/textures/fabric_occlusionRoughnessMetallic.jpg');
fabricBaseColor.wrapS = THREE.RepeatWrapping;
fabricBaseColor.wrapT = THREE.RepeatWrapping;
fabricBaseColor.repeat.set(1, -1);  // Налаштування повторення текстури
fabricNormalMap.wrapS = THREE.RepeatWrapping;
fabricNormalMap.wrapT = THREE.RepeatWrapping;
fabricNormalMap.repeat.set(1, -1);
fabricORMMap.wrapS = THREE.RepeatWrapping;
fabricORMMap.wrapT = THREE.RepeatWrapping;
fabricORMMap.repeat.set(1, -1);  // Налаштування повторення текстури

export const fabricMaterial = new THREE.MeshPhysicalMaterial({
    map: fabricBaseColor,         // Основна текстура кольору
    normalMap: fabricNormalMap,   // Карта нормалей для дрібних деталей
    aoMap: fabricORMMap,          // Карта навколишнього затемнення (Ambient Occlusion)
    roughnessMap: fabricORMMap,   // Карта шорсткості
    metalnessMap: fabricORMMap,   // Карта металевості
    roughness: 0.8,              // Високий рівень шорсткості для деніму
    metalness: 1,              // Низька металевість, оскільки денім - це тканина
    clearcoat: 0.1,              // Додає легке покриття для блиску
    clearcoatRoughness: 0.9,     // Шорсткість покриття, щоб не було занадто блискучим
    reflectivity: 0.1,           // Легкий ефект відбивання для реалізму
    envMapIntensity: 0.3,         // Імітація впливу оточення
    color: '#A37B5C'
});


/* leather */
const textureLoaderLeatherBase = new THREE.TextureLoader();
const leatherBaseColor = textureLoaderLeatherBase.load('/assets/textures/leather_baseColor.jpg');
const leatherNormalMap = textureLoaderLeatherBase.load('/assets/textures/leather_normal.jpg');
const leatherORMMap = textureLoaderLeatherBase.load('/assets/textures/leather_occlusionRoughnessMetallic.jpg');
leatherBaseColor.wrapS = THREE.RepeatWrapping;
leatherBaseColor.wrapT = THREE.RepeatWrapping;
leatherBaseColor.repeat.set(1, -1);  // Налаштування повторення текстури
leatherNormalMap.wrapS = THREE.RepeatWrapping;
leatherNormalMap.wrapT = THREE.RepeatWrapping;
leatherNormalMap.repeat.set(1, -1);
leatherORMMap.wrapS = THREE.RepeatWrapping;
leatherORMMap.wrapT = THREE.RepeatWrapping;
leatherORMMap.repeat.set(1, -1);  // Налаштування повторення текстури

export const leatherMaterial = new THREE.MeshPhysicalMaterial({
    map: leatherBaseColor,         // Основна текстура кольору
    normalMap: leatherNormalMap,   // Карта нормалей для дрібних деталей
    aoMap: leatherORMMap,          // Карта навколишнього затемнення (Ambient Occlusion)
    roughnessMap: leatherORMMap,   // Карта шорсткості
    metalnessMap: leatherORMMap,   // Карта металевості
    roughness: 0.8,              // Високий рівень шорсткості для деніму
    metalness: 0.3,              // Низька металевість, оскільки денім - це тканина
    clearcoat: 0.4,              // Додає легке покриття для блиску
    clearcoatRoughness: 0.7,     // Шорсткість покриття, щоб не було занадто блискучим
    reflectivity: 0.2,           // Легкий ефект відбивання для реалізму
    envMapIntensity: 0.9,         // Імітація впливу оточення
    color: '#8B5727'
});

/* hardware */
const textureSivlerHardware = new THREE.TextureLoader();
const silverBaseColor = textureSivlerHardware.load('/assets/textures/strap_baseColor.jpg');
const silverNormalMap = textureSivlerHardware.load('/assets/textures/strap_normal.jpg');
const silverORMMap = textureSivlerHardware.load('/assets/textures/strap_occlusionRoughnessMetallic.jpg');
silverBaseColor.wrapS = THREE.RepeatWrapping;
silverBaseColor.wrapT = THREE.RepeatWrapping;
silverBaseColor.repeat.set(1, -1);  // Налаштування повторення текстури
silverNormalMap.wrapS = THREE.RepeatWrapping;
silverNormalMap.wrapT = THREE.RepeatWrapping;
silverNormalMap.repeat.set(1, -1);
silverORMMap.wrapS = THREE.RepeatWrapping;
silverORMMap.wrapT = THREE.RepeatWrapping;
silverORMMap.repeat.set(1, -1);  // Налаштування повторення текстури

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
    color: '#E7B95C'
});
