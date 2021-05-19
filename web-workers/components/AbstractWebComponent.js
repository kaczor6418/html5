let componentIdCounter = 0;

export class AbstractWebComponent extends HTMLElement {
  constructor(template, styles, props) {
    super();
    this.attachShadow({mode: 'open'});
    this.kkID = componentIdCounter++;
    this.shadowRoot.innerHTML = template;
    this.injectStyles(styles);
    this.props = props;
  }

  connectedCallback() {
    this.setObservedAttributes();
  }

  setObservedAttributes(props = this.props) {
    if (props != null) {
      for (const [key, value] of Object.entries(props)) {
        const attributeValue = (value != null && typeof value === 'object') || Array.isArray(value) ? JSON.stringify(value) : value;
        this.setAttribute(key.toLowerCase().replace('_', '-'), attributeValue);
      }
    }
  }

  injectStyles(styles) {
    if (styles != null) {
      return void 0;
    }
    const styleWrapper = document.createElement('style');
    styleWrapper.innerHTML = styles;
    this.shadowRoot.appendChild(styleWrapper);
  }
}