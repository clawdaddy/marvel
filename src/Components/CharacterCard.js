import React, {Component} from 'react';
import './Main.css';

class CharacterCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            strength:0,
            agility:0,
            intelligence:0,
            magic:0,
            charisma:0,
            luck:0
        }
    }

    render(){
        const {character, callbackFn, buttons, displayAttributes } = this.props;
        const buttonList = buttons.map( button => {
            let payload = button.value || character
            return(
                    <button 
                        name={button.name} 
                        value={button.value}
                        onClick={ () => callbackFn(payload, button.attribute, character.id)}
                        key={button.name}
                        >
                        {button.name}
                    </button>
            )
        })
        let attributesDisplay = displayAttributes ? 'flex' : 'none';
        const cardStyle={
            backgroundImage:`url('${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}')`,
            backgroundColor:'black',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'top',
        }
        const attributesStyle = {display:attributesDisplay}
        return(
            <div key={character.id} className='character-card' style={cardStyle}>
                
                <p>{character.name}</p>
                <div className='card-content'>
                    <div className='card-stats' style ={attributesStyle}>
                        <p>Strength:{character.strength}</p>
                        <p>Agility:{character.agility}</p>
                        <p>Intelligence:{character.intelligence}</p>
                        <p>Magic:{character.magic}</p>
                        <p>Charisma:{character.charisma}</p>
                        <p>Luck:{character.luck}</p>
                    </div>
                    <div className='card-buttons'>
                        {buttonList}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default CharacterCard;