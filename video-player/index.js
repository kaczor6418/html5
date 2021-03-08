(function() {
    const videoPlayer = document.querySelector('video');
    const movies = document.querySelectorAll('.movie');

    const playVideoAfterClick = (movie) => movie.addEventListener('click', () => {
        videoPlayer.src = movie.getAttribute('data-video');
    });

    movies.forEach(movieItem => {
        playVideoAfterClick(movieItem.querySelector('.movie__link'));
    });
})();