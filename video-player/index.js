(function() {
    const videoSource = document.querySelector('video');
    const videosList = document.querySelectorAll('li');

    videosList.forEach(element => {
        element.addEventListener('click', () => {
            videoSource.src = element.getAttribute('data-video');
        });
    });
})();