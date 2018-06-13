require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const md5 = require('md5');
const {
    MARVEL_PRIVATE_KEY,
    MARVEL_PUBLIC_KEY,
    SERVER_PORT
} = process.env;
const app = express();
const date = Date.now()
const hashedKeys = md5(`${date}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`)
const baseMarvelURL = 'https://gateway.marvel.com/v1/public'
const keyParams = `?ts=${date}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hashedKeys}`
app.use(bodyParser.json())

app.get(`/api/getCharacters`, (req, res, next) => {
    axios.get(`${baseMarvelURL}/characters${keyParams}`).then( response => {
        console.log(response.data.data)
        res.status(200).send(response.data.data.results)
    })
})


app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))