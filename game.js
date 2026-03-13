import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,5,10);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.6));

let ground = new THREE.Mesh(
new THREE.PlaneGeometry(200,200),
new THREE.MeshStandardMaterial({color:0x444444})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);

let car = new THREE.Mesh(
new THREE.BoxGeometry(2,1,4),
new THREE.MeshStandardMaterial({color:0xff0000})
);

car.position.y=0.5;

scene.add(car);

let keys={};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);

function animate(){

requestAnimationFrame(animate);

if(keys["ArrowUp"]){
car.translateZ(-0.2);
}

if(keys["ArrowDown"]){
car.translateZ(0.2);
}

if(keys["ArrowLeft"]){
car.rotation.y+=0.03;
}

if(keys["ArrowRight"]){
car.rotation.y-=0.03;
}

camera.position.x=car.position.x;
camera.position.z=car.position.z+10;

camera.lookAt(car.position);

renderer.render(scene,camera);

}

animate();
