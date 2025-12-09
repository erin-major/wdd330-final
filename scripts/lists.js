import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import { displayListOfAnime } from './AnimeDetails.mjs';
import { attachListClickHandler } from './ListActions.mjs';

await loadHeaderFooter();

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#nav');
const header = document.querySelector('#header');
const watchList = document.querySelector('#watchlist');
const archive = document.querySelector('#archive');

menu.addEventListener('click', () => {

    if (navElement.classList.contains("open")) {
        navElement.classList.remove("open");
        navElement.classList.add("close");
        menu.classList.remove("open");
        menu.classList.add("close");
        if (header) header.classList.remove('nav-open');
    }
    else {
        navElement.classList.remove("close");
        navElement.classList.add("open")
        menu.classList.remove("close");
        menu.classList.add("open");
        if (header) header.classList.add('nav-open');
    }
});

displayListOfAnime('archive', archive);
displayListOfAnime('watchLater', watchList);

attachListClickHandler(archive);
attachListClickHandler(watchList);