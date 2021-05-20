importScripts('./calculateSliceAverageColor.js');

const process = (pixels) => {
  const {r, g, b} = calculateSliceAverageColor(pixels);
  for(let i = 0; i < pixels.length; i += 4) {
    if( Math.random() < 0.5) {
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
    }
  }
}

  addEventListener('message', ({ data }) => {
    process(data.imageData.data);
    postMessage(data.imageData);
  });