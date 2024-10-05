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

// const pointLight = new THREE.PointLight(0xfffffff, 100, 1000); // Luz blanca, intensidad 1.5, alcance 100
// scene.add(pointLight);

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('../assets/earth_texture.jpg');

// texture.wrapS = THREE.ClampToEdgeWrapping;
// texture.wrapT = THREE.ClampToEdgeWrapping;

// console.log(texture);

const sun = new Star('Sun', 1, 0xffff00, scene, "jpeg");
// sun.add(pointLight);
const planetsData = [
    { label: 'Mercury', color: 0xaaaaaa, radius: 0.1, orbitParams: { sma: 0.387098, eccentricity: 0.20563, period: 88.0, inclination: 3.38, omega: 48.331, raan: 281.01 } },
    { label: 'Venus', color: 0xffd700, radius: 0.2, orbitParams: { sma: 0.723332, eccentricity: 0.006772, period: 224.701, inclination: 3.86, omega: 76.68, raan: 272.76 } },
    { label: 'Earth', color: 0xffffff, radius: 0.2, orbitParams: { sma: 1.0, eccentricity: 0.016708, period: 365.25638, inclination: 7.155, omega: -11.26064, raan: 23.439281 } },
];

const ambientLight = new THREE.AmbientLight(0xffffff, 0.69); // Luz ambiental suave (intensidad 0.5)
scene.add(ambientLight);

// pointLight.position.set(sun.bodyMesh.position.x, sun.bodyMesh.position.y, sun.bodyMesh.position.z);

const planets = planetsData.map(data => {
    return new Planet(data.orbitParams, data.label, data.radius, data.color, scene);
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