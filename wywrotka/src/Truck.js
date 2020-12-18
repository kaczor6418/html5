export class Truck {

    constructor({ semitrailer, tractor, wheels } = {}, canvas) {
        this.semitrailer = semitrailer;
        this.tractor = tractor;
        this.wheels = wheels;
        this.canvas = canvas;
    }

    drawTruck() {
        this.drawSemitrailer();
        this.drawTractor();
        this.draWheels();
    }

    drawSemitrailer() {
        const florWidth = this.semitrailer.position.x + this.semitrailer.size.width - this.semitrailer.size.thickness;
        this.drawSemitrailerFloor(this.semitrailer.position.x, this.semitrailer.position.y, florWidth, this.semitrailer.size.thickness);
        const wallXPosition = this.semitrailer.position.x + florWidth;
        this.drawSemitrailerFloor(wallXPosition, this.semitrailer.position.y, this.semitrailer.size.thickness, this.semitrailer.size.height);
    }

    drawSemitrailerFloor(x, y, width, height) {
        this.canvas.drawRectangle(x, y, width, height);
    }

    drawSemitrailerWall(x, y, width, height) {
        this.canvas.drawRectangle(x, y, width, height);
    }

    drawTractor() {

    }

    draWheels() {

    }

}