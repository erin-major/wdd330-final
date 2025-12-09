import { addToList, removeFromList, getLocalStorage } from './utils.mjs';

// GitHub CoPilot wrote code to handle containerOrSelector
export function attachListClickHandler(containerOrSelector, options = {}) {
    const container = typeof containerOrSelector === 'string'
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;
    if (!container) return;

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = btn.id;
        let icon = btn.querySelector('i');
        const isSolid = icon.classList.contains('fa-solid');

        if (btn.classList.contains('archive')) {
                if (!isSolid) {
                btn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
                    btn.title = 'Mark as not watched';
                // GitHub CoPilot wrote code to get anime from list or local storage
                const animeObj = options.getAnimeById ? options.getAnimeById(id) : (
                    (getLocalStorage('watchLater') || []).concat(getLocalStorage('archive') || []).find(a => a.id === id)
                );
                if (animeObj) addToList('archive', animeObj);
            }
            else {
                btn.innerHTML = '<i class="far fa-circle-check"></i>';
                btn.title = 'Mark as watched';
                removeFromList('archive', id);
            }
        }
        else if (btn.classList.contains('watchLater')) {
            if (!isSolid) {
                btn.innerHTML = '<i class="fa-solid fa-star"></i>';
                btn.title = 'Remove from watch later list';
                // GitHub CoPilot wrote code to get anime from list or local storage
                const animeObj = options.getAnimeById ? options.getAnimeById(id) : (
                    (getLocalStorage('watchLater') || []).concat(getLocalStorage('archive') || []).find(a => a.id === id)
                );
                if (animeObj) addToList('watchLater', animeObj);
            }
            else {
                btn.innerHTML = '<i class="far fa-star"></i>';
                btn.title = 'Add to watch later list';
                removeFromList('watchLater', id);
            }
        }
    });
}
