(function() {
    function Animated(pos,rot, anim) {
        this.pos = pos;
        this.anim = anim;
        this.rot = rot;
        this.frames = anim.length;
        this.frame = anim.length+1;
        this.opac = 1.0;
    }

    Animated.prototype = {
        update: function(dt) {
            this.frame += dt*20;
            this.opac =.7;
        },

        render: function(ctx) {
            if (Math.floor(this.frame) >= this.frames) 
                return;

            var index = Math.floor(this.frame);
            ctx.translate(this.pos[0], this.pos[1]);
            ctx.rotate(this.rot);
            ctx.globalAlpha = this.opac;
            ctx.scale(.4,.4);
            ctx.drawImage(this.anim[index % this.frames], -115/2, -115/2);
        }
    }

    window.Animated = Animated;
})();

 