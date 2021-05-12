const template = `
<section>
  <h3>Grayscale</h3>
  <div>
      <label for="workers-count">Put number of workers you want to use:</label>
      <input id="workers-count" name="workers-count" type="number" value="4" />
  </div>
  <button id="start-processing">Start postprocessing</button>
  <div>
      <label for="grayscale-progress">Postprocessing progress:</label>
      <progress id="grayscale-progress" max="100" value="0"></progress>
  </div>
  <canvas id="grayscale-output" />
</section>`;

export class GrayscaleProcessor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this.workers = [];
    this.getElementsReferences();
    this.setUpListeners();
  }

  connectedCallback() {
    this.outputCtx = this.outputImg.getContext('2d');
  }

  getElementsReferences() {
    this.workersCount = this.shadowRoot.querySelector('#workers-count');
    this.startBtn = this.shadowRoot.querySelector('#start-processing');
    this.grayscaleProgress = this.shadowRoot.querySelector('#grayscale-progress');
    this.outputImg = this.shadowRoot.querySelector('#grayscale-output');
  }

  setUpListeners() {
    this.startBtn.addEventListener('click', this.startPreprocessing.bind(this));
    const progressBarObserver = new MutationObserver( () => {
      if(this.grayscaleProgress.value === this.grayscaleProgress.max) {
          this.disposeWorkers();
      }
    });
    progressBarObserver.observe(this.grayscaleProgress, { attributes: true });
  }

  setInputImg(inputImg) {
    this.inputImg = inputImg;
    this.inputCtx = inputImg.getContext('2d');
    this.outputImg.width = this.inputImg.width;
    this.outputImg.height = this.inputImg.height;
    this.clearOutputCanvas();
    this.resetProgess();
  }

  startPreprocessing() {
    if(this.inputImg == null) {
      console.error('Before you start postprocessing you need to provide INPUT IMAGE');
      return void 0;
    }
    this.resetProgess();
    this.clearOutputCanvas();
    const pixelRanges = this.getWorkersPixelsRanges();
    for(const [start, end] of pixelRanges) {
        const imageData = this.inputCtx.getImageData(0, start, this.inputImg.width, end);
        const worker = new Worker('./grayscaleWorker.js');
        this.workers.push(worker);
        worker.addEventListener('message', this.createWorkerListener(start));
        worker.postMessage({ imageData }, [ imageData.data.buffer ]);
    }
  }

  getWorkersPixelsRanges () {
    const height = this.inputImg.height;
    const workersCount = parseInt(this.workersCount.value);
    const workerPixelsSize = Math.floor(height / workersCount);
    const workersPixelsRanges = [];
    let start = 0;
    for(let i = 1; i < workersCount; i++) {
        let end = start + workerPixelsSize;
        workersPixelsRanges.push([start, end]);
        start = end;
    }
    workersPixelsRanges.push([start, height]);
    return workersPixelsRanges;
  }

  createWorkerListener(start) {
    return ({ data }) => {
        this.outputCtx.putImageData(data, 0, start);
        this.grayscaleProgress.value = parseInt(this.grayscaleProgress.value) + 1;
    }
  }


  clearOutputCanvas() {
    this.outputCtx.fillStyle='black';
    this.outputCtx.fillRect(0, 0, this.outputImg.width, this.outputImg.height);
  }

  resetProgess() {
    this.grayscaleProgress.value = 0;
    this.grayscaleProgress.max = parseInt(this.workersCount.value);
  }

  disposeWorkers() {
    for(const worker of this.workers) {
        worker.terminate();
    }
    this.workers.length = 0;
  }

}

customElements.define('kk-grayscale-processor', GrayscaleProcessor);