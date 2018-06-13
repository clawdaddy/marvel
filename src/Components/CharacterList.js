import React from 'react';
import './Main.css';
import CharacterCard from './CharacterCard';

function CharacterList(props){
    const {list, title, callbackFn, buttonName} = props;
    const characterThumbs = list.map( character=> {
        return(
            <CharacterCard
                character = {character}
                callbackFn = {callbackFn}
                buttonName = {buttonName}
            />
        );
    });
    return(
        <div className='character-list' key={`list-${title}`}>
            <h2>{title}</h2>
            {characterThumbs}
        </div>
    )
}
export default CharacterList;