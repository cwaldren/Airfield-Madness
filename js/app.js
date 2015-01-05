var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
resizeCanvas();

document.body.appendChild(canvas);

var runway = new Image();
runway.src = "http://localhost/Airfield-Madness/img/runway.png";

var plane = new Image();
plane.src = "http://localhost/Airfield-Madness/img/plane.png";

var grass = new Image();
grass.src = "http://localhost/Airfield-Madness/img/grass.png";

var gameTime = 0;

var prevTime;
function main() {
    var now = Date.now();
    var deltaTime = (now - prevTime) / 1000.0;

    update(deltaTime);
    render();

    prevTime = now;
    requestAnimFrame(main);
}


function init() {
    prevTime = Date.now();
    main();
}

function render() {
    var pattern = ctx.createPattern(grass, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(runway, 400, 100);

}

function update(dt) {
    gameTime += dt;
    //update entities
    //check collisions etc.
}

init();