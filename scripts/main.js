import { loadHeaderFooter } from './utils.mjs';
import { getFacts } from './facts.mjs';

await loadHeaderFooter();

const menu = document.querySelector('#menu');
const navElement = document.querySelector('#nav');

menu.addEventListener('click', () => {

    if (navElement.classList.contains("open")) {
        navElement.classList.remove("open");
        navElement.classList.add("close");
        menu.classList.remove("open");
        menu.classList.add("close");
    }
    else {
        navElement.classList.remove("close");
        navElement.classList.add("open")
        menu.classList.remove("close");
        menu.classList.add("open");
    }
});

(async () => {
    try {
        const facts = await getFacts();
    } catch (e) {
        console.error("main.js error:", e);
    }
})();