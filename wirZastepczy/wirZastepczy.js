(function () {

    const canvas = document.querySelector('#stairs-and-ball');
    const context = canvas.getContext('2d');
    const ballData = {
        x: 0,
        y: 0, 
        r: 0
    };

    const drawRectangle = (x, y, width, height) => {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fill();
    }

    const drawCircle = (x, y, radius) => {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }

    const drawBall = () => {
        const radius = 50;
        ballData.x = 100 + radius;
        ballData.y = 100 - radius;
        ballData.r = radius;
        drawCircle(ballData.x, ballData.y, ballData.r);
    }

    const drawStairs = () => {
        window.setTimeout(() => drawRectangle(100, 100, 100, 100), 1000);
        window.setTimeout(() => drawRectangle(100, 200, 200, 100), 2000);
        window.setTimeout(() => drawRectangle(100, 300, 300, 100), 3000);
        window.setTimeout(() => drawRectangle(100, 400, 400, 100), 4000);
        window.setTimeout(() => drawRectangle(100, 500, 500, 100), 5000);
    }

    window.webkitRequestAnimationFrame(drawStairs);
    window.webkitRequestAnimationFrame(drawBall);
})();
