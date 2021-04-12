const template = `
<section>
    <h3>Sound settings</h3>
    <div class="volume-level__modify">
        <input type="range" min="0" max="1" value="0" step="0.01" id="sound-modify" name="sound-modify"/>
        <label for="sound-modify">Modify</label>
    </div>
    <div class="volume-level__view">
        <input type="range" min="0" max="1" value="0" step="0.01" id="sound-view" name="sound-view" disabled/>
        <label for="sound-view">View</label>
    </div>
</section>
<section>
    <h3>Time settings</h3>
    <div class="time-point__modify">
        <input type="range" min="0" max="1" value="0" step="0.01" id="time-modify" name="time-modify"/>
        <label for="time-modify" >Modify</label>
    </div>
    <div class="time-point__view" >
        <input type="range" min="0" max="1" value="0" step="0.01" id="time-view" name="time-view" disabled/>
        <label for="time-view">View</label>
    </div>
</section>
`;

const styles = `
`;

export class VideoControlPanel extends HTMLElement {
    static TAG = 'kk-video-control-panel';

    constructor(player) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.injectStyles(styles);
        this.getElementsReference();
        this.videoPlayer = player;
        this.timeSliderChange = false;
        this.videoTimeLineChange = false;
        this.setUpSynchronization(this.videoPlayer.volume, this.videoPlayer.currentTime);
        this.setUpListeners();
    }

    getElementsReference() {
        this.soundModify = this.shadowRoot.querySelector('#sound-modify');
        this.soundView = this.shadowRoot.querySelector('#sound-view');
        this.timeModify = this.shadowRoot.querySelector('#time-modify');
        this.timeView = this.shadowRoot.querySelector('#time-view');
    }

    injectStyles(styles) {
        const styleWrapper = document.createElement('style');
        styleWrapper.innerHTML = styles;
        this.shadowRoot.appendChild(styleWrapper);
    }

    setUpListeners() {
        this.soundModify.addEventListener('input', () => this.currentValuesProxy.sound = Number(this.soundModify.value));
        this.timeModify.addEventListener('input', () => {
            this.timeSliderChange = true;
            this.currentValuesProxy.time = Number(this.timeModify.value);
            this.timeSliderChange = false;
        });
        this.videoPlayer.addEventListener('volumechange', () => this.currentValuesProxy.sound = Number(this.videoPlayer.volume));
        this.videoPlayer.addEventListener('timeupdate', () => {
            this.videoTimeLineChange = true;
            this.currentValuesProxy.time = Number(this.videoPlayer.currentTime);
            this.videoTimeLineChange = false;
        })
    }

    setUpSynchronization(sound = 50, time = 0) {
        this.currentValues = {
            sound: 0,
            time: 0
        };
        this.currentValuesProxy = new Proxy(this.currentValues, {
            set: (obj, prop, value) => {
                if (prop === 'sound') {
                    this.synchronizeSound(value);
                } else if (prop === 'time') {
                    this.synchronizeTime(value);
                }
                return true;
            }
        });
        this.currentValuesProxy.sound = sound;
        this.currentValuesProxy.time = time;
    }

    synchronizeSound(value) {
        this.soundModify.value = value;
        this.soundView.value = value;
        this.videoPlayer.volume = value;
    }

    synchronizeTime(value) {
        this.timeModify.value = this.videoTimeLineChange ? this.normalizeTimeToSlider(value) : value;
        this.timeView.value = this.videoTimeLineChange ? this.normalizeTimeToSlider(value) : value;
        this.videoPlayer.currentTime =  this.timeSliderChange ? this.normalizeTimeToPlayer(value) : value;
    }

    normalizeTimeToPlayer(time) {
        return this.videoPlayer.duration * time;
    }

    normalizeTimeToSlider(time) {
        return  time / this.videoPlayer.duration;
    }
    
}

customElements.define(VideoControlPanel.TAG, VideoControlPanel);