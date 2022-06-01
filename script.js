var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Ball {
    constructor(){
        this.x = 50;
        this.y = 50;
        this.r = 10;
        this.dx = 3;
        this.dy = 3;
        this.color = "white";
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0,2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    move(){
        this.x += this.dx;
        /*
        
        if(this.x > 640 - this.r){
            this.dx = -this.dx;
        }
        if(this.x < this.r){
            this.dx = -this.dx;
        }
        */
        this.y += this.dy;
        if(this.y > 480 - this.r){
            this.dy = -this.dy;
        }
        if(this.y < this.r){
            this.dy = -this.dy;
        }
    }
}

class Pad {
    constructor(){
        this.x = 5;
        this.y = 215;
        this.w = 5;
        this.h = 50;
        this.dy = 0;
        this.color = "white";
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move(){
        this.y += this.dy;
        if(this.y >= 480 - this.h){
            this.y = 480 - this.h;
            this.dy = 0;
        }
        if(this.y <= 0){
            this.y = 0;
            this.dy = 0;
        }
    }
}

var ball = new Ball();
var leftPad = new Pad();
var rightPad = new Pad();
rightPad.x = 630;
var leftPoints = 0;
var rightPoints = 0;
function rysuj(){
    //ctx.clearRect(0,0,640,480);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,640,480);
    ctx.fillStyle = "white";
    ctx.font="50px Arial";
    ctx.fillText(leftPoints, 200, 100);
    ctx.fillText(rightPoints, 400, 100);
    ctx.font="20px Arial";
    i=20;
    while(i <= 490){
        ctx.fillText("|", 310, i);
        i = i + 30;
    }
    ball.draw(ctx);
    ball.move();
    leftPad.draw(ctx);
    leftPad.move();
    rightPad.draw(ctx);
    rightPad.move();
    requestAnimationFrame(rysuj);


    //odbicie od lewej palety
    if(ball.dx < 0){
        if(ball.y >= leftPad.y && ball.y <= leftPad.y + leftPad.h){
            if(ball.x >= leftPad.x + leftPad.w && ball.x <=leftPad.x + leftPad.w + ball.r){
                ball.dx = -ball.dx;
                var plop = document.getElementById("plop");
                plop.play();
            }
        }
        if(ball.x < leftPad.x + leftPad.w){
            alert("prawy zdobywa punkt");
            ball.x = 320;
            ball.y = 240;
            ball.dx = -ball.dx;
            leftPad.y = 215;
            rightPad.y = 215;
            rightPoints++;
        }
    }

    //odbicie od prawej palety
    if(ball.dx > 0){
        if(ball.y >= rightPad.y && ball.y <= rightPad.y + leftPad.h){
            if(ball.x >= rightPad.x - ball.r && ball.x <=rightPad.x){
                ball.dx = -ball.dx;
                var plop = document.getElementById("plop");
                plop.play();
            }
        }

        if(ball.x > rightPad.x){
            alert("lewy zdobywa punkt");
            ball.x = 320;
            ball.y = 240;
            ball.dx = -ball.dx;
            leftPad.y = 215;
            rightPad.y = 215;
            leftPoints++;
        }
    }
}

requestAnimationFrame(rysuj);

function keyDown(event){
    console.log(event);
    switch(event.code){
        case "KeyA": leftPad.dy = -3;break;
        case "KeyZ": leftPad.dy = 3;break;
        case "ArrowUp": rightPad.dy = -3;break;
        case "ArrowDown": rightPad.dy = 3;break;
    }
}

function keyUp(event){
    console.log(event);
    switch(event.code){
        case "KeyA": if(leftPad.dy < 0) leftPad.dy = 0;break;
        case "KeyZ": if(leftPad.dy > 0) leftPad.dy = 0;break;
        case "ArrowUp": if(rightPad.dy < 0) rightPad.dy = 0;break;
        case "ArrowDown": if(rightPad.dy > 0) rightPad.dy = 0;break;
    }
}