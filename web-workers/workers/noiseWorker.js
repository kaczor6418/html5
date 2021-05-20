const process = (pixels) => {
  for(let i = 0; i < pixels.length; i += 4) {
    if( Math.random() < 0.5) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
    }
  }
}
  
  addEventListener('message', ({ data }) => {
    process(data.imageData.data);
    postMessage(data.imageData);
  });