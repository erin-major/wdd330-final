import { searchByTitle, searchByGenre } from './ExternalServices.mjs';
import { renderAnime } from './AnimeDetails.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';

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
            console.log("form worked");
            document.querySelector('#results').innerHTML = `<i class="fa-solid fa-spinner"></i>`;
            this.handleSearch();
        });

        const resultsContainer = document.querySelector('#results');

        resultsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;  
            if (btn.className === 'watched') {
                btn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            }
            else {
                btn.innerHTML = '<i class="fa-solid fa-star"></i>';
            }
            
            this.addToList(btn.className, btn.id);
        })
    }

    handleSearch() {
        this.searchText = document.getElementById('searchInput').value.trim().toLowerCase();
        const selected = document.querySelector('input[name="searchType"]:checked');

        this.searchTitle = selected?.parentElement?.id === "titleSearch";
        this.searchGenre = selected?.parentElement?.id === "genreSearch";

        console.log("handle worked");
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
            console.log("search worked");
            this.showResults(results);
            this.results = results.data;
        } catch (err) {
            console.error(err);
        }
    }

    showResults(data) {
        const results = document.querySelector('#results');
        results.innerHTML = '';
        console.log("made it here")
        if (!data || !data.data || data.data.length === 0) {
            results.innerHTML = '<p id="emptyResults">No results found. Please try again!</p>';
            return;
        }
        data.data.forEach(item => {
            console.log("anime start")
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
}