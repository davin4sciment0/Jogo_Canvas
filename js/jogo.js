let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let PX = 0;
let PY = 0;
let velocidade = 3;

function personagem (){
    let soldado = new Image();
    soldado.src = "img/Soldado.png";

    soldado.onload=()=>{
    ctx.drawImage(soldado, PX,PY, 80, 80);
    }
    ctx.clearRect(0,0,1000,500);
}

window.addEventListener('keydown',(event)=>{
    personagem();
    if(event.key === 's' || event.key === 'S'){
        PY += velocidade;
    }
    else if (event.key === 'a' || event.key === 'A'){
        PX -= velocidade;
    }
    else if (event.key === 'w' || event.key === 'W'){
        PY -= velocidade;
    }
    else if (event.key === 'd' || event.key === 'D'){
        PX += velocidade;
    }
})
personagem();


