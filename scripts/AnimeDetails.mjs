export function renderAnime(anime) {
    let card = document.createElement('div');
    card.className = 'anime-card';

    let title = document.createElement('h2');
    let watchLater = document.createElement('button');
    let watched = document.createElement('button');
    let picture = document.createElement('img');
    let genres = document.createElement('p');
    let synopsis = document.createElement('p');

    title.textContent = anime.title;
    genres.textContent = anime.genres.join(", ");
    synopsis.textContent = anime.synopsis;
    watchLater.innerHTML = '<i class="far fa-star"></i>';
    watched.innerHTML = '<i class="far fa-check-circle" ></i >';

    picture.setAttribute('src', anime.image);
    picture.setAttribute('loading', 'lazy');
    picture.setAttribute('alt', anime.title);

    card.appendChild(title);
    card.appendChild(watchLater);
    card.appendChild(watched);
    card.appendChild(picture);
    card.appendChild(genres);
    card.appendChild(synopsis);

    return card;
}      