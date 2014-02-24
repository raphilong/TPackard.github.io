function Platform(x, y, width, height, tileSize) {
    this.x = x;
    this.y = y;
    this.width = width || 1;
    this.height = height || 1;
    this.tileSize = tileSize || 16;
}

Platform.prototype.draw = function(context) {
    context.fillStyle = "#444444";
    context.fillRect((this.x * this.tileSize - scrollX) * DPI, (this.y * this.tileSize - scrollY) * DPI, (this.width * this.tileSize) * DPI, (this.height * this.tileSize) * DPI);
}