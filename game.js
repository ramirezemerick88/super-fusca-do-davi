import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,8,15);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


// luz

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.6));


// chão

const ground = new THREE.Mesh(
new THREE.PlaneGeometry(2000,2000),
new THREE.MeshStandardMaterial({color:0x3c8d2f})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);


// estrada

const road = new THREE.Mesh(
new THREE.PlaneGeometry(20,4000,1,1),
new THREE.MeshStandardMaterial({color:0x222222})
);

road.rotation.x = -Math.PI/2;
scene.add(road);


// linhas da estrada

for(let i=-2000;i<2000;i+=40){

const line = new THREE.Mesh(

new THREE.PlaneGeometry(1,10),

new THREE.MeshStandardMaterial({color:0xffffff})

);

line.rotation.x = -Math.PI/2;
line.position.z = i;

scene.add(line);

}


// carro (modelo simples)

const carBody = new THREE.Mesh(
new THREE.BoxGeometry(2,0.8,4),
new THREE.MeshStandardMaterial({color:0xff0000})
);

const carTop = new THREE.Mesh(
new THREE.BoxGeometry(1.5,0.7,2),
new THREE.MeshStandardMaterial({color:0xff0000})
);

carTop.position.y = 0.7;

const car = new THREE.Group();

car.add(carBody);
car.add(carTop);

car.position.y = 0.6;

scene.add(car);


// controles

let keys = {};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);


// física

let speed = 0;
const accel = 0.05;
const maxSpeed = 2;
const friction = 0.02;


// obstáculos

let obstacles = [];

function spawnObstacle(){

const obstacle = new THREE.Mesh(

new THREE.BoxGeometry(2,2,2),

new THREE.MeshStandardMaterial({color:0xffaa00})

);

obstacle.position.x = (Math.random()-0.5)*10;
obstacle.position.z = car.position.z - 200;
obstacle.position.y = 1;

scene.add(obstacle);

obstacles.push(obstacle);

}

setInterval(spawnObstacle,2000);


// animação

function animate(){

requestAnimationFrame(animate);


// acelerar

if(keys["ArrowUp"]) speed += accel;

if(keys["ArrowDown"]) speed -= accel;


// limitar velocidade

speed = Math.max(-maxSpeed,Math.min(maxSpeed,speed));


// atrito

if(speed>0) speed -= friction;
if(speed<0) speed += friction;


// virar

if(keys["ArrowLeft"]) car.position.x -= 0.3;

if(keys["ArrowRight"]) car.position.x += 0.3;


// mover carro

car.position.z -= speed;


// mover obstáculos

obstacles.forEach(o => {

o.position.z += speed;

});


// câmera seguir

camera.position.z = car.position.z + 15;
camera.position.x = car.position.x;

camera.lookAt(car.position);


// velocímetro

const hud = document.getElementById("speed");

if(hud){

hud.innerText = "Velocidade: " + Math.floor(Math.abs(speed*100));

}


renderer.render(scene,camera);

}

animate();
