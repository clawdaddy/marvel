let myTeam = [
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
];
let enemyTeam = [
    {
        id:2,
        name:"Green Goblin (Ultimate)",
        thumbnail:{
            path:'http://i.annihil.us/u/prod/marvel/i/mg/2/c0/4c003439f081b',
            extension:"jpg"
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
        let {character, team} = req.body;
        character.strength = 0;
        character.agility = 0;
        character.intelligence = 0;
        character.magic = 0;
        character.charisma = 0;
        character.luck = 0;
        if (team === 'myTeam'){
            myTeam.push(character)
            res.status(200).send(myTeam)
        } else {
            enemyTeam.push(character)
            res.status(200).send(enemyTeam)
        }
        
    },
    removeMember: (req, res, next) => {
        const { id } = req.params;
        const { team } = req.query;
        if (team === 'myTeam'){
            myTeam = myTeam.filter( character => character.id !== +id);
            res.status(200).send([myTeam, team]);
        } else {
            enemyTeam = enemyTeam.filter( character => character.id !== +id);
            res.status(200).send([enemyTeam, team]);
        }
        
    },
    getTeams: (req, res, next) => {
        res.status(200).send({myTeam, enemyTeam});
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