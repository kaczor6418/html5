(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies-wrapper');
    let movies = Array.from(document.querySelectorAll('.movie'));

    const swapArrayElements = (arr, indexA, indexB) => [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];

    const moveUp = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if(oldIndex === 0) {
            return void 0;
        }
        let newIndex = oldIndex - 1;
        // movie.setAttribute('data-index', newIndex.toString());
        // movies[oldIndex + 1].setAttribute('data-index', oldIndex.toString());
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const moveDown = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if(oldIndex === movies.length - 1) {
            return void 0;
        }
        let newIndex = oldIndex + 1;
        // movie.setAttribute('data-index', newIndex);
        // movies[newIndex].setAttribute('data-index', oldIndex.toString());
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const remove = (movie) =>{
        const index = movie.getAttribute('data-index'); 
        movies.splice(index, 1);
        for (let i = index; i < movies.length; i++) {
            movies[i].setAttribute('data-index', i.toString());
        }
    }

    const setPlayVideoListener = (movie) => {
        const movieLink = movie.querySelector('.movie__link');
        addEventListener('click', () => {
            videoPlayer.src = movieLink.getAttribute('data-video');
        });
    }
    const setMoveUpListener = (movie) => movie.querySelector('.movie__up-button').addEventListener('click', () => {
        moveUp(movie);
        renderList()
    });
    const setMoveDowListener = (movie) => movie.querySelector('.movie__down-button').addEventListener('click', () => {
        moveDown(movie);
        renderList();
    });
    const setRemoveListener = (movie) => movie.querySelector('.movie__remove-button').addEventListener('click', () => {
        remove(movie);
        renderList();
    });

    const renderList = () => {
        playlistWrapper.innerHTML = '';
        movies.forEach((movieItem) => {
            setPlayVideoListener(movieItem);
            setMoveUpListener(movieItem);
            setMoveDowListener(movieItem);
            setRemoveListener(movieItem);
            playlistWrapper.appendChild(movieItem);
        });
    }

    renderList();
})();