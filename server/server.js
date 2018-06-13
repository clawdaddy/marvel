require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const charctrl = require('./characterctrl');
const teamctrl = require('./teamctrl');
const {
    MARVEL_PRIVATE_KEY,
    MARVEL_PUBLIC_KEY,
    SERVER_PORT
} = process.env;
const app = express();


app.use(bodyParser.json())

/// GETTING INFORMATION FROM MARVEL API ///
app.get(`/api/getCharacters/`, charctrl.searchCharacters)

/// USER INFO ///
app.get(`/api/team/getTeam`, teamctrl.getTeam)
app.post(`/api/team/addMember`, teamctrl.addMember);
app.delete(`/api/team/removeMember/:id`, teamctrl.removeMember);

app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))