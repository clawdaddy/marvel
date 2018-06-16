import React, { Component } from 'react';
import axios from 'axios';
import CharacterCard from './../CharacterCard';
import './Smash.css';
import {TransitionMotion, Motion, spring} from 'react-motion';

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
            currentEnemyIndex:0,
            smashing: false
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

    smashTogether(){
        this.setState({smashing:true})
    }
    smashCharacter(){
        const { currentEnemy, currentFighter, smashing } = this.state;
        let randomNum = Math.random();
        if (smashing){
            // setTimeout(() =>this.setState({smashing:false}),50)
            this.setState( () => {return {smashing:false}})
        }
        else {
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
    }
    render(){
        const {currentFighter,currentEnemy, smashing} = this.state;
        
        return(
        <div className='smash-box'>
            <div>
                <button onClick={ () => this.changeCharacter(-1, 'myTeam') }> Previous Character</button>
                <button onClick={ () => this.changeCharacter(1, 'myTeam') }>Next Character</button>
                <Motion defaultStyle={{x:0}} style={{x:spring(smashing ? 100: 0,{stiffness: 210, damping: 10})}}
                >
                    {({x}) =>{
                    return (
                    <CharacterCard
                        character={currentFighter}
                        buttons={[]}
                        displayAttributes = {true}
                        x={x}
                    />
                    )
                    }
                    }
                </Motion>

            </div>
            <button onClick={ () => this.smashTogether()}>SMASH</button>
            <div>
                <button onClick={ () => this.changeCharacter(-1, 'enemyTeam') }> Previous Character</button>
                <button onClick={ () => this.changeCharacter(1, 'enemyTeam') }>Next Character</button>
                <Motion defaultStyle={{x:0}} style={{x:spring(smashing ? -100: 0,{stiffness: 210, damping: 10})}}
                onRest={()=> this.smashCharacter()}>
                    {({x}) =>{
                    return (
                <CharacterCard
                    character={currentEnemy}
                    buttons={[]}
                    displayAttributes = {true}
                    x={x}
                />
                    )
                    }
                    }
                </Motion>
            </div>
        </div>
        )
    }
}
export default Smash;