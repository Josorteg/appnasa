import * as THREE from 'three';
import { CelestialBody, load_texture_map } from "./CelestialBody";

export class Star extends CelestialBody {
    constructor(label, radius, color, scene, texture_format = "jpg") {
        const pointLight = new THREE.PointLight(0xfffffff, 100, 10000);

        super(label, radius, color, scene, texture_format);
        // this.bodyMesh.material.sheenColor = color;
        // this.bodyMesh.material.sheen = 1;
        // this.bodyMesh.material.emissiveIntensity = 1;
        // this.bodyMesh.reflectivity = 1;
        // this.bodyMesh.combine = 1;
        // this.bodyMesh.material.emissive = color;
        // this.bodyMesh.material.emissiveIntensity = 1000;
        // this.bodyMesh.material.metalness = 0.5;
        // this.bodyMesh.material.roughness = 0.5 ;
        this.bodyMesh.material = new THREE.MeshStandardMaterial({
            color: color, // Color del Sol
            emissiveMap: load_texture_map(label.toLowerCase(), texture_format),
            emissive: color, // Color de emisión
            emissiveIntensity: 2, // Aumentar la intensidad de emisión
            // metalness: 0.5, // Ajusta el metalness si es necesario
            // roughness: 0.5 // Ajusta el roughness si es necesario
        });
        this.bodyMesh.add(pointLight);
        // const glowMaterial = new THREE.MeshLambertMaterial({
        //     color: color
            // emissive: color,
            // emissiveIntensity: 0.7
            // reflectivity: 1
        // });

        // this.bodyMesh.material = glowMaterial;
    }

    rotate(speed) {
        super.rotate(speed);
    }
}