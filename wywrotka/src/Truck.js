export class Truck {
    static SPACE_TRUCK_AND_WHEELS = 5;

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
        const xPosition = this.semitrailer.size.width + this.semitrailer.size.thickness;
        this.canvas.drawRectangle(xPosition, this.semitrailer.position.y, this.tractor.size.width, this.tractor.size.height);
    }

    draWheels() {
        const yPosition = this.semitrailer.position.y - Truck.SPACE_TRUCK_AND_WHEELS;
        let xPosition = this.semitrailer.x;
        for(let i = 0; i < this.wheels.count; i++) {
            this.canvas.drawCircle(xPosition, yPosition, this.wheels.radius);
            xPosition += this.wheels.radius + this.wheels.spaceBetweenWheels;
        }
    }

}