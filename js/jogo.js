
//Atributos Canvas
let canvas;
let canvasWidth = 850;
let canvasHeight = 300;
let context;

// Atributos Soldado
let soldadoWidth = 80;
let soldadoHeight = 80;
let soldadoX = 50;
let soldadoY = canvasHeight -soldadoHeight;
let soldadoImg;

let soldado = {
    x : soldadoX,
    y : soldadoY,
    width : soldadoWidth,
    height : soldadoHeight
}

// Atributos Obstaculos
let obstaculosArray = [];

let obstaculo1Width = 50;
let obstaculo2Width = 80;
let obstaculo3Width = 120;

let obstaculoHeight = 90;
let obstaculoX = 900;
let obstaculoY = 211;

let obstaculo1Img;
let obstaculo2Img;
let obstaculo3Img;

// Fisicas do jogo
let velocidadeX = -8; 
let velocidadeY = 0;
let gravidade = 4;

let gameOver = false;
let score = 0;

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    context = canvas.getContext("2d"); //used for drawing on the board

    //draw initial dinosaur
    // context.fillStyle="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);

    soldadoImg = new Image();
    soldadoImg.src = "./img/Soldado.png";
    soldadoImg.onload = function() {
        context.drawImage(soldadoImg, soldado.x, soldado.y, soldado.width, soldado.height);
    }

    obstaculo1Img = new Image();
    obstaculo1Img.src = "./img/ob1.png";

    obstaculo2Img = new Image();
    obstaculo2Img.src = "./img/ob2.png";

    obstaculo3Img = new Image();
    obstaculo3Img.src = "./img/ob3.png";

    requestAnimationFrame(update);
    setInterval(lugarObs, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", movSoldado);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Soldado
    velocidadeY += gravidade;
    soldado.y = Math.min(soldado.y + velocidadeY, soldadoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
    context.drawImage(soldadoImg, soldado.x, soldado.y, soldado.width, soldado.height);

    // Obstaculos
    for (let i = 0; i < obstaculosArray.length; i++) {
        let obstaculos = obstaculosArray[i];
        obstaculos.x += velocidadeX;
        context.drawImage(obstaculos.img, obstaculos.x, obstaculos.y, obstaculos.width, obstaculos.height);

        if (detectCollision(soldado, obstaculos)) {
            gameOver = true;
            soldadoImg.src = "./img/morte.png";
            soldadoImg.onload = function() {
                context.drawImage(soldadoImg, soldado.x, soldado.y, soldado.width, soldado.height);
        
            }
        }
    }

    //score
    context.fillStyle = "black";
    context.font = "20px Verdana";
    score++;
    context.fillText(score, 5, 20);
}


function movSoldado(e) {
    if (gameOver) {
        return;
    }
    if ((e.key === "W" || e.key === "w") && soldado.y == soldadoY) {
        soldadoY -= 100;
    }
}


document.addEventListener("keydown", movSoldado);
gameLoop();



function lugarObs() {
    if (gameOver) {
        return;
    }

    //Posições obstaculos
    let obstaculos = {
        img : null,
        x :obstaculoX,
        y : obstaculoY,
        width : null,
        height: obstaculoHeight
    }

    let PosicaoOBJ = Math.random(); //0 - 0.9999...

    if (PosicaoOBJ > .90) { //10% you get cactus3
        obstaculos.img = obstaculo3Img;
        obstaculos.width = obstaculo3Width;
        obstaculosArray.push(obstaculos);
    }
    else if (PosicaoOBJ > .70) { //30% you get cactus2
        obstaculos.img = obstaculo2Img;
        obstaculos.width = obstaculo2Width;
        obstaculosArray.push(obstaculos);
    }
    else if (PosicaoOBJ > .50) { //50% you get cactus1
        obstaculos.img = obstaculo1Img;
        obstaculos.width =obstaculo1Width;
        obstaculosArray.push(obstaculos);
    }

    if (obstaculosArray.length > 5) {
        obstaculosArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}