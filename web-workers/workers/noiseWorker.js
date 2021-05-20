importScripts('./calculateSliceAverageColor.js');

const process = (pixels, amplitude = 0.5) => {
  const {r, g, b} = calculateSliceAverageColor(pixels);
  for(let i = 0; i < pixels.length; i += 4) {
    if( Math.random() < amplitude) {
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
    }
  }
}

addEventListener('message', ({ data }) => {
  process(data.imageData.data, data.amplitude);
  postMessage(data.imageData);
});