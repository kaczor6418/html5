import {ImageLoader} from './components/ImageLoader.js';
import {GrayscaleProcessor} from './components/GrayscaleProcessor.js';
import {ImageColumnsHistogramProcessor} from './components/ImageColumnsHistogramProcessor.js';
import {NoiseProcessor} from './components/NoiseProcessor.js';

const imageLoader = document.querySelector('kk-image-loader');
const grayscaleProcessor = document.querySelector('kk-grayscale-processor');
const imageColumnsHistogramProcessor = document.querySelector('kk-image-column-histogram');
const noiseProcessor = document.querySelector('kk-noise-processor');

imageLoader.setOnPhotoChangeCallback((image) => {
    grayscaleProcessor.setInputImg(image);
    imageColumnsHistogramProcessor.setInputImg(image);
    noiseProcessor.setInputImg(image);
});