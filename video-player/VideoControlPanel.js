const template = `
<section>
    <h3>Sound settings</h3>
    <div class="volume-level__modify">
        <input type="range" min="0" max="100" value="50" step="1" id="sound-modify" name="sound-modify"/>
        <label for="sound-modify">Modify</label>
    </div>
    <div class="volume-level__view">
        <input type="range" min="0" max="100" value="50" step="1" id="sound-view" name="sound-view" disabled/>
        <label for="sound-view">View</label>
    </div>
</section>
<section>
    <h3>Time settings</h3>
    <div class="time-point__modify">
        <input type="range" min="0" max="100" value="50" step="1" id="time-modify" name="time-modify"/>
        <label for="time-modify" >Modify</label>
    </div>
    <div class="time-point__view" >
        <input type="range" min="0" max="100" value="50" step="1" id="time-vie" name="time-vie" disabled/>
        <label for="time-view">View</label>
    </div>
</section>
`;

const styles = `
`;

export class VideoControlPanel extends HTMLElement {
    static TAG = 'kk-video-control-panel';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.injectStyles(styles);
    }

    injectStyles(styles) {
        const styleWrapper = document.createElement('style');
        styleWrapper.innerHTML = styles;
        this.shadowRoot.appendChild(styleWrapper);
    }
}

customElements.define(VideoControlPanel.TAG, VideoControlPanel);