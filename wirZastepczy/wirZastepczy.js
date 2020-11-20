(function () {

    const canvas = document.querySelector('#stairs-and-ball');
    const context = canvas.getContext('2d');

    const drawRectangle = (x, y, width, height) => {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fill();
    }

    const drawStairs = () => {
        window.setTimeout(() => drawRectangle(100, 100, 100, 100), 1000);
        window.setTimeout(() => drawRectangle(100, 200, 200, 100), 2000);
        window.setTimeout(() => drawRectangle(100, 300, 300, 100), 3000);
        window.setTimeout(() => drawRectangle(100, 400, 400, 100), 4000);
        window.setTimeout(() => drawRectangle(100, 500, 500, 100), 5000);
    }

    window.webkitRequestAnimationFrame(drawStairs);
})();
