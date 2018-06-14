const md5 = require('md5');
const axios = require('axios');
const { MARVEL_PRIVATE_KEY, MARVEL_PUBLIC_KEY } = process.env;
const offset = 0;
function makeSearchString (query){
    let searchString = '';
    let keyString = '';
    for (i in query){
        keyString=`&${i}=${query[i]}`
        searchString.concat(keyString)
    }
    console.log('search string ',searchString)
}

module.exports = {
    searchCharacters: (req, res, next) => {
        const {nameStartsWith} = req.query;
        makeSearchString(req.query)
        const baseMarvelURL = 'https://gateway.marvel.com/v1/public';
        const date = Date.now()
        const hashedKeys = md5(`${date}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`)
        const keyParams = `?ts=${date}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hashedKeys}`;
        const searchString = nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : '';
        axios.get(`${baseMarvelURL}/characters${keyParams}${searchString}`).then( response => {
            res.status(200).send(response.data.data.results)
        })
    }
}