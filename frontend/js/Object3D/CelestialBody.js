import * as THREE from 'three';
import { dispersion, emissive, texture } from 'three/webgpu';

const TEXTURES_PATH = (strings, object_name, texture_format) => `../../assets/${object_name}_texture.${texture_format}`

const textureLoader = new THREE.TextureLoader();

export function load_texture_map(object_name, texture_format)
{
    let fail = false;
    const texture = textureLoader.load(
        TEXTURES_PATH`${object_name}${texture_format}`,
        function (){}, function (){},
        function (){fail = true; console.log(`${object_name} ${texture_format}: Failure`); return null});

    if (fail == true)
        return (null);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

export class CelestialBody {
    constructor(label, radius, color, scene, texture_format = "jpg") {
        let mapTexture;

        this.label = label;

        
        mapTexture = load_texture_map(label.toLowerCase(), texture_format);

        console.log(`${label}: `, mapTexture);
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        // const material = new THREE.MeshBasicMaterial({ color, map: texture });
        const material = new THREE.MeshStandardMaterial({ color, map: mapTexture });
        // const material = new THREE.MeshPhysicalMaterial({ color });
        this.bodyMesh = new THREE.Mesh(geometry, material);

        this.object = new THREE.Object3D();
        this.object.add(this.bodyMesh);
        scene.add(this.object);
        // scene.add(this.bodyMesh);
    }

    updatePosition(t) {
    }

    rotate(speed) {
        this.bodyMesh.rotation.y += speed;
    }
}
