importScripts('./calculateSliceAverageColor.js');

const process = (pixels) => {
  const colorsAverage = calculateSliceAverageColor(pixels);
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = colorsAverage.r;
    pixels[i + 1] = colorsAverage.g;
    pixels[i + 2] = colorsAverage.b;
  }
}

addEventListener('message', ({data}) => {
  process(data.imageData.data);
  postMessage(data.imageData);
});