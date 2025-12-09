import { searchByTitle, searchByGenre } from './ExternalServices.mjs';
import { renderAnime } from './AnimeDetails.mjs';

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
            this.handleSearch();
        });
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
                results = await searchByTitle(1, 10, this.searchText);
            } else {
                results = await searchByGenre(1, 10, this.searchText);
            }
            console.log("search worked");
            this.showResults(results);
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

}