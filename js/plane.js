(function() {
    function Plane(pos, rot, alt, image, shadow) {
        this.pos = pos;
        this.rot = rot;
        this.alt = alt;
        this.image = image;
        this.shadow = shadow;
        this.baseSpeed = 1.4;
    }

    Plane.prototype = {
        update: function(dt) {
            var theta = this.rot - Math.PI/2;
            var multiplier = 50 * (this.alt*4 + this.baseSpeed) * dt;
            this.pos[0] += Math.cos(theta) * multiplier;
            this.pos[1] += Math.sin(theta) * multiplier; 


        },

        render: function(ctx) {
            var half_width = this.image.width/2;
            var half_height = this.image.height/2;
          

            //get to the general correct position
            //shadow 
            ctx.save();
            ctx.translate(this.pos[0] + 50*this.alt *Math.exp(this.alt),  this.pos[1] + 50*this.alt*Math.exp(this.alt));

            ctx.scale(this.alt + .5 , this.alt + .5);

            ctx.rotate(this.rot);
            ctx.globalAlpha = 1.0- (this.alt +.1);
            ctx.drawImage(this.shadow, -half_width, -half_height/2 - 40);
            ctx.restore();

            //plane 
            ctx.translate(this.pos[0] ,  this.pos[1] );

            ctx.scale(this.alt + .5 , this.alt + .5);
            ctx.translate(- 50*this.alt, - 50*this.alt);
            ctx.rotate(this.rot);
            ctx.drawImage(this.image, -half_width, -half_height/2 - 40);
        },

       
    };

    window.Plane = Plane;
})();