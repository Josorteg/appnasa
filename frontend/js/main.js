import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Planet } from './Object3D/Planet.js';
import { Star } from './Object3D/Star.js';
import { update } from 'three/examples/jsm/libs/tween.module.js';
import { color } from 'three/webgpu';

const	CAMERA_FOV_VERTICAL = 75;
const	CAMERA_ASPECT_RATIO = window.innerWidth / window.innerHeight;
const	CAMERA_NEAR_DIST = 0.1;
const	CAMERA_FAR_DIST = 100000;
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

function	get_system_object_by_id({system_objects, id})
{
	const	all_objects_array = [...system_objects.planets] + [...system_objects.stars];

	for (let object of all_objects_array)
		if (object.id == id)
			return (object);
	return (null);
}

// Object hooks

// Constants
const	ObjectHooks = {
	HOVER: 1,
	FOCUS: 1 << 1,
	CLICK: 1 << 2
};

// Variables
const	raycaster = new THREE.Raycaster();
const	pointer = new THREE.Vector2();
let		is_clicked = false;

function	__activate_object_hover()
{
	const	update_pointer_position = (event) =>
	{
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		return ;
	}
	window.addEventListener("pointermove", update_pointer_position);
	return ;
}

function	__activate_object_click()
{
	function	update_pointer_position_click(event)
	{
		is_clicked = true;
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		console.log("click");
		return ;	
	}
	console.log("click activated");
	window.addEventListener("click", update_pointer_position_click);
	return ;
}

function	activate_object_hook(event)
{
	const	hooks = {};

	hooks[ObjectHooks.HOVER] = __activate_object_hover;
	hooks[ObjectHooks.FOCUS] = __activate_object_hover;
	hooks[ObjectHooks.CLICK] = __activate_object_click;
	for (let hook of Object.keys(hooks))
	{
		if (event | hook == hook)
			hooks[hook]();
	}
	return ;
}

function	get_mouse_hover_object({scene, camera})
{
	raycaster.setFromCamera( pointer, camera );

	const	intersects = raycaster.intersectObjects( scene.children );

	if (intersects.length == 0)
		return (null);
	return (intersects[0]);
}

function	manage_hook_hover({system_objects, scene, camera})
{
	const	object_hover = get_mouse_hover_object({scene, camera});

	// console.log(object_hover);
	if (object_hover)
		object_hover.object.material.color.set(0xFFFFFF);
	return ;
}

function	manage_hook_click({system_objects, scene, camera})
{
	if (!is_clicked)
		return ;
	
	const	object_hover = get_mouse_hover_object({scene, camera});
	
	is_clicked = false;
	// console.log(object_hover);
	if (!object_hover)
		return ;
	object_hover.object.material.color.set(0xFF0000);
	// console.log(object_hover.object.material.id);
	// const	object = get_system_object_by_id({system_objects, id: object_hover.object.material.id});

	// if (object)
	// 	object.bodyMesh.material.color.set(0xFF0000);	
	return ;
}

function	manage_hooks({system_objects, scene, camera})
{
	// manage_hook_hover({system_objects, scene, camera});
	// manage_hook_click({system_objects, scene, camera});
	return ;
}

// animation

function	get_animate_function({system_objects, camera, scene, renderer, controls})
{
	const	sun = system_objects.stars[0];
	const	planets = system_objects.planets;

	activate_object_hook(ObjectHooks.HOVER | ObjectHooks.CLICK);

	const	animate = time => {
		manage_hooks({system_objects, scene, camera});

		// Move and rotate planets
		planets.forEach(planet => {
			planet.updatePosition(time * 0.001);
			planet.rotate(0.01);
		});

		// rotate sun
		sun.rotate(0.001);

		// update controls
		controls.update();

		// render scene
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

	// console.log(controls);

	star_main({scene, camera});

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
		console.log(planet.bodyMesh);
	});
	console.log(system_objects.stars[0].bodyMesh);

	run_system(scene, system_objects);
	return ;
}

main();

function	get_random_number_not_zero()
{
	let	number;

	number = 0;
	while (number == 0)
		number = Math.random() - 0.5;
	return (number);
}

function	get_random_particel_pos(particleCount)
{
	const	arr = new Float32Array(particleCount * 3);

	for (let i = 0; i < particleCount; i++)
	{
		arr[i] = (Math.random() - 0.5) * 1000;
	}
	return arr;
}
  
function	star_main({scene, camera})
{
	// Geometry
	const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];
  
	geometrys[0].setAttribute("position", new THREE.BufferAttribute(get_random_particel_pos(350, camera.position.z), 3));
	geometrys[1].setAttribute("position", new THREE.BufferAttribute(get_random_particel_pos(1500, camera.position.z), 3));
  
	const loader = new THREE.TextureLoader();
  
	// material
	const materials = [
	  new THREE.PointsMaterial({
		size: 1,
		map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"),
		transparent: true
		// color: "#ff0000"
	  }),
	  new THREE.PointsMaterial({
		size: 1.2,
		map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"),
		transparent: true
		// color: "#0000ff"
	  })
	];
  
	const starsT1 = new THREE.Points(geometrys[0], materials[0]);
	const starsT2 = new THREE.Points(geometrys[1], materials[1]);
	scene.add(starsT1);
	scene.add(starsT2);
  }