const photoInput = document.querySelector('#photo-input');
const imagePreviewCtx = document.querySelector('#image-preview').getContext('2d');
imagePreviewCtx.fillStyle = 'black';
imagePreviewCtx.width = 720;
imagePreviewCtx.height = 480;
imagePreviewCtx.fillRect(0, 0, imagePreviewCtx.width, imagePreviewCtx.height);

photoInput.addEventListener('change', async (e) => {
    const file = photoInput.files[0];
    const baseImage = new Image();
    baseImage.src = URL.createObjectURL(file);
    baseImage.onload = () => {
        imagePreviewCtx.drawImage(baseImage, 0, 0);
    }
});