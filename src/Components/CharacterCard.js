import React, {Component} from 'react';
import './Main.css';

class CharacterCard extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const {character, callbackFn, buttonName} = this.props;
        return(
            <div key={character.id} className='character-card'>
                <p>Name: {character.name}</p>
                <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}/>
                <button onClick={() => callbackFn(character)}>{buttonName}</button>
            </div>
        )
    }
}

export default CharacterCard;