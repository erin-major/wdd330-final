const searchUrl = "https://anime-db.p.rapidapi.com/anime"

export async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: 'servicesError', message: jsonResponse };
    }
}

export async function searchByTitle(page, size, title) {
    const url = `${searchUrl}?page=${page}&size=${size}&search=${title}&sortBy=ranking&sortOrder=asc`
    
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
    const url = `${searchUrl}?page=${page}&size=${size}&genre=${genre}&sortBy=ranking&sortOrder=asc`

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




