export class Truck {

    constructor({semitrailer, tractor, wheels} = {}, canvas) {
        this.semitrailer = semitrailer;
        this.tractor = tractor;
        this.wheels = wheels;
        this.canvas = canvas;
    }

}