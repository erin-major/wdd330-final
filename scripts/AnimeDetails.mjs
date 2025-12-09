import { getLocalStorage, getRandomInt } from './utils.mjs'
import { getRandomAnime, getAnimeQuote } from './ExternalServices.mjs';

export function renderAnime(anime, buttons = true) {
    let card = document.createElement('div');
    card.className = 'animeCard';

    let title = document.createElement('h3');
    let picture = document.createElement('img');
    let watchLater = document.createElement('button');
    let archive = document.createElement('button');
    let genres = document.createElement('p');
    let synopsis = document.createElement('p');

    genres.classList.add('genres');
    synopsis.classList.add('synopsis');

    title.textContent = anime.title;
    genres.textContent = anime.genres.join(", ");
    synopsis.textContent = anime.synopsis;
    picture.setAttribute('src', anime.image);
    picture.setAttribute('loading', 'lazy');
    picture.setAttribute('alt', anime.title);
    watchLater.id = anime.id;
    watchLater.classList.add('watchLater');
    archive.id = anime.id;
    archive.classList.add('archive');

    if (inList(anime.id, 'watchLater')) {
        watchLater.innerHTML = '<i class="fa-solid fa-star"></i>';
        watchLater.title = 'Remove from watch later list';
    }
    else {
        watchLater.innerHTML = '<i class="far fa-star"></i>';
        watchLater.title = 'Add to watch later list';
    }

    if (inList(anime.id, 'archive')) {
        archive.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        archive.title = 'Mark as not watched';
    }
    else {
        archive.innerHTML = '<i class="far fa-check-circle"></i>';
        archive.title = 'Mark as watched';
    }

    card.appendChild(title);
    card.appendChild(picture);
    card.appendChild(genres);
    card.appendChild(synopsis);
    card.appendChild(watchLater);
    card.appendChild(archive);

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
            let card = renderAnime(anime, false);
            elementId.appendChild(card);
        });
    }
}

export async function displayRandomAnime() {
    let randomContainer = document.querySelector('#randomAnime');
    try {
        const random = await getRandomAnime();
        if (!random || !random.recommendations || random.recommendations.length === 0) {
            let errorMessage = document.createElement('p');
            errorMessage.innerHTML = 'Unable to load recommendations.';
            randomContainer.appendChild(errorMessage);
            return;
        }

    for (let i = 0; i < 3; i++) {
        let anime = random.recommendations[getRandomInt(random.recommendations.length)];

        let card = document.createElement('div');
        card.className = 'randomAnimeCard';

        let title = document.createElement('h3');
        let picture = document.createElement('img');

            title.textContent = anime?.liked?.title || 'Unknown title';
            picture.setAttribute('src', anime?.liked?.picture_url || '');
            picture.setAttribute('loading', 'lazy');
            picture.setAttribute('alt', anime?.liked?.title || '');

            card.appendChild(title);
            card.appendChild(picture);
            randomContainer.appendChild(card);
        }
    } catch (err) {
        console.error(err);
        let errorMessage = document.createElement('p');
        errorMessage.innerHTML = 'Unable to load recommendations.';
        randomContainer.appendChild(errorMessage);
    } finally {
        const spinner = randomContainer?.querySelector('.fa-spinner');
        if (spinner && spinner.parentElement) spinner.parentElement.removeChild(spinner);
    }
}

export async function displayAnimeQuote() {
    const quoteContainer = document.querySelector('#quote');
    try {
        const quote = await getAnimeQuote();
        if (!quote || !quote.quote) {
            let errorMessage = document.createElement('p');
            errorMessage.innerHTML = 'Unable to load quote.';
            quoteContainer.appendChild(errorMessage);
            return;
        }

        const quoteElement = document.createElement('p');
        quoteElement.classList.add('quoteText');
        const quoteAuthor = document.createElement('p');

        quoteElement.textContent = `"${quote.quote}"`;
        quoteAuthor.textContent = `- ${quote.author || 'Unknown'}`;

        quoteContainer.appendChild(quoteElement);
        quoteContainer.appendChild(quoteAuthor);
    } catch (err) {
        console.error(err);
        let errorMessage = document.createElement('p');
        errorMessage.innerHTML = 'Unable to load quote.';
        quoteContainer.appendChild(errorMessage);
    } finally {
        const spinner = quoteContainer?.querySelector('.fa-spinner');
        if (spinner && spinner.parentElement) spinner.parentElement.removeChild(spinner);
    }
}

function inList(animeId, list) {
    const existingList = getLocalStorage(list) || [];
    return existingList.find(a => a.id === animeId);
}