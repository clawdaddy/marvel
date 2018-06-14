import React, { Component } from 'react';
import axios from 'axios';
import CharacterList from './../CharacterList';
import './Stats.css';

class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
            team:[],
            statpoints:30
        }
        this.handleStatChange = this.handleStatChange.bind(this)
    }
    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            this.setState({
                team:response.data
            });
        });
    }
    handleStatChange(e){
        this.setState({
            statpoints:e.target.value
        })
    }
    render(){
        const { team, statpoints } = this.state;
        const buttons = [
            {
                name:'add',
                value:1
            },
            {
                name:'subtract',
                value:-1
            }
        ]
        return(
            <div>
                <p>Stats to allocate: {statpoints}</p>
                <CharacterList
                    list={team}
                    title='Stat Allocation'
                    callbackFn = {this.handleChange}
                    buttons = {buttons}
                />
            </div>
        )
    }
}
export default Stats;