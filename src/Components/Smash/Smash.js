import React, { Component } from 'react';
import axios from 'axios';
import CharacterCard from './../CharacterCard';

class Smash extends Component {
    constructor(props){
        super(props);
        this.state = {
            myTeam:[
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
            currentFighterIndex:0,
            enemyTeam:[
                {
                    id:0,
                    name:'',
                    thumbnail:{
                        path:'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                        extension:'jpg'
                    }
                }
            ],
            currentEnemy:{
                id:0,
                name:'',
                thumbnail:{
                    path:'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                    extension:'jpg'
                }
            },
            currentEnemyIndex:0
        }
    }
    componentDidMount(){
        axios.get('/api/team/getTeam').then( response => {
            const { myTeam, enemyTeam } = response.data;
            this.setState({
                myTeam,
                enemyTeam,
                currentFighter:myTeam[0],
                currentEnemy:enemyTeam[0]
            });
        });
    }
    changeCharacter(change, team){
        const { currentFighterIndex, myTeam, currentEnemyIndex, enemyTeam } = this.state;
        if (team === 'myTeam'){
            let newFighterIndex = currentFighterIndex + +change;
            let newFighter = {};
            if (newFighterIndex >=0 && newFighterIndex <myTeam.length){
                newFighter = myTeam[newFighterIndex];
                this.setState({
                    currentFighter:newFighter,
                    currentFighterIndex:newFighterIndex
                });
            }
        }
        else {
            let newEnemyIndex = currentEnemyIndex + +change;
            let newEnemy = {};
            if (newEnemyIndex >=0 && newEnemyIndex <enemyTeam.length){
                newEnemy = enemyTeam[newEnemyIndex];
                this.setState({
                    currentEnemy:newEnemy,
                    currentEnemyIndex:newEnemyIndex
                });
            }
        }
    }
    render(){
        const {currentFighter,currentEnemy} = this.state;
        
        return(
        <div>
            <button onClick={ () => this.changeCharacter(-1, 'myTeam') }> Previous Character</button>
            <button onClick={ () => this.changeCharacter(1, 'myTeam') }>Next Character</button>
            <CharacterCard
                character={currentFighter}
                buttons={[]}
            />
            <button onClick={ () => this.changeCharacter(-1, 'enemyTeam') }> Previous Character</button>
            <button onClick={ () => this.changeCharacter(1, 'enemyTeam') }>Next Character</button>
            <CharacterCard
                character={currentEnemy}
                buttons={[]}
            />
        </div>
        )
    }
}
export default Smash;