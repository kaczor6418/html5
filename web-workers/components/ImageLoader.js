import {AbstractWebComponent} from './AbstractWebComponent.js';

const template = `
<section>
  <h2>Postprocessing input</h2>
  <div>
    <label for="load-image">Choose image for postprocessing</label>
    <input id="load-image" name="photo-input" type="file" accept="image/*" />
  </div>
  <canvas id="image-input" />
</section>`;

export class ImageLoader extends AbstractWebComponent {

  constructor() {
    super(template);
    this.baseImage = new Image();
    this.getElementsReferences();
    this.setUpListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.imageCtx = this.imageInput.getContext('2d');
  }

  getElementsReferences() {
    this.loadImgBtn = this.shadowRoot.querySelector('#load-image');
    this.imageInput = this.shadowRoot.querySelector('#image-input');
  }

  setUpListeners() {
    this.loadImgBtn.addEventListener('change', () => {
      const file = this.loadImgBtn.files[0];
      this.baseImage.src = URL.createObjectURL(file);
    });

    this.baseImage.addEventListener('load', () => {
      this.imageInput.width = this.baseImage.width;
      this.imageInput.height = this.baseImage.height;
      this.imageCtx.drawImage(this.baseImage, 0, 0);
    });
  }

  setOnPhotoChangeCallback(callback) {
    this.baseImage.addEventListener('load', () => {
      callback(this.imageInput);
    });
  }

}

customElements.define('kk-image-loader', ImageLoader);