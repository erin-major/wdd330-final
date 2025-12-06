

const factsURL = "https://anime-facts-rest-api.herokuapp.com/api/v1"
const factsAnimeURL = `${factsURL}/${anime}`;
const factsSpecificURL = `${factsURL}/${anime}/${factNumber}`;


async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: 'servicesError', message: jsonResponse };
    }
}


// export default class ExternalServices {
//     constructor(category) {
//         this.category = category;
//     }
//     async getData(category) {
//         const response = await fetch(`${baseURL}products/search/${category || this.category}`);
//         const data = await convertToJson(response);
//         return data.Result;
//     }
//     async findProductById(id) {
//         const products = await this.getData();
//         return products.find((item) => item.Id === id);
//     }

//     async checkout(payload) {
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         };
//         return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
//     }
// }


// const ipUrl = "https://api.aruljohn.com/ip/json";
// let ipAddress = null;
// let locationUrl = null;
// let lat = null;
// let long = null;
// let auroraUrl = null;
// let auroraPercent = null;
// let galleryUrl = "data/gallery.json"


// async function getIpAddress(url) {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             let data = await response.json();
//             ipAddress = data.ip;
//             locationUrl = `https://get.geojs.io/v1/ip/geo/${ipAddress}.json`;
//         }
//         else {
//             throw Error(await response.text());
//         }
//     }
//     catch (e) {
//         console.log(e);
//     }
// };

// async function getLocation(url) {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             let data = await response.json();
//             lat = data.latitude;
//             long = data.longitude;
//             auroraUrl = `https://api.auroras.live/v1/?type=all&lat=${lat}&long=${long}&forecast=false&threeday=false`;
//         }
//         else {
//             throw Error(await response.text());
//         }
//     }
//     catch (e) {
//         console.log(e);
//     }
// };

// async function getAuroraInformation(url) {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             let data = await response.json();
//             auroraPercent = data.probability.value;
//             displayViewingChance();
//         }
//         else {
//             throw Error(await response.text());
//         }
//     }
//     catch (e) {
//         console.log(e);
//     }
// };

// async function getGalleryImages(url) {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             let data = await response.json();
//             let images = data.gallery;
//             displayGallery(images);
//         }
//         else {
//             throw Error(await response.text());
//         }
//     }
//     catch (e) {
//         console.log(e);
//     }
// };