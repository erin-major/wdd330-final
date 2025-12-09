const searchUrl = "https://anime-db.p.rapidapi.com/anime"
const randomUrl = '/.netlify/functions/getRandomAnime'

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
    const url = `${randomUrl}?request=randomrecommendation`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error('Proxy error', response.status, data);
            return { error: data, status: response.status };
        }

        // Function returns JSON. It may contain an AniDB error or an anime object.
        if (data.error) {
            console.error('AniDB/API error:', data.error);
            return { error: data.error, raw: data.raw };
        }

        if (data.anime) {
            console.log('random anime', data.anime);
            return { aid: data.anime.aid, title: data.anime.title, raw: data.raw };
        }

        // Fallback: return raw payload
        return { raw: data.raw || data };
    } catch (error) {
        console.error('Fetch error', error);
        return { error };
    }
}





