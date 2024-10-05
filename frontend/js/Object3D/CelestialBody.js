import * as THREE from 'three';
import { dispersion, emissive, texture } from 'three/webgpu';

const TEXTURES_PATH = (strings, object_name, texture_format) => `../../assets/${object_name}_texture.${texture_format}`

const textureLoader = new THREE.TextureLoader();

export function load_texture_map(object_name, texture_format)
{
    console.log(`hi ${object_name}`);
    const texture = textureLoader.load(
        TEXTURES_PATH`${object_name}${texture_format}`,
        function (){}, function (){},
        function (){console.log(`${object_name} ${texture_format}: Failure`); return null});

    if (!texture)
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
        const material = new THREE.MeshStandardMaterial({ color, map: mapTexture });
        this.bodyMesh = new THREE.Mesh(geometry, material);

        this.object = new THREE.Object3D();
        this.object.add(this.bodyMesh);
        scene.add(this.object);
    }

    updatePosition(t) {
    }

    rotate(speed) {
        this.bodyMesh.rotation.y += speed;
    }
}
