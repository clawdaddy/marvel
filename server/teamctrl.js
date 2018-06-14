let team = [
    {
        id:0,
        name:'Spider-Man',
        thumbnail:{
            path:'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
            extension:'jpg'
        },
        strength:0,
        agility:0,
        intelligence:0,
        magic:0,
        charisma:0,
        luck:0
    }
]
let statpoints = 30;

module.exports = {
    addMember: (req, res, next) => {
        let {character} = req.body;
        character.strength = 0;
        character.agility = 0;
        character.intelligence = 0;
        character.magic = 0;
        character.charisma = 0;
        character.luck = 0;
        team.push(character);
        res.status(200).send(team);
    },
    removeMember: (req, res, next) => {
        const {id} = req.params;
        team = team.filter( character => character.id !== +id);
        res.status(200).send(team);
    },
    getTeam: (req, res, next) => {
        res.status(200).send(team);
    },
    changeStat:( req, res, next) => {
        const { change, attribute, characterID } = req.body;
        let character = team.filter( character => +character.id === +characterID)[0];
        if (character[attribute]>=0){
            character[attribute]+= change;
            statpoints -= change;
            let index = team.findIndex( character => +character.id === +characterID);
            team.splice(index, 1, character);
            res.status(200).send({team, statpoints});
        } else res.sendStatus(200);
        
    }
}