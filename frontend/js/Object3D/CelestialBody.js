import * as THREE from 'three';
import { dispersion, emissive, texture } from 'three/webgpu';

const TEXTURES_PATH = (strings, object_name, texture_format) => `../../assets/${object_name}_texture.${texture_format}`

const textureLoader = new THREE.TextureLoader();

export function load_texture_map(object_name, texture_format)
{
    // console.log(`hi ${object_name}`);
    const texture = textureLoader.load(
        TEXTURES_PATH`${object_name}${texture_format}`,
        undefined, undefined,
        () => {console.log(`${object_name} ${texture_format}: Failure`); return null});

    if (!texture)
        return (null);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

export class CelestialBody {
    constructor(label, radius, color, scene, texture_format = "jpg") {
        this.name = label;
        this.radius = radius;
        this.color = color;
        this.bodyMesh = undefined;
        this.object = undefined;
        this.id = undefined;

        this.createObjectMesh(texture_format);
        this.id = this.bodyMesh.material.id;
        scene.add(this.object);
    }

    createObjectMesh(texture_format)
    {
        let mapTexture;

        mapTexture = load_texture_map(this.name.toLowerCase(), texture_format);

        // console.log(`${label}: `, mapTexture);
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: this.color, map: mapTexture });
        this.bodyMesh = new THREE.Mesh(geometry, material);

        this.object = new THREE.Object3D();
        this.object.add(this.bodyMesh);
        return ;
    }

    updatePosition(t) {
    }

    rotate(speed) {
        this.bodyMesh.rotation.y += speed;
    }
}
