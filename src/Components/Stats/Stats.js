import React, { Component } from 'react';
import axios from 'axios';
import CharacterList from './../CharacterList';
import './Stats.css';

class Stats extends Component {
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
            statpoints:30,
            
        }
        this.handleStatChange = this.handleStatChange.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            this.setState({
                team:response.data
            });
        });
    };
    handleStatChange(change, attribute, characterID){
        const {statpoints} = this.state;
        let newStatPoints = statpoints - +change;
        if (newStatPoints<=30 && newStatPoints >= 0){
            axios.patch(`/api/team/changeStat`, {change, attribute, characterID}).then( response => {
                this.setState({
                    statpoints:response.data.statpoints,
                    team:response.data.team
                });
            });
        };
    };
    render(){
        const { team, statpoints } = this.state;
        const buttons = [
            {
                name:'add strength',
                value:1,
                attribute:'strength'
            },
            {
                name:'subtract strength',
                value:-1,
                attribute:'strength'
            },
            {
                name:'add agility',
                value:1,
                attribute:'agility'
            },
            {
                name:'subtract agility',
                value:-1,
                attribute:'agility'
            },
            {
                name:'add intelligence',
                value:1,
                attribute:'intelligence'
            },
            {
                name:'subtract intelligence',
                value:-1,
                attribute:'intelligence'
            },
            {
                name:'add magic',
                value:1,
                attribute:'magic'
            },
            {
                name:'subtract magic',
                value:-1,
                attribute:'magic'
            },
            {
                name:'add charisma',
                value:1,
                attribute:'charisma'
            },
            {
                name:'subtract charisma',
                value:-1,
                attribute:'charisma'
            },
            {
                name:'add luck',
                value:1,
                attribute:'luck'
            },
            {
                name:'subtract luck',
                value:-1,
                attribute:'luck'
            },
        ]
        return(
            <div>
                <p>Stats to allocate: {statpoints}</p>
                <CharacterList
                    list={team}
                    title='Stat Allocation'
                    callbackFn = {this.handleStatChange}
                    buttons = {buttons}
                />
            </div>
        )
    }
}
export default Stats;