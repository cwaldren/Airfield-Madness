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
var mouse = { x:0, y:0, age:Date.now()};
            
var prevTime;

var planeObj = {
    pos: [400, 100],
    rot: Math.PI,
    holding:false,
    alt: 1.0
}
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

   
    ctx.drawImage(runway, 400, 200);

    ctx.save();
    ctx.translate(planeObj.pos[0], planeObj.pos[1]);
    ctx.rotate(planeObj.rot);
    ctx.drawImage(plane, -plane.width/2, -plane.height/2, plane.width/planeObj.alt, plane.height/planeObj.alt);
    ctx.restore();

}

function update(dt) {
    gameTime += dt;
    updatePlane(dt)
    //update entities
    //check collisions etc.
}

function updatePlane(dt) {
    planeObj.pos[0] += Math.cos(planeObj.rot-Math.PI/2);
    planeObj.pos[1] += Math.sin(planeObj.rot-Math.PI/2);

    if (input.isDown('a')) {
        planeObj.rot -= .01;

    }
    if (input.isDown('d')) {
        planeObj.rot += .01;
    }

     if (input.isDown('w')) {
        if (planeObj.alt < 1.3)
        planeObj.alt += .001;
    }
     if (input.isDown('s')) {
        if (planeObj.alt > .8)
        planeObj.alt -= .001;
    }
}

function updatePlaneOld(dt) {
    var dx =  planeObj.pos[0]- mouse.x ;//mouse.x - planeObj.pos[0];
    var dy = planeObj.pos[1]-mouse.y  ;//mouse.y - planeObj.pos[1];

    var dist = Math.sqrt(dx*dx + dy*dy);

    plane.holding = (Date.now() - mouse.age > 1000 && (dist <= 100)) || dist < 100   ; 


    if (plane.holding) {
       
        //center is the mouse
        var theta = .5 * Math.PI/180;
        var ax = Math.cos(theta) * dx - Math.sin(theta) * dy + mouse.x;
        var ay = Math.sin(theta) * dx + Math.cos(theta) * dy + mouse.y;
        planeObj.rot = Math.atan2(dy, dx) + Math.PI;
        planeObj.pos[0] = ax;
        planeObj.pos[1] = ay;
}else{

   

var slope = dy/dx;
    var angle = Math.atan2(dy, dx) ;
    var dif = planeObj.rot - (angle + Math.PI/2);
   planeObj.rot = (angle-Math.PI/2);
    planeObj.pos[0] -= Math.cos(angle );
    planeObj.pos[1] -= Math.sin(angle );
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