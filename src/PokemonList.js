import React from 'react';

const PokemonList = ({pokemon}) => {
//1. destructuring pokemon from props.pokemon to use it here
//if you didnt do this you would have to type props everytime 
console.log("made it to the pokeList component"); //console log
    return (
        <div>
            {pokemon.map( (poke,index) =>
                <p key={index}>{poke.name}</p>
            )}
            {/* {console.log("finished mapping everything out")} */}
        </div>
    );
};

export default PokemonList;