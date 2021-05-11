const process = (pixels) => {
  for(let i = 0; i < pixels.length; i += 4) {
    let greyscale = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    pixels[i] = greyscale;
    pixels[i + 1] = greyscale;
    pixels[i + 2] = greyscale;
  }
}

addEventListener('message', ({ data }) => {
  process(data.imageData.data);
  postMessage(data.imageData);
});