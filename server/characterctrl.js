const md5 = require('md5');
const axios = require('axios');
const { MARVEL_PRIVATE_KEY, MARVEL_PUBLIC_KEY } = process.env;

module.exports = {
    searchCharacters: (req, res, next) => {
        const {nameSearch} = req.query;
        const baseMarvelURL = 'https://gateway.marvel.com/v1/public';
        const date = Date.now()
        const hashedKeys = md5(`${date}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`)
        const keyParams = `?ts=${date}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hashedKeys}`;
        const searchString = nameSearch ? `&nameStartsWith=${nameSearch}` : '';
        console.log('hit')
        axios.get(`${baseMarvelURL}/characters${keyParams}${searchString}`).then( response => {
            console.log(response.data.data)
            res.status(200).send(response.data.data.results)
        })
    }
}