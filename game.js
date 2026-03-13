import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,6,12);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.6));


// chão

let ground = new THREE.Mesh(
new THREE.PlaneGeometry(1000,1000),
new THREE.MeshStandardMaterial({color:0x2f4f4f})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);


// ruas

for(let i=-200;i<=200;i+=40){

let road = new THREE.Mesh(

new THREE.PlaneGeometry(20,1000),

new THREE.MeshStandardMaterial({color:0x222222})

);

road.rotation.x=-Math.PI/2;
road.position.x=i;

scene.add(road);

}


// prédios

for(let i=0;i<120;i++){

let building = new THREE.Mesh(

new THREE.BoxGeometry(10,Math.random()*40+10,10),

new THREE.MeshStandardMaterial({color:0x888888})

);

building.position.x=(Math.random()-0.5)*500;
building.position.z=(Math.random()-0.5)*500;
building.position.y=building.geometry.parameters.height/2;

scene.add(building);

}


// carro

let car = new THREE.Mesh(

new THREE.BoxGeometry(2,1,4),

new THREE.MeshStandardMaterial({color:0xff0000})

);

car.position.y=0.5;

scene.add(car);


// física simples

let speed = 0;
let maxSpeed = 1.5;
let acceleration = 0.03;
let friction = 0.02;

let keys = {};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);


function animate(){

requestAnimationFrame(animate);


// acelerar

if(keys["ArrowUp"]){
speed += acceleration;
}

// frear

if(keys["ArrowDown"]){
speed -= acceleration;
}

// limite velocidade

speed = Math.max(-maxSpeed,Math.min(maxSpeed,speed));


// atrito

if(speed>0) speed -= friction;
if(speed<0) speed += friction;


// virar

if(keys["ArrowLeft"]){
car.rotation.y += 0.04;
}

if(keys["ArrowRight"]){
car.rotation.y -= 0.04;
}


// movimento

car.translateZ(-speed);


// câmera seguindo

camera.position.x = car.position.x;
camera.position.z = car.position.z + 12;
camera.lookAt(car.position);


// render

renderer.render(scene,camera);

}

animate();
