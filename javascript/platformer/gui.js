/*STATUS BAR*/
function StatusBar(imageSrc, x, y, width, height) {
	this.image = new Image();
	this.image.src = imageSrc + imgExt + ".png";
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.percent = 1;
	this.canDraw = true;
}

StatusBar.prototype.draw = function(context) {
	context.fillStyle = "#444444";
	context.fillRect(this.x * DPI, this.y * DPI, this.width * DPI, this.height * DPI);
	if (this.canDraw) {
		context.drawImage(this.image, 0, 0, (this.width * this.percent - 1) * DPI, this.height * DPI, (this.x) * DPI, this.y * DPI, (this.width * this.percent - 1) * DPI, this.height * DPI);
		context.drawImage(this.image, (this.width - 1) * DPI, 0, DPI, this.height * DPI, (this.x + this.width * this.percent - 1) * DPI, this.y * DPI, DPI, this.height * DPI);
	}
}

StatusBar.prototype.update = function(value, total) {
	this.percent = value/total;
	if (this.percent <= 0) {
		this.canDraw = false;
	} else {
		this.canDraw = true;
	}
}