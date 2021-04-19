import {VideoControlPanel} from './VideoControlPanel.js';

const videoPlayer = document.querySelector('video');
const playlistWrapper = document.querySelector('.movies-wrapper');
const addMovieButton = document.querySelector('.add-movie__button');
const newMovieTitle = document.querySelector('#movie-title');
const newMovieUrl = document.querySelector('#movie-url');
const removeSelectedButton = document.querySelector('#remove-selected');
const selectedVideos = new Map();
let movies = Array.from(document.querySelectorAll('.movie'));

let shiftSelectCenterMovie = null;
let targetDropIndex = 0;

playlistWrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    inserMoviesInNewPlace();
    renderList();
});

playlistWrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
});

addMovieButton.addEventListener('click', (e) => {
    e.preventDefault();
    createNewMovieElement();
});

removeSelectedButton.addEventListener('click', () => {
    for(const video of selectedVideos.values()) {
        const index = movies.findIndex(movie => movie === video);
        movies.splice(index, 1);
    }
    selectedVideos.clear();
    shiftSelectCenterMovie = null;
    renderList();
});

const swapArrayElements = (arr, indexA, indexB) => [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];

const inserMoviesInNewPlace = () => {
    for(const movieName of selectedVideos.keys()) {
        const movieIndexInArr = movies.findIndex(movie => movie.querySelector('.checkbox').name === movieName);
        movies.splice(movieIndexInArr, 1);
    }
    const moviesBeforeInsert = movies.filter((_movie, idx) => idx <= targetDropIndex);
    const moviesAfterInsert = movies.filter((_movie, idx) => idx > targetDropIndex);
    movies = [...moviesBeforeInsert,  ...Array.from(selectedVideos.values()), ...moviesAfterInsert]
}

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

const selectSingleMovie = (movie, checkbox) => {
    checkbox.setAttribute('checked', '');
    selectedVideos.set(checkbox.name, movie);
}

const unSelectSingleMovie = (checkbox) => {
    checkbox.removeAttribute('checked');
    selectedVideos.delete(checkbox.name);
}

const selectUnSelectSingleMovie = (movie, checkbox) => {
    if(checkbox.getAttribute('checked') == null) {
        selectSingleMovie(movie, checkbox);
        shiftSelectCenterMovie = movie;
    } else {
        unSelectSingleMovie(checkbox);
        if(selectedVideos.size === 0) {
            shiftSelectCenterMovie = null;
        } else {
            shiftSelectCenterMovie = Array.from(selectedVideos.values())[0];
        }
    }
}

const selectUnSelectGroup = (targetIndex) => {
    if(shiftSelectCenterMovie == null) {
        return void 0;
    }
    const groupCenterIndex = Number(shiftSelectCenterMovie.getAttribute('data-index'));
    for (const singleMovie of movies) {
        const movieCheckbox = singleMovie.querySelector('.checkbox');
        const srcIndex = Number(singleMovie.getAttribute('data-index'));
        if (targetIndex > groupCenterIndex && srcIndex >= groupCenterIndex && srcIndex <= targetIndex) {
            selectSingleMovie(singleMovie, movieCheckbox);
        } else if(targetIndex < groupCenterIndex && srcIndex <= groupCenterIndex && (srcIndex >= targetIndex)) {
            selectSingleMovie(singleMovie, movieCheckbox);
        } else {
            unSelectSingleMovie(movieCheckbox);
        }
    }
}

const setCtrlAndShiftClickListeners = (movie) => {
    const checkbox = movie.querySelector('.checkbox');
    movie.addEventListener('click', ({ctrlKey, shiftKey}) => {
        if(ctrlKey && shiftKey) {
            return void 0;
        } else if(ctrlKey) {
            selectUnSelectSingleMovie(movie, checkbox);
        } else if (shiftKey) {
            selectUnSelectGroup(Number(movie.getAttribute('data-index')));
        }
    })
}

const setAddToSelectedListener = (movie) => {
    const movieCheckbox = movie.querySelector('.checkbox');
    movieCheckbox.addEventListener('change', ({srcElement: checkbox}) => {
        selectUnSelectSingleMovie(movie, checkbox);
    });
}
const setDragEventsListeners = (movie) => {
    movie.addEventListener('dragstart', (e) => {
        if(selectedVideos.size === 0) {
            selectedVideos.set(movie.querySelector('.checkbox').name, movie);
            movie.querySelector('.checkbox').setAttribute('checked', '');
        }
        e.dataTransfer.setData('text', movie.getAttribute('data-index'));
    });
    movie.addEventListener('dragenter', (e) => {
        e.dataTransfer.setData('text', movie.getAttribute('data-index'));
        targetDropIndex = Number(movie.getAttribute('data-index'));
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
    setCtrlAndShiftClickListeners(movieItem);
    setDragEventsListeners(movieItem);
    setAddToSelectedListener(movieItem);
    setPlayVideoListener(movieItem);
    setMoveUpListener(movieItem);
    setMoveDowListener(movieItem);
    setRemoveListener(movieItem);
}

const createNewMovieElement = () => {
    const movieItem = document.createElement('li');
    movieItem.className = 'movie';
    movieItem.draggable = true;
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

const videoControlPanel = new VideoControlPanel(videoPlayer);
document.body.appendChild(videoControlPanel);