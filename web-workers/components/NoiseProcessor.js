import {AbstractWebComponent} from './AbstractWebComponent.js';
import {RectanglePicker} from './RectanglePicker.js';

const template = `
<details>
  <summary>Add Noise</summary>
  <section>
    <h4>Select noise rectangles</h4>
    <div id="rectangles-pickers-wrapper">
      <kk-rectangle-picker></kk-rectangle-picker>
    </div>
    <button id="add-rectangle-picker">Add picker</button>
  </section>
    <section>
    <h4>Animation options</h4>
      <div>
        <label for="animation-frequency">Enter animation frequency [ in ms ]:</label>
        <input id="animation-frequency" name="animation-frequency" type="number" value="0" step="10"/>
    </div>  
    <div>
        <label for="animation-amplitude">Enter animation amplitude [ amplitude > 0 && amplitude < 1]:</label>
        <input id="animation-amplitude" name="animation-amplitude" type="number" value="0.5" step="0.1"/>
    </div>  
  </section>
  <div>
      <label for="workers-count">Put number of workers you want to use:</label>
      <input id="workers-count" name="workers-count" type="number" value="4" />
  </div>  
  <button id="start-processing">Start postprocessing</button>
  <button id="start-animation">Run animation</button>
  <div>
      <label for="postprocessing-progress">Postprocessing progress:</label>
      <progress id="postprocessing-progress" max="100" value="0"></progress>
  </div>
  <canvas id="postprocessing-output" />
</details>
`;

export class NoiseProcessor extends AbstractWebComponent {
  constructor() {
    super(template);
    this.workers = [];
    this.getElementsReferences()
    this.setUpListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.outputCtx = this.outputImg.getContext('2d');
  }

  getElementsReferences() {
    this.pickersWrapper = this.shadowRoot.querySelector('#rectangles-pickers-wrapper');
    this.addPickerBtn = this.shadowRoot.querySelector('#add-rectangle-picker');
    this.animationFrequency = this.shadowRoot.querySelector('#animation-frequency');
    this.aniamtionAmplitude = this.shadowRoot.querySelector('#animation-amplitude');
    this.workersCount = this.shadowRoot.querySelector('#workers-count');
    this.startBtn = this.shadowRoot.querySelector('#start-processing');
    this.aimationBtn = this.shadowRoot.querySelector('#start-animation');
    this.progressBar = this.shadowRoot.querySelector('#postprocessing-progress');
    this.outputImg = this.shadowRoot.querySelector('#postprocessing-output');
  }

  setUpListeners() {
    this.addPickerBtn.addEventListener('click', this.addRectanglePicker);
    this.startBtn.addEventListener('click', this.startPreprocessing);
    this.aimationBtn.addEventListener('click', this.runAnimation);
    const progressBarObserver = new MutationObserver(() => {
      if (this.progressBar.value === this.progressBar.max) {
        this.disposeWorkers();
      }
    });
    progressBarObserver.observe(this.progressBar, {attributes: true});
  }

  addRectanglePicker = () => {
    this.pickersWrapper.append(new RectanglePicker());
  }

  setInputImg(inputImg) {
    this.inputImg = inputImg;
    this.inputCtx = inputImg.getContext('2d');
    this.outputImg.width = this.inputImg.width;
    this.outputImg.height = this.inputImg.height;
    this.outputCtx.putImageData(this.inputCtx.getImageData(0, 0, this.inputImg.width, this.inputImg.height), 0, 0);
    this.resetOutputCanvas();
    this.resetProgress();
  }

  resetOutputCanvas() {
    this.outputCtx.putImageData(this.inputCtx.getImageData(0, 0, this.inputImg.width, this.inputImg.height), 0, 0);
  }

  resetProgress() {
    this.progressBar.value = 0;
    this.progressBar.max = parseInt(this.workersCount.value);
  }

  createWorkerListener = (x, y) => {
    return ({data}) => {
      this.outputCtx.putImageData(data, x, y);
      this.progressBar.value = parseInt(this.progressBar.value) + 1;
    }
  }

  createAnimationWorkerListener = (x, y) => {
    return ({data}) => {
      this.outputCtx.putImageData(data, x, y);
    }
  }

  startPreprocessing = () => {
    if (this.inputImg == null) {
      console.error('Before you start postprocessing you need to provide INPUT IMAGE');
      return void 0;
    }
    this.resetProgress();
    this.resetOutputCanvas();
    this.disposeWorkers();
    const workersRanges = this.getWorkersRanges();
    for (const range of workersRanges) {
      const worker = new Worker('./workers/noiseWorker.js');
      this.workers.push(worker);
      for (const {x, y, width, height} of range) {
        const imageData = this.inputCtx.getImageData(x, y, width, height);
        worker.addEventListener('message', this.createWorkerListener(x, y));
        worker.postMessage({imageData}, [imageData.data.buffer]);
      }
    }
  }

  runAnimation = () => {
    if (this.inputImg == null) {
      console.error('Before you start animation you need to provide INPUT IMAGE');
      return void 0;
    }
    if (this.aimationBtn.textContent === 'Stop animation') {
      this.aimationBtn.textContent = 'Run animation';
      this.disposeWorkers();
      return void 0;
    }
    this.aimationBtn.textContent = 'Stop animation';
    this.workers = new Array(parseInt(this.workersCount.value, 10)).fill(new Worker('./workers/noiseWorker.js'));
    const workersRanges = this.getWorkersRanges();
    const imageDate = new Array(workersRanges.length).fill([]);
    for (let i = 0; i < workersRanges.length; i++) {
      for (const {x, y, width, height} of workersRanges[i]) {
        imageDate[i].push(this.inputCtx.getImageData(x, y, width, height))
        this.workers[i].addEventListener('message', this.createAnimationWorkerListener(x, y));
      }
    }
    this.singleAnimationLoop(workersRanges, imageDate);
  }

  singleAnimationLoop = (workersRanges, imageData) => {
    for (let i = 0; i < workersRanges.length; i++) {
      for (let j = 0; j < workersRanges[i].length; j++) {
        this.workers[i]?.postMessage({
          imageData: imageData[i][j],
          amplitude: parseFloat(this.aniamtionAmplitude.value)
        });
      }
    }
    if (this.aimationBtn.textContent === 'Stop animation') {
      window.setTimeout(() => {
        requestAnimationFrame(() => this.singleAnimationLoop(workersRanges, imageData))
      }, parseInt(this.animationFrequency.value));
    }
  }

  getWorkersRanges() {
    const workersCount = parseInt(this.workersCount.value, 10);
    const workerSize = parseInt(this.pickersWrapper.childElementCount / workersCount, 10);
    const pickersProps = Array.from(this.pickersWrapper.querySelectorAll('kk-rectangle-picker')).map(picker => picker.rectangleProperties);
    const ranges = [];
    for (let i = 0; i < workersCount; i++) {
      ranges.push(pickersProps.splice(0, workerSize));
    }
    ranges[ranges.length - 1] = [...ranges[ranges.length - 1], ...pickersProps.splice(0)];
    return ranges;
  }

  disposeWorkers() {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers.length = 0;
  }

}

customElements.define('kk-noise-processor', NoiseProcessor);