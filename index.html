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

scene.add(new THREE.AmbientLight(0xffffff,0.7));

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);


// chão

const ground = new THREE.Mesh(
new THREE.PlaneGeometry(2000,2000),
new THREE.MeshStandardMaterial({color:0x3c8d2f})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);


// estrada

const road = new THREE.Mesh(
new THREE.PlaneGeometry(20,4000),
new THREE.MeshStandardMaterial({color:0x222222})
);

road.rotation.x = -Math.PI/2;
scene.add(road);


// linhas da estrada

let roadLines=[];

for(let i=-200;i<200;i+=20){

const line = new THREE.Mesh(

new THREE.PlaneGeometry(1,10),

new THREE.MeshStandardMaterial({color:0xffffff})

);

line.rotation.x=-Math.PI/2;
line.position.z=i;

scene.add(line);

roadLines.push(line);

}


// carro

const car = new THREE.Group();

const body = new THREE.Mesh(
new THREE.BoxGeometry(2,0.8,4),
new THREE.MeshStandardMaterial({color:0xff0000})
);

const roof = new THREE.Mesh(
new THREE.BoxGeometry(1.5,0.7,2),
new THREE.MeshStandardMaterial({color:0xff0000})
);

roof.position.y=0.7;


// rodas

function createWheel(x,z){

const wheel = new THREE.Mesh(

new THREE.CylinderGeometry(0.4,0.4,0.5,16),

new THREE.MeshStandardMaterial({color:0x111111})

);

wheel.rotation.z=Math.PI/2;

wheel.position.set(x,0,z);

return wheel;

}

car.add(body);
car.add(roof);

car.add(createWheel(-1,-1.5));
car.add(createWheel(1,-1.5));
car.add(createWheel(-1,1.5));
car.add(createWheel(1,1.5));

car.position.y=0.6;

scene.add(car);


// controles

let keys={};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);


// física

let speed=0;
const accel=0.05;
const maxSpeed=2;
const friction=0.02;


// obstáculos

let obstacles=[];

function spawnObstacle(){

const obstacle=new THREE.Mesh(

new THREE.BoxGeometry(2,2,2),

new THREE.MeshStandardMaterial({color:0xffaa00})

);

obstacle.position.x=(Math.random()-0.5)*12;
obstacle.position.z=car.position.z-200;
obstacle.position.y=1;

scene.add(obstacle);

obstacles.push(obstacle);

}

setInterval(spawnObstacle,2000);


// pontuação

let score=0;


// animação

function animate(){

requestAnimationFrame(animate);


// acelerar

if(keys["ArrowUp"]) speed+=accel;

if(keys["ArrowDown"]) speed-=accel;

speed=Math.max(-maxSpeed,Math.min(maxSpeed,speed));


// atrito

if(speed>0) speed-=friction;
if(speed<0) speed+=friction;


// virar

if(keys["ArrowLeft"]) car.position.x-=0.3;
if(keys["ArrowRight"]) car.position.x+=0.3;


// mover carro

car.position.z-=speed;


// mover linhas da estrada

roadLines.forEach(line=>{

line.position.z+=speed;

if(line.position.z>car.position.z+20){

line.position.z-=400;

}

});


// mover obstáculos

obstacles.forEach(o=>{

o.position.z+=speed;


// colisão

const dx=o.position.x-car.position.x;
const dz=o.position.z-car.position.z;

if(Math.sqrt(dx*dx+dz*dz)<2){

alert("Game Over! Pontuação: "+Math.floor(score));
location.reload();

}

});


// câmera

camera.position.z=car.position.z+15;
camera.position.x=car.position.x;

camera.lookAt(car.position);


// pontuação

score+=speed;


// HUD

const hud=document.getElementById("speed");

if(hud){

hud.innerText="Pontuação: "+Math.floor(score);

}


renderer.render(scene,camera);

}

animate();
