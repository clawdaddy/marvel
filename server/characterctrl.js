const md5 = require('md5');
const axios = require('axios');
const { MARVEL_PRIVATE_KEY, MARVEL_PUBLIC_KEY } = process.env;
const offset = 0;
let characters = [];
function makeSearchString (query){
    let keys = Object.keys(query);
    let keyStrings = keys.map( key => {
        if (query[key]){
            return `&${key}=${query[key]}`
        }
    })
    let searchString = keyStrings.join('')
    return searchString
}

module.exports = {
    searchCharacters: (req, res, next) => {
        const searchString = makeSearchString(req.query)
        const baseMarvelURL = 'https://gateway.marvel.com/v1/public';
        const date = Date.now()
        const hashedKeys = md5(`${date}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`)
        const keyParams = `?ts=${date}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hashedKeys}`;
        axios.get(`${baseMarvelURL}/characters${keyParams}${searchString}`).then( response => {
            res.status(200).send(response.data.data.results)
        })
    }
}