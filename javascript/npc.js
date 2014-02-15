function AI(imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim) {
    Entity.call(this, imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim);
    this.direction = "left";
}

AI.prototype = new Entity;

AI.prototype.update = function(delta) {
    if (this.direction == right && !this.canMove(right)) {
        this.direction = left;
    }
    if (this.direction == left && !this.canMove(left)) {
        this.direction = right;
    }
    if (this.y >= canvas.height - this.height) this.y = 0;
    this.move(this.direction, delta);
}