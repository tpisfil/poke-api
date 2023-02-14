import React from 'react';

const PokeImg = ({pokemon}) => {
// console.log("WE MADE IT TO IMAGES");

    return (
        <div>
            {pokemon.map( (poke,index) => 
            <p>{poke.url}</p>
            )}
        </div>
    );
};

export default PokeImg;