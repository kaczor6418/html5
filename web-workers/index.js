import {ImageLoader} from './ImageLoader.js';
import {GrayscaleProcessor} from './GrayscaleProcessor.js';
import {ImageColumnsHistogramProcessor} from './ImageColumnsHistogramProcessor.js';

const imageLoader = document.querySelector('kk-image-loader');
const grayscaleProcessor = document.querySelector('kk-grayscale-processor');
const imageColumnsHistogramProcessor = document.querySelector('kk-image-column-histogram');

imageLoader.setOnPhotoChangeCallback((image) => {
    grayscaleProcessor.setInputImg(image);
    imageColumnsHistogramProcessor.setInputImg(image);
});