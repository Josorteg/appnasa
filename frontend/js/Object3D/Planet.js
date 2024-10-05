import * as THREE from 'three';
import { CelestialBody } from "./CelestialBody";

export class Planet extends CelestialBody {
	constructor(orbitParams, label, radius, color, scene, texture_format = "jpg"){
		super(label, radius, color, scene, texture_format);

		this.orbitParams = orbitParams;
		this.bodyMesh.rotateX(orbitParams.inclination * (Math.PI / 180));
		this.updatePosition(0);
	}

	draw_orbit(scene)
	{
		const { sma, eccentricity } = this.orbitParams;
		let x, z, r;

		for (let angle = 0; angle < 10* Math.PI; angle += ((2 * Math.PI) / 100))
		{
			r = (sma * 5) * (1 - eccentricity ** 2) / (1 + eccentricity * Math.cos(angle));
			x = r * Math.cos(angle);
			z = r * Math.sin(angle);

			const geometry = new THREE.SphereGeometry(0.01, 32, 32);
			// const material = new THREE.MeshBasicMaterial({ color, map: texture });
			const material = new THREE.MeshStandardMaterial({ color: this.bodyMesh.material.color });
			// const material = new THREE.MeshPhysicalMaterial({ color });
			const bodyMesh = new THREE.Mesh(geometry, material);
			bodyMesh.position.x = x;
			bodyMesh.position.z = z;
	
			const object = new THREE.Object3D();
			object.add(bodyMesh);
			scene.add(object);		
		}

	}

	updatePosition(t){
		const { sma, eccentricity, period } = this.orbitParams;

        const angularSpeed = (2 * Math.PI) / period;

        const angle = t * angularSpeed;

        const r = (sma * 5) * (1 - eccentricity ** 2) / (1 + eccentricity * Math.cos(angle));

        this.bodyMesh.position.x = r * Math.cos(angle);
        this.bodyMesh.position.z = r * Math.sin(angle);
	}
}