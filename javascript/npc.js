function AI(imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim) {
    Entity.call(this, imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim);
    this.direction = "left";
}

AI.prototype = new Entity;

AI.prototype.update = function(delta) {
    if (this.alive) {
        if (this.direction == right && !this.canMove(right)) {
            this.direction = left;
        }
        if (this.direction == left && !this.canMove(left)) {
            this.direction = right;
        }
        if (this.y >= canvas.height - this.height) this.y = 0;
        this.move(this.direction, delta);
    } else {
        this.x = -1000;
        if (this.timeSinceDeath < 1) this.timeSinceDeath += delta;
        else {
            this.timeSinceDeath = 0;
            this.alive = true;
            this.x = 0;
            this.y = 0;
        }
    }
}

AI.prototype.checkAlive = function(entity) {
    var me = this; // WHY?!
    if (entity != this)
    entity.projectiles.forEach(function(projectile) {
        if (projectile.x > me.x && projectile.x < me.x + me.width && projectile.y > me.y && projectile.y < me.y + me.height) me.alive = false;
    });
}