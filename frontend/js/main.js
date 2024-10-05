import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Planet } from './Object3D/Planet.js';
import { Star } from './Object3D/Star.js';

const	CAMERA_FOV_VERTICAL = 75;
const	CAMERA_ASPECT_RATIO = window.innerWidth / window.innerHeight;
const	CAMERA_NEAR_DIST = 0.1;
const	CAMERA_FAR_DIST = 1000;
const	CAMERA_INIT_POSITION = 5;

function	setup_controls(camera, canvas)
{
	const	controls = new OrbitControls(camera, canvas);

	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	return controls;
}

function	get_base_system_objects(scene)
{
	let		objects = {planets: [], stars: []};
	const	sun = new Star('Sun', 1, 0xffff00, scene, "jpeg");
	const	planetsData = [
		{ label: 'Mercury', color: 0xaaaaaa, radius: 0.1, texture_format: "jpg", orbitParams: { sma: 0.387098, eccentricity: 0.20563, period: 88.0, inclination: 3.38, omega: 48.331, raan: 281.01 } },
		{ label: 'Venus', color: 0xffd700, radius: 0.2, texture_format: "jpg", orbitParams: { sma: 0.723332, eccentricity: 0.006772, period: 224.701, inclination: 3.86, omega: 76.68, raan: 272.76 } },
		{ label: 'Earth', color: 0xffffff, radius: 0.2, texture_format: "jpg",orbitParams: { sma: 1.0, eccentricity: 0.016708, period: 365.25638, inclination: 0.00005, omega: -11.26064, raan: -23.439281 } },
		{ label: 'Mars', color: 0xffffff, radius: 0.2, texture_format: "jpg", orbitParams: { sma: 1.523679, eccentricity: 0.0934, period: 686.971, inclination: 1.85061, omega: 49.558, raan: 317.68143 } },
		{ label: 'Jupiter', color: 0xffffff, radius: 0.5, texture_format: "jpg", orbitParams: { sma: 2.2044, eccentricity: 0.0489, period: 4332.59, inclination: 1.304, omega: 100.464, raan: 14.75385 } },
		{ label: 'Saturn', color: 0xffffff, radius: 0.48, texture_format: "jpg", orbitParams: { sma: 3.5826, eccentricity: 0.0565, period: 10759.22, inclination: 2.485, omega: 113.665, raan: 92.43194 } },
		{ label: 'Uranus', color: 0xffffff, radius: 0.35, texture_format: "jpg", orbitParams: { sma: 4.1023, eccentricity: 0.0465, period: 90759.22, inclination: 2.485, omega: 113.665, raan: 92.43194 } },
		{ label: 'Neptune', color: 0xffffff, radius: 0.35, texture_format: "jpg", orbitParams: { sma: 4.5023, eccentricity: 0.0465, period: 90759.22, inclination: 2.485, omega: 113.665, raan: 92.43194 } }
	
	];
	const planets = planetsData.map(data => {
		return new Planet(data.orbitParams, data.label, data.radius, data.color, scene);
	});
 
	objects.stars.push(sun);
	objects.planets.push(...planets);
	return (objects);
}

function	get_animate_function({system_objects, camera, scene, renderer, controls})
{
	const	sun = system_objects.stars[0];
	const	planets = system_objects.planets;

	const	animate = time => {
		// Move and rotate planets
		planets.forEach(planet => {
			planet.updatePosition(time * 0.001);
			planet.rotate(0.01);
		});

		// rotate sun
		sun.rotate(0.001);

		// 
		controls.update();
		renderer.render(scene, camera);

		window.requestAnimationFrame(animate);
	};
	return (animate);
}

function	run_system(scene, system_objects)
{
	const	canvas = document.getElementById("board");

	const	camera = new THREE.PerspectiveCamera(CAMERA_FOV_VERTICAL, CAMERA_ASPECT_RATIO, CAMERA_NEAR_DIST, CAMERA_FAR_DIST);
	camera.position.z = CAMERA_INIT_POSITION;

	const	renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	renderer.setSize(window.innerWidth, window.innerHeight);

	/* Control de camara */
	const	controls = setup_controls(camera, canvas)

	console.log(controls);

	const	animate = get_animate_function({system_objects, camera, scene, renderer, controls});

	window.requestAnimationFrame(animate);
	return ;
}

function	main()
{
	const scene = new THREE.Scene();

	const system_objects = get_base_system_objects(scene);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.80);
	scene.add(ambientLight);

	system_objects.planets.forEach(planet => {
		planet.draw_orbit(scene);
	});

	run_system(scene, system_objects);
	return ;
}

main();