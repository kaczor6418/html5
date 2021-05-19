import {AbstractWebComponent} from './AbstractWebComponent.js';

const template = `
<div>
  <div>
    <label for="x">Position x:</label>
    <input type="number" id="x" name="x" placeholder="Enter x position of left top corner"/>
  </div>
  <div>
    <label for="y">Position y:</label>
    <input type="number" id="y" name="y" placeholder="Enter y position of left top corner"/>
  </div>
  <div>
    <label for="width">Width:</label>
    <input type="number" id="width" name="width" placeholder="Enter rectangle width"/>
  </div>
  <div>
    <label for="height">Height:</label>
    <input type="number" id="height" name="height" placeholder="Enter rectangle height"/>
  </div>
  <button id="remove">Remove</button>
</div>
`

export class RectanglePicker extends AbstractWebComponent {

  constructor() {
    super(template);
    this.getElementsReferences();
    this.setUpListeners();
  }

  get xPosition() {
    return parseInt(this.rectangleXPosition.value);
  }

  get yPosition() {
    return parseInt(this.rectangleYPosition.value);
  }

  get totalWidth() {
    return parseInt(this.rectangleWidth.value);
  }

  get totalHeight() {
    return parseInt(this.rectangleHeight.value);
  }

  get rectangleProperties() {
    return {
      x: this.xPosition,
      y: this.yPosition,
      width: this.totalWidth,
      height: this.totalHeight
    }
  }

  getElementsReferences() {
    this.rectangleXPosition = this.shadowRoot.querySelector('#x');
    this.rectangleYPosition = this.shadowRoot.querySelector('#y');
    this.rectangleWidth = this.shadowRoot.querySelector('#width');
    this.rectangleHeight = this.shadowRoot.querySelector('#height');
    this.removeBtn = this.shadowRoot.querySelector('#remove');
  }

  setUpListeners() {
    this.removeBtn.addEventListener('click', () => this.remove());
  }

}

customElements.define('kk-rectangle-picker', RectanglePicker);