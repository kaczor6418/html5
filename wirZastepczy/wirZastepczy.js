(function () {
    const baseElmentDrawDeley = 1000;
    const baseXPosition = 100;
    const baseYPosition = 100;
    const baseStepWidth = 100;
    const baseStepHeight = 100;
    const baseRadius = baseStepWidth * 0.25;
    const stepsCount = 5;
    const positionDelta = 1;
    const context = canvas.getContext('2d');
    const ballData = {
        x: baseXPosition + baseRadius,
        y: baseYPosition - baseRadius, 
        r: baseRadius
    };
    const stairs = new Array(stepsCount);
    const canvas = document.createElement('canvas');
    canvas.width = baseXPosition + stepsCount * baseStepWidth;
    canvas.height = baseYPosition + stepsCount * baseStepHeight;
    let currentStep = 0;

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

    // It is a hack not a good solution
    const removeCircle = (x, y, radius) => {
        context.clearRect(x - radius, y - radius, radius*2, radius*2);
    }

    const drawStairs = () => {
        for (let i = 1; i <= stepsCount; i++) {
            const step = {
                x: baseXPosition + baseStepWidth * i,
                y: baseYPosition + baseStepHeight * i
            };
            stairs.push(step);
            window.setTimeout(() => drawRectangle(baseXPosition, baseYPosition * i, baseStepWidth * i, baseStepHeight), baseElmentDrawDeley * i);
        }
    }

    const drawAbdAnimateBall = () => {
        window.setTimeout(() => {
            drawCircle(ballData.x, ballData.y, ballData.r);
            window.requestAnimationFrame(fallingBall);
        }, baseElmentDrawDeley * (stairs.length + 1));
    }

    const fallingBall = () => {
        if(ballData.y === stairs[stairs.length - 1].y - ballData.r) { 
            return void 0;
        }
        removeCircle(ballData.x, ballData.y, ballData.r);
        if(ballData.x < stairs[currentStep].x + ballData.r) {
            ballData.x += positionDelta;
        } else {
            if(ballData.y < stairs[currentStep].y - ballData.r) {
                ballData.y += positionDelta
            } else {
                ++currentStep;
            }
        }
        drawCircle(ballData.x, ballData.y, ballData.r);
        window.requestAnimationFrame(fallingBall);
    }

    window.requestAnimationFrame(drawStairs);
    window.requestAnimationFrame(drawAbdAnimateBall);
})();
