import React, { Component } from 'react';
import axios from 'axios';
import CharacterList from './../CharacterList';
import './Stats.css';

class Stats extends Component {
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
            statpoints:30,
            
        }
        this.handleStatChange = this.handleStatChange.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            const { myTeam, enemyTeam } = response.data;
            this.setState({
                myTeam,
                enemyTeam
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
                    myTeam:response.data.myTeam
                });
            });
        };
    };
    render(){
        const { myTeam, statpoints } = this.state;
        const buttons = [
            {
                name:'+',
                value:1,
                attribute:'strength'
            },
            {
                name:'-',
                value:-1,
                attribute:'strength'
            },
            {
                name:'+',
                value:1,
                attribute:'agility'
            },
            {
                name:'-',
                value:-1,
                attribute:'agility'
            },
            {
                name:'+',
                value:1,
                attribute:'intelligence'
            },
            {
                name:'-',
                value:-1,
                attribute:'intelligence'
            },
            {
                name:'+',
                value:1,
                attribute:'magic'
            },
            {
                name:'-',
                value:-1,
                attribute:'magic'
            },
            {
                name:'+',
                value:1,
                attribute:'charisma'
            },
            {
                name:'-',
                value:-1,
                attribute:'charisma'
            },
            {
                name:'+',
                value:1,
                attribute:'luck'
            },
            {
                name:'-',
                value:-1,
                attribute:'luck'
            },
        ]
        return(
            <div>
                <p>Stats to allocate: {statpoints}</p>
                <CharacterList
                    list={myTeam}
                    title='Stat Allocation'
                    callbackFn = {this.handleStatChange}
                    buttons = {buttons}
                    displayAttributes = {true}
                />
            </div>
        )
    }
}
export default Stats;