import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#nav');

menu.addEventListener('click', () => {

    if (navElement.classList.contains("open")) {
        navElement.classList.remove("open");
        navElement.classList.add("close");
    }
    menu.classList.toggle("open");
    navElement.classList.toggle("open");
});