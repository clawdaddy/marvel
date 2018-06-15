import React, { Component } from 'react';
import axios from 'axios';
import CharacterCard from './../CharacterCard';

class Smash extends Component {
    constructor(props){
        super(props);
        this.state = {
            team:[
                {
                    id:0,
                    name:'',
                    thumbnail:{
                        path:'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                        extension:'jpg'
                    }
                }
            ],
            currentFighter:
                {
                    id:0,
                    name:'',
                    thumbnail:{
                        path:'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                        extension:'jpg'
                    }
                },
            currentFighterIndex:0
        }
    }
    componentDidMount(){
        axios.get('/api/team/getTeam').then( response => {
            this.setState({
                team:response.data,
                currentFighter:response.data[0]
            });
        });
    }
    changeCharacter(change){
        const { currentFighterIndex, team } = this.state;
        let newFighterIndex = currentFighterIndex + +change;
        let newFighter = {};
        if (newFighterIndex >=0 && newFighterIndex <team.length){
            newFighter = team[newFighterIndex];
            this.setState({
                currentFighter:newFighter,
                currentFighterIndex:newFighterIndex
            });
        }
    }
    render(){
        const {currentFighter} = this.state;
        
        return(
        <div>
            <button onClick={ () => this.changeCharacter(-1) }> Previous Character</button>
            <button onClick={ () => this.changeCharacter(1) }>Next Character</button>
            <CharacterCard
                character={currentFighter}
                buttons={[]}
            />
        </div>
        )
    }
}
export default Smash;