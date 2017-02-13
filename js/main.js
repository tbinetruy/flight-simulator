import * as THREE from 'three'
import { City, Cube, Building } from './City.js'

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
var cube = new THREE.Mesh(geometry, material)

const city = new City(1000)
scene.add(city.cityMesh)

const building = new Building()
scene.add(building.buildingMesh)
camera.lookAt(
	new THREE.Vector3(
		building.buildingMesh.position.x,
		building.buildingMesh.position.y,
		building.buildingMesh.position.z
	)
);
camera.position.z = 5

function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)
}

render()