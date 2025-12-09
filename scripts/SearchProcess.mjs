import { searchByTitle, searchByGenre } from './ExternalServices.mjs';
import { renderAnime } from './AnimeDetails.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { attachListClickHandler } from './ListActions.mjs';

export default class SearchProcess {
    constructor(outputSelector) {
        this.outputSelector = outputSelector;
        this.searchText = "";
        this.searchTitle = false;
        this.searchGenre = false;
    }

    init() {
        const form = document.querySelector(this.outputSelector);
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelector('#results').innerHTML = ``;
            let spinner = document.createElement('p');
            spinner.id = 'loadingSpinner';
            spinner.innerHTML = `<i class="fa-solid fa-spinner"></i>`;
            document.querySelector('#results').appendChild(spinner);
            this.handleSearch();
        });

        const resultsContainer = document.querySelector('#results');
        if (resultsContainer) {
            attachListClickHandler(resultsContainer, {
                getAnimeById: (id) => this.results?.find(a => a.id === id)
            });
        }
    }

    handleSearch() {
        this.searchText = document.getElementById('searchInput').value.trim().toLowerCase();
        const selected = document.querySelector('input[name="searchType"]:checked');

        this.searchTitle = selected?.parentElement?.id === "titleSearch";
        this.searchGenre = selected?.parentElement?.id === "genreSearch";

        document.querySelector('#searchInput').value = null;
        this.runSearch();
    }

    async runSearch() {
        try {
            let results;
            if (this.searchTitle) {
                results = await searchByTitle(1, 20, this.searchText);
            } else {
                results = await searchByGenre(1, 20, this.searchText);
            }
            this.showResults(results);
            this.results = results.data;
        } catch (err) {
            console.error(err);
            const results = document.querySelector('#results');
            results.innerHTML = '<p>Search failed — please try again.</p>';
        }
    }

    showResults(data) {
        const results = document.querySelector('#results');
        results.innerHTML = '';
        if (!data || !data.data || data.data.length === 0) {
            results.innerHTML = '<p id="emptyResults">No results found. Please try again!</p>';
            return;
        }
        data.data.forEach(item => {
            let card = renderAnime(item);
            results.appendChild(card);
        });
    }

    addToList(list, animeId) {
        const storingAnime = this.results?.find(a => a.id === animeId);
        const existingList = getLocalStorage(list) || [];
        if (existingList.find(a => a.id === animeId)) {
        }
        else {
            existingList.push(storingAnime);
        }
        setLocalStorage(list, existingList);
    }

    removeFromList(list, animeId) {
        const existingList = getLocalStorage(list) || [];
        const newList = existingList.filter(a => a.id !== animeId);
        setLocalStorage(list, newList);
    }
}