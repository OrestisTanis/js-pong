
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
window.addEventListener("keydown", movePaddle);
window.addEventListener("keyup", cancelPaddleMovement);

// SCORE
let score = document.getElementById("score").textContent;

// BALL INITIAL POS
let x = canvas.width / 2;
let y = canvas.height - 30;
const ballRadius = 10;
// BALL SPEED
let dx = 2;
let dy = -2;
// BALL
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// PADDLE INITIAL POS
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// PADDLE SPEED
let paddleDx = 5;
// PADDLE MOVEMENT
let rightPressed = false;
let leftPressed = false;
// PADDLE
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

// GETS CALLED EVERY FRAME
function gameLoop(){
    // CLEAR CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // RENDER
    drawBall();
    drawPaddle();

    // BALL COLLISIONS
    if (x + ballRadius > canvas.width  || x - ballRadius < 0){
        dx = -dx;        
    }
    else if ((y + ballRadius > canvas.height - paddleHeight  && x > paddleX && x < paddleX + paddleWidth )|| y - ballRadius < 0){
        dy = -dy;
        if (y > canvas.height / 2) {               
            increaseScore();
            increaseBallSpeed();
        }
    }
   
    // PADDLE MOVEMENT
    if (rightPressed && paddleX + paddleWidth < canvas.width ) paddleX += paddleDx;
    else if (leftPressed && paddleX > 0) paddleX -= paddleDx;

     // LOSING CONDITION
     if (y > canvas.height) alert(`
     YOU LOST!
     HIGHSCORE: ${score}
     PRESS F5 TO PLAY AGAIN!`);

    // BALL MOVEMENT
    x += dx;
    y += dy;

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function movePaddle(event){
    if (event.keyCode === 39){
        rightPressed = true;
    }
    if (event.keyCode === 37){
        leftPressed = true;
    }
}

function cancelPaddleMovement(event){
    if (event.keyCode === 39){
        rightPressed = false;
    }
    if (event.keyCode === 37){
        leftPressed = false;
    }
}

function increaseScore(){
    score = parseInt(score) + 1;
    document.getElementById("score").textContent = score;
}

function increaseBallSpeed(){
    if (dx > 0) dx += 0.2;
    else dx -= 0.2;

    if (dy > 0) dy += 0.2;
    else dy -= 0.2;
    
    console.log(dx);
    
}