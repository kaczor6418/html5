(function () {

    const canvas = document.querySelector('#stairs-and-ball');
    const context = canvas.getContext('2d');
    const baseElmentDrawDeley = 1000;
    const baseXPosition = 100;
    const baseYPosition = 100;
    const ballData = {
        x: 0,
        y: 0, 
        r: 0
    };
    const stairs = [];

    const drawRectangle = (x, y, width, height, color = 'black') => {
        context.fillStyle = color;
        context.beginPath();
        context.rect(x, y, width, height);
        context.fill();
    }

    const drawCircle = (x, y, radius, color = 'black') => {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }

    const drawStairs = () => {
        const baseStepWidth = 100;
        const baseStepHeight = 100;
        for (let i = 1; i < 4; i++) {
            const step = {
                xEnd: baseXPosition + baseStepWidth * i,
                yEnd: baseYPosition + baseStepHeight * i
            };
            stairs.push(step);
            window.setTimeout(() => drawRectangle(baseXPosition, baseYPosition * i, baseStepWidth * i, baseStepHeight), baseElmentDrawDeley * i);
        }
    }

    const drawAbdAnimateBall = () => {
        const radius = 25;
        ballData.x = baseXPosition + radius;
        ballData.y = baseYPosition - radius;
        ballData.r = radius;
        window.setTimeout(() => {
            drawCircle(ballData.x, ballData.y, ballData.r);
            window.webkitRequestAnimationFrame(fallingBall);
        }, baseElmentDrawDeley * (stairs.length + 1));
    }

    const fallingBall = () => {
        const positionDelta = 1;
        drawCircle(ballData.x, ballData.y, ballData.r, 'white');
        ballData.x += positionDelta;
        ballData.y += positionDelta;
        drawCircle(ballData.x, ballData.y, ballData.r);
        window.requestAnimationFrame(fallingBall);
    }

    window.webkitRequestAnimationFrame(drawStairs);
    window.webkitRequestAnimationFrame(drawAbdAnimateBall);
})();
