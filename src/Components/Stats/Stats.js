import React, { Component } from 'react';
import axios from 'axios';
import CharacterList from './../CharacterList';

class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
            team:[]
        }
    }
    componentDidMount(){
        axios.get(`/api/team/getTeam`).then( response => {
            this.setState({
                team:response.data
            });
        });
    }
    render(){
        const { team } = this.state;
        return(
            <div>
                <CharacterList
                    list={team}
                    
                />
            </div>
        )
    }
}
export default Stats;