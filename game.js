let jogador;
let pontuacao = 0;
let velocidade = 5;
let jogoRodando = false;

function iniciarJogo(){

document.getElementById("telaInicial").style.display="none";

const gameArea = document.getElementById("gameArea");

jogador = document.createElement("div");
jogador.classList.add("carro");

gameArea.appendChild(jogador);

jogoRodando = true;

criarInimigo();

requestAnimationFrame(loopJogo);

}

function criarInimigo(){

const gameArea = document.getElementById("gameArea");

let carro = document.createElement("div");

carro.classList.add("inimigo");

carro.style.left = Math.floor(Math.random()*350) + "px";

gameArea.appendChild(carro);

}

function loopJogo(){

if(!jogoRodando) return;

let inimigos = document.querySelectorAll(".inimigo");

inimigos.forEach(function(inimigo){

let pos = inimigo.offsetTop;

inimigo.style.top = pos + velocidade + "px";

if(pos > 650){

inimigo.remove();

pontuacao++;

document.getElementById("pontuacao").innerText =
"PONTOS: " + pontuacao;

criarInimigo();

}

if(colisao(jogador,inimigo)){

fimDeJogo();

}

});

requestAnimationFrame(loopJogo);

}

function colisao(a,b){

let aRect = a.getBoundingClientRect();
let bRect = b.getBoundingClientRect();

return !(
aRect.bottom < bRect.top ||
aRect.top > bRect.bottom ||
aRect.right < bRect.left ||
aRect.left > bRect.right
);

}

function fimDeJogo(){

jogoRodando=false;

alert("Fim de jogo! Pontos: " + pontuacao);

location.reload();

}

document.addEventListener("keydown", mover);

function mover(e){

if(!jogoRodando) return;

let esquerda = jogador.offsetLeft;

if(e.key === "ArrowLeft" && esquerda > 0){

jogador.style.left = esquerda - 20 + "px";

}

if(e.key === "ArrowRight" && esquerda < 340){

jogador.style.left = esquerda + 20 + "px";

}

}
