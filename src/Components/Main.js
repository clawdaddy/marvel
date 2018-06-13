import React, { Component } from 'react';
import Axios from 'axios';
import './Main.css';
import CharacterList from './CharacterList';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            attributionText:'',
            characters:[
                {
                    character:'',
                    thumbnail:'',
                    thumbnailExtension:''
                }
            ],
            nameSearch:'',
            myTeam:[
                {
                    character:'',
                    thumbnail:'',
                    thumbnailExtension:''
                }
            ]
        }
        this.addTeamMember = this.addTeamMember.bind(this);
        this.removeTeamMember = this.removeTeamMember.bind(this);
    }

    getCharacters(){
        const { nameSearch } = this.state;
        Axios.get(`/api/getCharacters/?nameSearch=${nameSearch}`).then( res => {
            let characters = res.data
            console.log(res)
            this.setState({
                characters
            })
        })
    }
    addTeamMember(character){
        Axios.post(`/api/team/addMember`, {character}).then( response => {
            //get back whole team
            console.log(response)
            this.setState({
                myTeam:response.data
            });
        });
    };
    removeTeamMember(character){
        Axios.delete(`/api/team/removeMember/${character.id}`).then( response => {
            //get back team w/o member
            this.setState({
                myTeam:response.data
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
        return(
        <div>
            <h1>MARVEL SMASH</h1>
            <input type='text' placeholder='search names here'
                value={this.state.search}
                name='nameSearch'
                onChange={e => this.handleChange(e)}
            />
            <button onClick={ () => this.getCharacters()}>GET CHARACTERS</button>
            <CharacterList
                list={characters}
                title='CHARACTERS'
                callbackFn = {this.addTeamMember}
                buttonName = 'ADD TO TEAM'
            />
            <CharacterList
                list={myTeam}
                title='MY TEAM'
                callbackFn = {this.removeTeamMember}
                buttonName = 'REMOVE FROM TEAM'
            />
        </div>
        )
    }
}
export default Main;