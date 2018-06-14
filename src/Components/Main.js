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
            offset:0
        }
        this.addTeamMember = this.addTeamMember.bind(this);
        this.removeTeamMember = this.removeTeamMember.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            this.setState({
                myTeam:response.data
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
    addTeamMember(character){
        const { characters } = this.state;
        axios.post(`/api/team/addMember`, {character}).then( response => {
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
                myTeam:response.data,
                characters:newCharacters
            });
        });
    };
    removeTeamMember(character){
        const {id} = character;
        const { characters } = this.state;
        axios.delete(`/api/team/removeMember/${id}`).then( response => {
            let newCharacters = characters.map( oldCharacter  => {
                return Object.assign({}, oldCharacter)
            });
            newCharacters.push(character)
            this.setState({
                myTeam:response.data,
                characters:newCharacters
            });
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    render(){
        const { characters, myTeam } = this.state;
        const addButtons = [{name:'ADD TO TEAM', value:''}];
        const removeButtons = [{name:'REMOVE FROM TEAM', value:''}]
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
                    buttons = {removeButtons}
                />
            </div>
        </div>
        )
    }
}
export default Main;