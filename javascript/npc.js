function ai(imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim) {
    /*VARIABLES*/
    this.image = new Image();
    this.image.src = imgSrc;

    this.x = x || 0;
    this.y = y || 0;
    this.speed = speed || 1;

    this.width = width || this.image.width;
    this.height = height || this.image.height;
    
    this.platforms = platforms || null;

    this.numFrames = numFrames || 1;
    this.numAnim = numAnim || 1;
    
    this.update = updateAI;
    this.direction = "left";
}

ai.prototype = new entity;

function updateAI(delta) {
    if (this.x >= canvas.width - this.width) this.direction = left;
    if (this.x <= 0) this.direction = right;
    if (this.y >= canvas.height - this.height) this.y = 0;
    this.move(this.direction, delta);
}