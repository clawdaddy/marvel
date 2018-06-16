import React, { Component } from 'react';
import axios from 'axios';
import CharacterCard from './../CharacterCard';
import './Smash.css';

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
            if (myTeam.length === 0){
                alert('You need more allies!');
                this.props.history.push('/')
            } else if (enemyTeam.length === 0){
                alert('You need more enemies to assemble!');
                this.props.history.push('/')
            }
            this.setState({
                myTeam,
                enemyTeam,
                currentFighter:myTeam[0],
                currentEnemy:enemyTeam[0]
            });
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.state.myTeam.length === 0){
            alert('You need more allies!');
            this.props.history.push('/')
        } else if (this.state.enemyTeam.length === 0){
            alert('You need more enemies to assemble!');
            this.props.history.push('/')
        }
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
    smashCharacter(){
        const { currentEnemy, currentFighter } = this.state;
        let randomNum = Math.random();
        if (randomNum>0.5){
            alert(`${currentEnemy.name} got smashed!`);
            axios.delete(`/api/team/removeMember/${currentEnemy.id}?team=enemyTeam`).then( response => {
                if (response.data[0].length ===0){
                    alert(`The enemy team has been defeated!`);
                    this.props.history.push('/');
                } else {
                    this.setState({
                        enemyTeam:response.data[0],
                        currentEnemy:response.data[0][0]
                    });

                }
            });

        } else {
            alert(`${currentFighter.name} got smashed!`);
            axios.delete(`/api/team/removeMember/${currentFighter.id}?team=myTeam`).then( response => {
                if (response.data[0].length ===0){
                    alert(`Your team has been defeated!`);
                    this.props.history.push('/')
                }
                this.setState({
                    myTeam:response.data[0],
                    currentFighter:response.data[0][0]
                });
            });
        };

    }
    render(){
        const {currentFighter,currentEnemy} = this.state;
        
        return(
        <div className='smash-box'>
            <div>
                <button onClick={ () => this.changeCharacter(-1, 'myTeam') }> Previous Character</button>
                <button onClick={ () => this.changeCharacter(1, 'myTeam') }>Next Character</button>
                <CharacterCard
                    character={currentFighter}
                    buttons={[]}
                    displayAttributes = {true}
                />
            </div>
            <button onClick={ () => this.smashCharacter()}>SMASH</button>
            <div>
                <button onClick={ () => this.changeCharacter(-1, 'enemyTeam') }> Previous Character</button>
                <button onClick={ () => this.changeCharacter(1, 'enemyTeam') }>Next Character</button>
                <CharacterCard
                    character={currentEnemy}
                    buttons={[]}
                    displayAttributes = {true}
                />
            </div>
        </div>
        )
    }
}
export default Smash;