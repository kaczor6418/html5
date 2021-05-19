const process = (pixels) => {
  const colorsAverrage = {
    r: 0,
    g: 0,
    b: 0
  }
  let pixelsCount = pixels.length / 4;
  for(let i = 0; i < pixels.length; i += 4) {
    colorsAverrage.r += pixels[i];
    colorsAverrage.g += pixels[i + 1];
    colorsAverrage.b += pixels[i + 2];
  }
  colorsAverrage.r = colorsAverrage.r / pixelsCount;
  colorsAverrage.g = colorsAverrage.g / pixelsCount;
  colorsAverrage.b = colorsAverrage.b / pixelsCount;
  for(let i = 0; i < pixels.length; i += 4) {
    pixels[i] = colorsAverrage.r;
    pixels[i + 1] = colorsAverrage.g;
    pixels[i + 2] = colorsAverrage.b;
  }
}

addEventListener('message', ({ data }) => {
  process(data.imageData.data);
  postMessage(data.imageData);
});