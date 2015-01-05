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

var msg = "";
var runway = new Image();
runway.src = "http://localhost/Airfield-Madness/img/runway.png";

var planeImg = new Image();
planeImg.src = "http://localhost/Airfield-Madness/img/plane.png";

var bluePlaneImg = new Image();
bluePlaneImg.src = "http://localhost/Airfield-Madness/img/plane_you.png";


var shadowImg = new Image();
shadowImg.src = "http://localhost/Airfield-Madness/img/plane_shadow.png";

var grass = new Image();
grass.src = "http://localhost/Airfield-Madness/img/grass.png";


var stats = new Stats();
stats.setMode(0);
document.body.appendChild( stats.domElement );


var gameTime = 0;
var mouse = { x:0, y:0};
            
var prevTime;

// var planeObj = {
//     pos: [400, 200],
//     rot: Math.PI/2,
//     alt: 0.
// }
var plane = new Plane([400, 240], Math.PI/2, 0.0, bluePlaneImg, shadowImg);
var planes = [];

for (i = 0; i < 10; i++) {
    planes.push(new Plane([Math.random()*(canvas.width-100)+100, Math.random()*(canvas.height-100)+100], Math.PI*Math.random(), Math.random()*.7, planeImg, shadowImg));
}

function main() {
    stats.begin();
    var now = Date.now();
    var deltaTime = (now - prevTime) / 1000.0;

    update(deltaTime);
    render();

    prevTime = now;
    stats.end();
    requestAnimFrame(main);
}


function init() {
    prevTime = Date.now();
    main();
}

function render() {
   //note to self: this is crazy when remove the clear loop

    renderBackgroundStuff();
    renderPlanes();
   
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText(msg, 100, 100);
}
function compare (a, b) {
          if (a.alt < b.alt)
             return 1;
          if (a.alt > b.alt)
            return -1;
          return 0;
    }
function renderBackgroundStuff() {
    var pattern = ctx.createPattern(grass, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(runway, 400, 200);
}


function renderPlanes(){
    var p = planes.slice(0);
    p.push(plane);
    p.sort(function(a,b) {return a.alt - b.alt});
    for (i = 0; i < p.length; i++) {
        ctx.save();
        p[i].render(ctx);
        ctx.restore();
    }

   
}
function update(dt) {
    gameTime += dt;
    for (i = 0; i < planes.length; i++) {
        planes[i].update(dt);
        planes[i].rot += .8*dt;
    }
    updatePlane(dt);
   
}

function updatePlane(dt) {
    plane.update(dt);
    msg = plane.alt;

    if (input.isDown('a')) {
        plane.rot -= .8*dt;
    }
    if (input.isDown('d')) {
        plane.rot += .8*dt;
    }
    if (input.isDown('w') && plane.alt > 0.0) {
        plane.alt -= .002;
    }
    if (input.isDown('s') && plane.alt < 0.8) {
        plane.alt += .002;
    }
    
}



init();


window.addEventListener('mousemove', updateMouse, false);

function updateMouse(e) {
    var pos = getMousePos(canvas, e);
   
    mouse.age = Date.now();
    mouse.x = pos.x;
    mouse.y = pos.y;

}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}