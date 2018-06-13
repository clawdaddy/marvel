let team = []

module.exports = {
    addMember: (req, res, next) => {
        const {character} = req.body;
        team.push(character);
        res.status(200).send(team)
    },
    removeMember: (req, res, next) => {
        const {id} = req.params;
        team = team.filter( character => character.id !== +id)
        res.status(200).send(team)
    },
    getTeam: (req, res, next) => {
        console.log('hit')
        res.status(200).send(team)
    }
}