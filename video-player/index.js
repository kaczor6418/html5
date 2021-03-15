(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies-wrapper');
    const addMovieButton = document.querySelector('.add-movie__button');
    const newMovieTitle = document.querySelector('#movie-title');
    const newMovieUrl = document.querySelector('#movie-url');
    const moveGroupUpButton = document.querySelector('#move-up-selected');
    const moveGroupDownButton = document.querySelector('#move-down-selected');
    const moveGroupRemoveButton = document.querySelector('#remove-selected');
    let movies = Array.from(document.querySelectorAll('.movie'));
    const selectedVideos = new Map();

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    });
    moveGroupUpButton.addEventListener('click', () => {

    });
    moveGroupDownButton.addEventListener('click', () => {
        
    });
    moveGroupRemoveButton.addEventListener('click', () => {
        for(const video of selectedVideos.values()) {
            const index = movies.findIndex(movie => movie === video);
            movies.splice(index, 1);
        }
        renderList();
    });

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
        const movieTitle = movie.querySelector('.checkbox').name;
        movies.splice(index, 1);
        selectedVideos.delete(movieTitle);
        for (let i = index; i < movies.length; i++) {
            movies[i].setAttribute('data-index', i.toString());
        }
    }

    const setAddToSelectedListener = (movie) => {
        const movieCheckbox = movie.querySelector('.checkbox');
        const itemName = movieCheckbox.name;
        movieCheckbox.addEventListener('change', ({srcElement: checkbox}) => {
            if(checkbox.getAttribute('checked') == null) {
                checkbox.setAttribute('checked', '');
                selectedVideos.set(itemName, movie);
            } else {
                checkbox.removeAttribute('checked');
                selectedVideos.delete(itemName);
            }
        });
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
        setAddToSelectedListener(movieItem);
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