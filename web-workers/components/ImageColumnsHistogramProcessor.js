import {AbstractWebComponent} from './AbstractWebComponent.js';

const template = `
<details>
  <summary>Columns Histogram</summary>
  <div>
      <label for="workers-count">Put number of workers you want to use:</label>
      <input id="workers-count" name="workers-count" type="number" value="4" />
  </div>  
  <div>
      <label for="columns-count">Put number of columns:</label>
      <input id="columns-count" name="columns-count" type="number" value="4" />
  </div>
  <button id="start-processing">Start postprocessing</button>
  <div>
      <label for="postprocessing-progress">Postprocessing progress:</label>
      <progress id="postprocessing-progress" max="100" value="0"></progress>
  </div>
  <canvas id="histogram-output" />
</details>`;

export class ImageColumnsHistogramProcessor extends AbstractWebComponent {

  constructor() {
    super(template);
    this.workers = [];
    this.getElementsReferences();
    this.setUpListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.outputCtx = this.output.getContext('2d');
  }

  getElementsReferences() {
    this.workersCount = this.shadowRoot.querySelector('#workers-count');
    this.columnsCount = this.shadowRoot.querySelector('#columns-count');
    this.startBtn = this.shadowRoot.querySelector('#start-processing');
    this.progressBar = this.shadowRoot.querySelector('#postprocessing-progress');
    this.output = this.shadowRoot.querySelector('#histogram-output');
    this.output.height = 50;
  }

  setUpListeners() {
    this.startBtn.addEventListener('click', this.startPreprocessing);
    const progressBarObserver = new MutationObserver(() => {
      if (this.progressBar.value === this.progressBar.max) {
        this.disposeWorkers();
      }
    });
    progressBarObserver.observe(this.progressBar, {attributes: true});
  }

  setInputImg(inputImg) {
    this.inputImg = inputImg;
    this.inputCtx = inputImg.getContext('2d');
    this.output.width = this.inputImg.width;
    this.resetOutputCanvas();
    this.resetProgress();
  }

  startPreprocessing = () => {
    if (this.inputImg == null) {
      console.error('Before you start postprocessing you need to provide INPUT IMAGE');
      return void 0;
    }
    this.resetProgress();
    this.resetOutputCanvas();
    const columnsRanges = this.getWorkersColumnsRanges();
    for (const ranges of columnsRanges) {
      for (const [start, end] of ranges) {
        const imageData = this.inputCtx.getImageData(start, 0, end - start, this.inputImg.height);
        const worker = new Worker('./workers/averageColumnColorWorker.js');
        this.workers.push(worker);
        worker.addEventListener('message', this.createWorkerListener(start));
        worker.postMessage({imageData}, [imageData.data.buffer]);
      }
    }
  }

  getWorkersColumnsRanges() {
    const width = this.inputImg.width;
    const columnsCount = parseInt(this.columnsCount.value);
    const workersCount = parseInt(this.workersCount.value);
    const columnSize = parseInt(width / columnsCount);
    const columnsRanges = [];
    let start = 0;
    for (let i = 0; i < columnsCount; i++) {
      let end = start + columnSize;
      columnsRanges.push([start, end]);
      start = end;
    }
    columnsRanges[columnsRanges.length - 1][1] = width;
    const columnsPerWorker = parseInt(columnsCount / workersCount);
    const workersColumns = [];
    while (columnsRanges.length !== 0) {
      workersColumns.push(columnsRanges.splice(0, columnsPerWorker));
    }
    return workersColumns;
  }

  createWorkerListener(start) {
    return ({data}) => {
      this.outputCtx.putImageData(data, start, 0);
      this.progressBar.value = parseInt(this.progressBar.value) + 1;
    }
  }

  resetOutputCanvas() {
    this.outputCtx.fillStyle = 'black';
    this.outputCtx.fillRect(0, 0, this.output.width, this.output.height);
  }

  resetProgress() {
    this.progressBar.value = 0;
    this.progressBar.max = parseInt(this.columnsCount.value);
  }

  disposeWorkers() {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers.length = 0;
  }

}

customElements.define('kk-image-column-histogram', ImageColumnsHistogramProcessor);