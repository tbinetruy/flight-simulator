import * as THREE from 'three'

export class Cube {
	constructor(size) {
		this.geometry = new THREE.CubeGeometry(size, size, size)

		// movepivot point to bottom of the cube
		this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0))

		// remove bottom face
		this.geometry.faces.splice(3, 1)

		this.geometry.faceVertexUvs[0][2][0].set( 0, 0 )
		this.geometry.faceVertexUvs[0][2][1].set( 0, 0 )
		this.geometry.faceVertexUvs[0][2][2].set( 0, 0 )
		// this.geometry.faceVertexUvs[0][2][3].set( 0, 0 )
	}
}

export class Building {
	constructor() {
		const cube = new Cube(1)
		this.buildingMesh  = new THREE.Mesh(cube.geometry)

		const light = new THREE.Color(0xffffff)
		const shadow = new THREE.Color(0x303050)

		this.buildingMesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 10
		this.buildingMesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 10

		// put a random rotation
		this.buildingMesh.rotation.y = Math.random()*Math.PI*2

		// put a random scale
		this.buildingMesh.scale.x = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10
		this.buildingMesh.scale.y = (Math.random() * Math.random() * Math.random() * this.buildingMesh.scale.x) * 8 + 8
		this.buildingMesh.scale.z = this.buildingMesh.scale.x

		// establish the base color for the buildingMesh
		const value = 1 - Math.random() * Math.random()
		const baseColor = new THREE.Color().setRGB(value + Math.random() * 0.1, value, value + Math.random() * 0.1)

		// set topColor/bottom vertexColors as adjustement of baseColor
		const topColor = baseColor.clone().multiply(light)
		const  bottomColor = baseColor.clone().multiply(shadow)

		// set .vertexColors for each face
		const geometry = this.buildingMesh.geometry;
		for (var j = 0, jl = geometry.faces.length; j < jl; j ++) {
			if (j === 2) {
				// set face.vertexColors on root face
				geometry.faces[j].vertexColors = [baseColor, baseColor, baseColor, baseColor];
			} else {
				// set face.vertexColors on sides faces
				geometry.faces[j].vertexColors = [topColor, bottomColor, bottomColor, topColor];
			}
		}
	}
}

export class City {
	constructor(numBuilding) {
		this.cityGeometry = new THREE.Geometry()

		for(var i = 0; i < numBuilding; i++) {
			const building = new Building()
			// THREE.GeometryUtils.merge(this.cityGeometry, building.buildingMesh)
			THREE.GeometryUtils.merge(this.cityGeometry, building.buildingMesh)
		}

		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		this.cityMesh = new THREE.Mesh(this.cityGeometry, material)
	}
}