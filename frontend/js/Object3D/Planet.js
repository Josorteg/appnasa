import * as THREE from 'three';
import { CelestialBody } from "./CelestialBody";

export class Planet extends CelestialBody {
	constructor(orbitParams, label, radius, color, scene, texture_format = "jpg"){
		super(label, radius, color, scene, texture_format);

		this.orbitParams = orbitParams;

		this.updatePosition(0);
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