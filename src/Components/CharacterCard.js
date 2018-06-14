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
        const {character, callbackFn, buttons} = this.props;
        const { strength, agility, intelligence, magic, charisma, luck} = this.state;
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
        const cardStyle={
            backgroundImage:`url('${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}')`,
            backgroundColor:'black',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center'
        }
        return(
            <div key={character.id} className='character-card' style={cardStyle}>
                {/* <div className='character-portrait'> */}
                <p>Name: {character.name}</p>
                    {/* <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}/> */}
                {/* </div> */}
                {/* <button onClick={() => callbackFn(character)}>{buttonName}</button> */}
                <div className='card-content'>
                    <div className='card-buttons'>
                        {buttonList}
                    </div>
                    <div className='card-stats'>
                        <p>Strength:{character.strength}</p>
                        <p>Agility:{character.agility}</p>
                        <p>Intelligence:{character.intelligence}</p>
                        <p>Magic:{character.magic}</p>
                        <p>Charisma:{character.charisma}</p>
                        <p>Luck:{character.luck}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterCard;