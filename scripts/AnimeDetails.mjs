import { getLocalStorage } from './utils.mjs'

export function renderAnime(anime, buttons = true) {
    let card = document.createElement('div');
    card.className = 'anime-card';

    let title = document.createElement('h2');
    let picture = document.createElement('img');
    let genres = document.createElement('p');
    let synopsis = document.createElement('p');

    title.textContent = anime.title;
    genres.textContent = anime.genres.join(", ");
    synopsis.textContent = anime.synopsis;
    picture.setAttribute('src', anime.image);
    picture.setAttribute('loading', 'lazy');
    picture.setAttribute('alt', anime.title);

    card.appendChild(title);
    card.appendChild(picture);
    card.appendChild(genres);
    card.appendChild(synopsis);

    if (buttons) {
        let watchLater = document.createElement('button');
        let watched = document.createElement('button');
        watchLater.innerHTML = '<i class="far fa-star"></i>';
        watchLater.id = anime.id;
        watchLater.title = 'Add to watch later list';
        watchLater.classList.add('watchLater');
        watched.innerHTML = '<i class="far fa-check-circle" ></i >';
        watched.id = anime.id;
        watched.title = 'Mark as watched';
        watched.classList.add('watched');
        card.appendChild(watchLater);
        card.appendChild(watched);
    }

    return card;
}

export function displayListOfAnime(list, elementId) {
    const existingList = getLocalStorage(list) || [];

    if (existingList.length === 0) {
        let empty = document.createElement('p');
        empty.classList.add('emptyList');
        empty.textContent = 'You have no items in your list.';
        elementId.appendChild(empty);
    }

    else {
        existingList.forEach(anime => {
            console.log("display start...")
            let card = renderAnime(anime, false);
            elementId.appendChild(card);
        });
    }
}