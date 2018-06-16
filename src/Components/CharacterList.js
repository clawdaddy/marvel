import React from 'react';
import './Main.css';
import CharacterCard from './CharacterCard';

function CharacterList(props){
    const {list, title, callbackFn, buttons, displayAttributes} = props;
    const characterThumbs = list.map( character=> {
        return(
            <CharacterCard
                character = {character}
                callbackFn = {callbackFn}
                buttons = {buttons}
                key={character.id}
                displayAttributes = {displayAttributes}
            />
        );
    });
    return(
        <div className='character-list' key={`list-${title}`}>
            <h2>{title}</h2>
            <div className='character-list-cards'>
                {characterThumbs}
            </div>
        </div>
    )
}
export default CharacterList;