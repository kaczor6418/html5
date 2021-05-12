import {ImageLoader} from './ImageLoader.js';
import {GrayscaleProcessor} from './GrayscaleProcessor.js';

const imageLoader = document.querySelector('kk-image-loader');
const grayscaleProcessor = document.querySelector('kk-grayscale-processor');
imageLoader.setOnPhotoChangeCallback((image) => {
    grayscaleProcessor.setInputImg(image);
});