import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js'
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.set(0,5,10)

const renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff,1)

light.position.set(10,20,10)

scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff,0.5))

// chão

const ground = new THREE.Mesh(

new THREE.PlaneGeometry(500,500),

new THREE.MeshStandardMaterial({color:0x444444})

)

ground.rotation.x = -Math.PI/2

scene.add(ground)


// ruas

for(let i=-200;i<200;i+=40){

const road = new THREE.Mesh(

new THREE.PlaneGeometry(20,500),

new THREE.MeshStandardMaterial({color:0x222222})

)

road.rotation.x=-Math.PI/2

road.position.x=i

scene.add(road)

}


// prédios

for(let i=0;i<80;i++){

const building = new THREE.Mesh(

new THREE.BoxGeometry(10,Math.random()*40+10,10),

new THREE.MeshStandardMaterial({color:0x888888})

)

building.position.x=(Math.random()-0.5)*300
building.position.z=(Math.random()-0.5)*300
building.position.y=building.geometry.parameters.height/2

scene.add(building)

}


// carro

let car

const loader = new GLTFLoader()

loader.load(

'fusca.glb',

function(gltf){

car = gltf.scene

car.scale.set(2,2,2)

scene.add(car)

}

)


// controles

const keys={}

document.addEventListener('keydown',e=>keys[e.key]=true)

document.addEventListener('keyup',e=>keys[e.key]=false)



function animate(){

requestAnimationFrame(animate)

if(car){

if(keys["ArrowUp"]){

car.translateZ(-0.4)

}

if(keys["ArrowDown"]){

car.translateZ(0.4)

}

if(keys["ArrowLeft"]){

car.rotation.y+=0.03

}

if(keys["ArrowRight"]){

car.rotation.y-=0.03

}

camera.position.x=car.position.x
camera.position.z=car.position.z+10
camera.lookAt(car.position)

}

renderer.render(scene,camera)

}

animate()
