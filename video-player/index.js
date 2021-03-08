(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies-wrapper');
    const addMovieButton = document.querySelector('.add-movie__button');
    const newMovieTitle = document.querySelector('#movie-title');
    const newMovieUrl = document.querySelector('#movie-url');
    let movies = Array.from(document.querySelectorAll('.movie'));

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })

    const swapArrayElements = (arr, indexA, indexB) => [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];

    const moveUp = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if(oldIndex === 0) {
            return void 0;
        }
        let newIndex = oldIndex - 1;
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const moveDown = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if(oldIndex === movies.length - 1) {
            return void 0;
        }
        let newIndex = oldIndex + 1;
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
        movieLink.addEventListener('click', () => {
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

    const initializeLitenersForMovieItem = (movieItem, idx) => {
        movieItem.setAttribute('data-index', idx.toString());
        setPlayVideoListener(movieItem);
        setMoveUpListener(movieItem);
        setMoveDowListener(movieItem);
        setRemoveListener(movieItem);
        playlistWrapper.appendChild(movieItem);
    }

    const createNewMovieElement = () => {
        const movieItem = document.createElement('li');
        const title = document.createElement('span');
        title.setAttribute('data-video', newMovieUrl.value);
        title.textContent = newMovieTitle.value;
        title.className = 'movie__link';
        const up = document.createElement('button');
        up.textContent = '↑';
        up.className = 'movie__up-button';
        const down = document.createElement('button');
        down.textContent = '↓';
        down.className = 'movie__down-button';
        const remove = document.createElement('button');
        remove.textContent = 'Remove';
        remove.className = 'movie__remove-button';
        movieItem.appendChild(title);
        movieItem.appendChild(up);
        movieItem.appendChild(down);
        movieItem.appendChild(remove);
        movies.push(movieItem);
        initializeLitenersForMovieItem(movieItem, movies.length - 1);
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';

    }

    const renderList = () => {
        playlistWrapper.innerHTML = '';
        movies.forEach((movieItem, idx) => {
            initializeLitenersForMovieItem(movieItem, idx);
        });
    }

    renderList();
})();