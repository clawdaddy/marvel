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

    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            this.setState({
                myTeam:response.data
            });
        });
    }
    getCharacters(){
        const { nameSearch } = this.state;
        axios.get(`/api/getCharacters/?nameSearch=${nameSearch}`).then( res => {
            let characters = res.data
            console.log(res)
            this.setState({
                characters
            })
        })
        
    }
    addTeamMember(character){
        axios.post(`/api/team/addMember`, {character}).then( response => {
            //get back whole team
            console.log(response)
            this.setState({
                myTeam:response.data
            });
        });
    };
    removeTeamMember(character){
        const {id} = character;
        axios.delete(`/api/team/removeMember/${id}`).then( response => {
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
        const addButtons = [{name:'ADD TO TEAM', value:''}];
        const removeButtons = [{name:'REMOVE FROM TEAM', value:''}]
        return(
        <div>
            <input type='text' placeholder='search names here'
                value={this.state.search}
                name='nameSearch'
                onChange={e => this.handleChange(e)}
            />
            <button onClick={ () => this.getCharacters()}>GET CHARACTERS</button>
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