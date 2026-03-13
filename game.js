import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,6,12);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff,0.8));

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);


// estrada

const road = new THREE.Mesh(

new THREE.PlaneGeometry(20,2000),

new THREE.MeshStandardMaterial({color:0x222222})

);

road.rotation.x = -Math.PI/2;

scene.add(road);


// linhas da estrada

for(let i=-1000;i<1000;i+=40){

const line = new THREE.Mesh(

new THREE.PlaneGeometry(1,10),

new THREE.MeshStandardMaterial({color:0xffffff})

);

line.rotation.x = -Math.PI/2;
line.position.z = i;

scene.add(line);

}


// carro simples (fusca provisório)

const car = new THREE.Mesh(

new THREE.BoxGeometry(2,1,4),

new THREE.MeshStandardMaterial({color:0xff0000})

);

car.position.y = 0.5;

scene.add(car);


// controles

let keys={};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);


// física

let speed=0;
let maxSpeed=2;
let acceleration=0.05;
let friction=0.02;


function animate(){

requestAnimationFrame(animate);

if(keys["ArrowUp"]) speed+=acceleration;

if(keys["ArrowDown"]) speed-=acceleration;

speed=Math.max(-maxSpeed,Math.min(maxSpeed,speed));

if(speed>0) speed-=friction;
if(speed<0) speed+=friction;


// virar

if(keys["ArrowLeft"]) car.position.x-=0.2;

if(keys["ArrowRight"]) car.position.x+=0.2;


// mover

car.position.z-=speed;


// câmera

camera.position.z=car.position.z+12;
camera.position.x=car.position.x;

camera.lookAt(car.position);


// velocímetro

const hud=document.getElementById("speed");

if(hud){

hud.innerText="Velocidade: "+Math.floor(Math.abs(speed*100));

}


renderer.render(scene,camera);

}

animate();
