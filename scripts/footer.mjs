const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');

function displayFooter() {
    const today = new Date();

    let todayFormatted = today.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    currentYear.innerHTML = `©️ ${today.getFullYear()} Aurora Explorers<br>`;
    lastModified.innerHTML = `Last Modified: ${todayFormatted}`;
};

export default displayFooter;