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

    const initializeLitenersForMovieItem = (movieItem) => {
        setPlayVideoListener(movieItem);
        setMoveUpListener(movieItem);
        setMoveDowListener(movieItem);
        setRemoveListener(movieItem);
    }

    const createNewMovieElement = () => {
        const movieItem = document.createElement('li');
        movieItem.className = 'movie';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.name = newMovieTitle.value;
        const title = document.createElement('span');
        title.setAttribute('data-video', newMovieUrl.value);
        title.textContent = newMovieTitle.value;
        title.className = 'movie__link';
        const up = document.createElement('button');
        up.textContent = '↑';
        up.className = 'btn movie__up-button';
        const down = document.createElement('button');
        down.textContent = '↓';
        down.className = 'btn movie__down-button';
        const remove = document.createElement('button');
        remove.textContent = '✕';
        remove.className = 'btn movie__remove-button';
        movieItem.appendChild(checkbox);
        movieItem.appendChild(title);
        movieItem.appendChild(up);
        movieItem.appendChild(down);
        movieItem.appendChild(remove);
        movies.push(movieItem);
        initializeLitenersForMovieItem(movieItem);
        movieItem.setAttribute('data-index', (movies.length - 1).toString());
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';

    }

    const renderList = () => {
        playlistWrapper.innerHTML = '';
        movies.forEach((movieItem, idx) => {
            movieItem.setAttribute('data-index', idx.toString());
            playlistWrapper.appendChild(movieItem);
        });
    }

    movies.forEach(movie => initializeLitenersForMovieItem(movie));

    renderList();
})();