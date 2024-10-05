import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Planet } from './Object3D/Planet.js';
import { Star } from './Object3D/Star.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* Control de camara */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

console.log(controls);

const sun = new Star('Sun', 1, 0xffff00, scene, "jpeg");

const planetsData = [
    { label: 'Mercury', color: 0xaaaaaa, radius: 0.1, texture_format: "jpg", orbitParams: { sma: 0.387098, eccentricity: 0.20563, period: 88.0, inclination: 3.38, omega: 48.331, raan: 281.01 } },
    { label: 'Venus', color: 0xffd700, radius: 0.2, texture_format: "jpg", orbitParams: { sma: 0.723332, eccentricity: 0.006772, period: 224.701, inclination: 3.86, omega: 76.68, raan: 272.76 } },
    { label: 'Earth', color: 0xffffff, radius: 0.2, texture_format: "jpg",orbitParams: { sma: 1.0, eccentricity: 0.016708, period: 365.25638, inclination: 0.00005, omega: -11.26064, raan: -23.439281 } },
    { label: 'Mars', color: 0xffffff, radius: 0.2, texture_format: "jpg", orbitParams: { sma: 1.523679, eccentricity: 0.0934, period: 686.971, inclination: 1.85061, omega: 49.558, raan: 317.68143 } },
    { label: 'Jupiter', color: 0xffffff, radius: 0.5, texture_format: "jpg", orbitParams: { sma: 2.2044, eccentricity: 0.0489, period: 4332.59, inclination: 1.304, omega: 100.464, raan: 14.75385 } },
    { label: 'Saturn', color: 0xffffff, radius: 0.48, texture_format: "jpg", orbitParams: { sma: 3.5826, eccentricity: 0.0565, period: 10759.22, inclination: 2.485, omega: 113.665, raan: 92.43194 } },
    { label: 'uranus', color: 0xffffff, radius: 0.35, texture_format: "jpg", orbitParams: { sma: 4.1023, eccentricity: 0.0465, period: 90759.22, inclination: 2.485, omega: 113.665, raan: 92.43194 } },
    { label: 'neptuno', color: 0xffffff, radius: 0.35, texture_format: "jpg", orbitParams: { sma: 4.5023, eccentricity: 0.0465, period: 90759.22, inclination: 2.485, omega: 113.665, raan: 92.43194 } }

];

/* Luz ambiente   suave (intensidad 0.5) */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.80);
scene.add(ambientLight);


const planets = planetsData.map(data => {
    return new Planet(data.orbitParams, data.label, data.radius, data.color, scene, data.texture_format);
});

planets.forEach(planet => {
    planet.draw_orbit(scene);
});

function animate(time) {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        planet.updatePosition(time * 0.001);
        planet.rotate(0.01);
    });

    sun.rotate(0.001);
    controls.update();
    renderer.render(scene, camera);
}

animate(0);