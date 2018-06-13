import React, { Component } from 'react';
import Axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            attributionText:'',
            characters:[
                {
                    character:'',
                    thumbnail:'',
                    thumbnailExtension:''
                }
            ]
        }
    }

    getCharacters(){
        Axios.get(`/api/getCharacters`).then( res => {
            let characters = res.data
            console.log(res)
            this.setState({
                characters
            })
        })
    }
    render(){
        const { characters } = this.state;
        const characterThumbs = characters.map( character=> {

            return(<div key={character.id}>
                <p>Name: {character.name}</p>
                <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}/>
            </div>)
        })
        return(
        <div>
            <button onClick={ () => this.getCharacters()}>GET SPIDER-MAN</button>
            {characterThumbs}
        </div>
        )
    }
}
export default Main;