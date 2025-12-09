const searchUrl = "https://anime-db.p.rapidapi.com/anime"
const randomUrl = "https://myanimelist.p.rapidapi.com/v2/anime/recommendations?p=1"

export async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: 'servicesError', message: jsonResponse };
    }
}

export async function searchByTitle(page, size, title) {
    const url = `${searchUrl}?page=${page}&size=${size}&search=${title}&sortBy=title&sortOrder=asc&types=TV`
    const options = {
        method: "GET",
        headers: {
            'x-rapidapi-key': 'cb1e11498cmsh370c53a77737d25p1627d4jsnf8554f719428',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        return await fetch(`${url}`, options).then(convertToJson);
    } catch (error) {
        console.error(error);
    }
}

export async function searchByGenre(page, size, genre) {
    let firstChar = genre.charAt(0).toUpperCase();
    let remainingChar = genre.slice(1);
    genre = firstChar + remainingChar;
    console.log(genre);
    const url = `${searchUrl}?page=${page}&size=${size}&genres=${genre}&sortBy=ranking&sortOrder=asc`
    console.log(url);
    const options = {
        method: "GET",
        headers: {
            'x-rapidapi-key': 'cb1e11498cmsh370c53a77737d25p1627d4jsnf8554f719428',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        return await fetch(`${url}`, options).then(convertToJson);
    } catch (error) {
        console.error(error);
    }
}

export async function getRandomAnime() {
    const url = `${randomUrl}`
    const options = {
        method: "GET",
        headers: {
            'x-rapidapi-key': 'cb1e11498cmsh370c53a77737d25p1627d4jsnf8554f719428',
            'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
        }
    };

    try {
        return await fetch(url, options).then(convertToJson);
    } catch (error) {
        console.error(error);
        return null;
    }
}



