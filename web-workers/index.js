const baseImage = new Image();
const postprocessingBtn = document.querySelector('#postprocessing');
const postprocessingProgress = document.querySelector('#postprocessing-progress');
const workersInput = document.querySelector('#workers-count');
const photoInput = document.querySelector('#photo-input');
const inputImg = document.querySelector('#image-input');
const inputImgCtx = inputImg.getContext('2d');
const outputImg = document.querySelector('#image-output');
const outputImgCtx = outputImg.getContext('2d');
const workers = [];

const progressBarObserver = new MutationObserver( () => {
    if(postprocessingProgress.value === postprocessingProgress.max) {
        disposeWorkers();
    }
});
progressBarObserver.observe(postprocessingProgress, { attributes: true });

const disposeWorkers = () => {
    for(const worker of workers) {
        worker.terminate();
    }
    workers.length = 0;
}

const clearOutputCanvas = () => {
    outputImgCtx.fillStyle='black';
    outputImgCtx.fillRect(0, 0, outputImg.width, outputImg.height);
}

const resetProgess = () => {
    postprocessingProgress.value = 0;
    postprocessingProgress.max = parseInt(workersInput.value);
}

const createWorkerListener = (start) => {
    return ({ data }) => {
        outputImgCtx.putImageData(data, 0, start);
        postprocessingProgress.value = parseInt(postprocessingProgress.value) + 1;
    }
}

const getWorkersPixelsRanges = (imageHeight) => {
    const workersCount = parseInt(workersInput.value);
    const workerPixelsSize = Math.floor(imageHeight / workersCount);
    const workersPixelsRanges = [];
    let start = 0;
    for(let i = 1; i < workersCount; i++) {
        let end = start + workerPixelsSize;
        workersPixelsRanges.push([start, end]);
        start = end;
    }
    workersPixelsRanges.push([start, imageHeight]);
    return workersPixelsRanges;
}

const startPreprocessing = () => {
    resetProgess();
    clearOutputCanvas();
    const pixelRanges = getWorkersPixelsRanges(inputImg.height);
    for(const [start, end] of pixelRanges) {
        const imageData = inputImgCtx.getImageData(0, start, inputImg.width, end);
        const worker = new Worker('./greyscaleWorker.js');
        workers.push(worker);
        worker.addEventListener('message', createWorkerListener(start));
        worker.postMessage({ imageData }, [ imageData.data.buffer ]);
    }
}

photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    baseImage.src = URL.createObjectURL(file);
});

baseImage.addEventListener('load', () => {
    inputImg.width = baseImage.width;
    inputImg.height = baseImage.height;
    outputImg.width = baseImage.width;
    outputImg.height = baseImage.height;
    inputImgCtx.drawImage(baseImage, 0, 0);
    resetProgess();
    clearOutputCanvas();
});

postprocessingBtn.addEventListener('click', startPreprocessing);