import React from 'react';

const PokemonList = ({pokemon}) => {
//1. destructuring pokemon from props.pokemon to use it here
//if you didnt do this you would have to type props everytime 
    return (
        <div>
            {pokemon.map( (poke,index) =>
                <p key={index}>{poke.name}</p>
            )}
        </div>
    );
};

export default PokemonList;