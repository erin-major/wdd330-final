export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('public/partials/header.html');
    const headerElement = document.querySelector('#header');
    renderWithTemplate(headerTemplate, headerElement);

    const navTemplate = await loadTemplate('public/partials/nav.html');
    const navElement = document.querySelector('#nav');
    renderWithTemplate(navTemplate, navElement);

    const footerTemplate = await loadTemplate('public/partials/footer.html');
    const footerElement = document.querySelector('#footer');
    renderWithTemplate(footerTemplate, footerElement);
    getDatesInFooter();
}

function getDatesInFooter() {
    setTimeout(() => {
        const currentYear = document.querySelector('#currentyear');
        const lastModified = document.querySelector('#lastModified');

        const today = new Date();

        let todayFormatted = today.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (currentYear) currentYear.innerHTML = `&copy; ${today.getFullYear()} AniMate<br>`;
        if (lastModified) lastModified.innerHTML = `Last Modified: ${todayFormatted}`;
    }, 0);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// delete data from local storage
export function deleteLocalStorage(key) {
    localStorage.removeItem(key);
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * (max +1));
}

