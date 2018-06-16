import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import CharacterList from './CharacterList';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            attributionText:'',
            characters:[
                {
                    id:1,
                    name:'Hulk',
                    thumbnail:{
                        path:'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
                        extension:'jpg'
                    }
                }
            ],
            nameStartsWith:'',
            myTeam:[
                {
                    id:0,
                    name:'Spider-Man',
                    thumbnail:{
                        path:'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
                        extension:'jpg'
                    }
                }
            ],
            enemyTeam:[
                {
                    id:5,
                    name:"Green Goblin (Ultimate)",
                    thumbnail:{
                        path:'http://i.annihil.us/u/prod/marvel/i/mg/2/c0/4c003439f081b',
                        extension:"jpg"
                        },
                }
            ],
            offset:0,
        }
        this.addTeamMember = this.addTeamMember.bind(this);
        this.removeTeamMember = this.removeTeamMember.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            const { myTeam, enemyTeam } = response.data;
            this.setState({
                myTeam,
                enemyTeam
            });
        });
    }
    getCharacters(changeOffset=0){
        const { nameStartsWith, offset } = this.state;
        let newOffset;
            newOffset = offset + changeOffset;
            if (newOffset<0){
                newOffset = 0;
            }
        axios.get(`/api/getCharacters/?nameStartsWith=${nameStartsWith}&offset=${newOffset}&limit=9`).then( res => {
            let characters = res.data
            console.log(res)
            this.setState({
                characters,
                offset: newOffset
            })
        })
        
    }
    addTeamMember(character, team){
        const { characters } = this.state;
        axios.post(`/api/team/addMember`, {character, team}).then( response => {
            //get back whole team
            let index = -1;
            let newCharacters = characters.map( (oldCharacter,i) => {
                if (oldCharacter.id === character.id){
                    index = i;
                }
                return Object.assign({}, oldCharacter)
            });
            newCharacters.splice(index,1)
            this.setState({
                [team]:response.data,
                characters:newCharacters
            });
        });
    };
    removeTeamMember(character, team){
        const {id} = character;
        const { characters } = this.state;
        axios.delete(`/api/team/removeMember/${id}?team=${team}`).then( response => {
            let newCharacters = characters.map( oldCharacter  => {
                return Object.assign({}, oldCharacter)
            });
            newCharacters.push(character)
            if (response.data[1] === 'myTeam'){
                this.setState({
                    myTeam:response.data[0],
                    characters:newCharacters
                });
            } else {
                this.setState({
                    enemyTeam:response.data[0],
                    characters:newCharacters
                })
            }
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    render(){
        const { characters, myTeam, enemyTeam } = this.state;
        const addButtons = [
                {
                    name:'ADD TO MY TEAM', 
                    value:'', 
                    attribute:'myTeam'
                },
                {
                    name:'ADD TO ENEMY TEAM',
                    value:'',
                    attribute:'enemyTeam'
                }
            ];
        const removeMyTeamButtons = [{name:'REMOVE FROM TEAM', value:'',attribute:'myTeam'}]
        const removeEnemyTeamButtons = [{name:'REMOVE FROM TEAM', value:'', attribute:'enemyTeam'}]
        return(
        <div>
            <input type='text' placeholder='search names here'
                value={this.state.search}
                name='nameStartsWith'
                onChange={e => this.handleChange(e)}
            />
            <button onClick={ () => this.getCharacters()}>GET CHARACTERS</button>
            <button onClick={ () => this.getCharacters(-9)}>Previous 9</button>
            <button onClick={ () => this.getCharacters(9)}>Next 9</button>
            <div className='lists'>
                <CharacterList
                    list={characters}
                    title='CHARACTERS'
                    callbackFn = {this.addTeamMember}
                    buttons = {addButtons}
                />
                <CharacterList
                    list={myTeam}
                    title='MY TEAM'
                    callbackFn = {this.removeTeamMember}
                    buttons = {removeMyTeamButtons}
                />
                <CharacterList
                    list={enemyTeam}
                    title='ENEMY TEAM'
                    callbackFn={this.removeTeamMember}
                    buttons = {removeEnemyTeamButtons}
                />
            </div>
        </div>
        )
    }
}
export default Main;