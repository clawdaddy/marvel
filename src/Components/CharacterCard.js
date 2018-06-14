import React, {Component} from 'react';
import './Main.css';

class CharacterCard extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const {character, callbackFn, buttons} = this.props;
        const buttonList = buttons.map( button => {
            let payload = button.value || character
            return(
                <button 
                    name={button.name} 
                    value={button.value}
                    onClick={ () => callbackFn(payload)}>
                    {button.name}
                </button>
            )
        })
        return(
            <div key={character.id} className='character-card'>
                <p>Name: {character.name}</p>
                <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}/>
                {/* <button onClick={() => callbackFn(character)}>{buttonName}</button> */}
                {buttonList}
            </div>
        )
    }
}

export default CharacterCard;