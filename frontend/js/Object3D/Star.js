import * as THREE from 'three';
import { CelestialBody, load_texture_map } from "./CelestialBody";

export class Star extends CelestialBody {
    constructor(label, radius, color, scene, texture_format = "jpg") {
        const pointLight = new THREE.PointLight(0xfffffff, 500, 10000);

        super(label, radius, color, scene, texture_format);
        this.bodyMesh.material = new THREE.MeshStandardMaterial({
            color: color, // Color del Sol
            emissiveMap: load_texture_map(label.toLowerCase(), texture_format),
            emissive: color, // Color de emisión
            emissiveIntensity: 2, // Aumentar la intensidad de emisión
        });
        this.bodyMesh.add(pointLight);
    }

    rotate(speed) {
        super.rotate(speed);
    }
}