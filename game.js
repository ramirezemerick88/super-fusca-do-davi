import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,5,10);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.7));


// chão

const ground = new THREE.Mesh(
new THREE.PlaneGeometry(1000,1000),
new THREE.MeshStandardMaterial({color:0x3a7a3a})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);


// ruas

for(let i=-200;i<=200;i+=40){

const road = new THREE.Mesh(

new THREE.PlaneGeometry(20,1000),

new THREE.MeshStandardMaterial({color:0x222222})

);

road.rotation.x = -Math.PI/2;
road.position.x = i;

scene.add(road);

}


// carro (fusca)

let car;

const loader = new GLTFLoader();

loader.load(

"fusca.glb",

function(gltf){

car = gltf.scene;

car.scale.set(2,2,2);
car.position.y = 0.3;

scene.add(car);

}

);


// física

let speed = 0;
const maxSpeed = 2;
const acceleration = 0.05;
const friction = 0.02;

const keys = {};

document.addEventListener("keydown",(e)=>{
keys[e.key]=true;
});

document.addEventListener("keyup",(e)=>{
keys[e.key]=false;
});


function animate(){

requestAnimationFrame(animate);

if(car){

if(keys["ArrowUp"]){
speed += acceleration;
}

if(keys["ArrowDown"]){
speed -= acceleration;
}

speed = Math.max(-maxSpeed,Math.min(maxSpeed,speed));

if(speed>0) speed -= friction;
if(speed<0) speed += friction;

if(keys["ArrowLeft"]){
car.rotation.y += 0.04;
}

if(keys["ArrowRight"]){
car.rotation.y -= 0.04;
}

car.translateZ(-speed);


// câmera seguindo

camera.position.x = car.position.x;
camera.position.z = car.position.z + 10;

camera.lookAt(car.position);


// velocímetro

const hud = document.getElementById("speed");

if(hud){

hud.innerText =
"Velocidade: " + Math.abs(speed*100).toFixed(0);

}

}

renderer.render(scene,camera);

}

animate();
