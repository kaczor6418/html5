const process = (pixels) => {
  const colorsAverage = {
    r: 0,
    g: 0,
    b: 0
  }
  let pixelsCount = pixels.length / 4;
  for (let i = 0; i < pixels.length; i += 4) {
    colorsAverage.r += pixels[i];
    colorsAverage.g += pixels[i + 1];
    colorsAverage.b += pixels[i + 2];
  }
  colorsAverage.r = colorsAverage.r / pixelsCount;
  colorsAverage.g = colorsAverage.g / pixelsCount;
  colorsAverage.b = colorsAverage.b / pixelsCount;
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