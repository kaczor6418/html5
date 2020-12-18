export class CanvasService {

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.canvas = document.createElement('canvas');
        this.context = canvas.getContext('2d');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
    }

    drawRectangle = (x, y, width, height, color = 'black') => {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.fill();
    }

    drawCircle = (x, y, radius, color = 'black') => {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fill();
    }

    removeCircle = (x, y, radius) => {
        this.context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    removeRectangle = (x, y, width, height) => {
        this.context.clearRect(x, y, width, height);
    }

    resetBoard = () => {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    play(callback) {
        if(callback()) {
            return void 0;
        }
        window.requestAnimationFrame(callback);
    }

    attach(element) {
        element.appendChild(this.canvas);
    }

}