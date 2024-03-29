// import Paddle from "/src/paddle.js"
// import InputHandler from "/src/input.js"
//manually import paddle for now....



//start at 24 min

class Paddle {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.width = 150;
        this.height = 20;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10
        };
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "#0FF"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        if(!deltaTime) return;

        this.position.x += this.speed;

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth)
            this.position.x = this.gameWidth - this.width;
    }
}


class InputHandler {
    constructor(paddle) {
        document.addEventListener('keydown', (event) => {
            

            switch(event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;
                
                case 39:
                    paddle.moveRight();
                    break;
            }

        })

        document.addEventListener('keyup', (event) => {

            switch(event.keyCode) {
                case 37:
                    if(paddle.speed < 0)
                    paddle.stop();
                    break;
                
                case 39:
                    if(paddle.speed > 0)
                    paddle.stop();
                    break;
            }
        })
    }
}

//end manual import




let canvas = document.getElementById('gameScreen');

//rendering context for drawing to canvas
let ctx = canvas.getContext('2d');
 
const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;


ctx.clearRect(0,0,800,600);


let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT) 

paddle.draw(ctx);

new InputHandler(paddle);

let lastTime = 0;

function gameLoop (timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,800,600);
    paddle.update(deltaTime);
    paddle.draw(ctx);

    requestAnimationFrame(gameLoop)
}

gameLoop();