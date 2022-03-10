import React, {useState} from "react";
import PokemonList from "./PokemonList";

function App() {

  const [pokemon, setPokemon] = useState(["bulba","squirt","char"]);

  return (
    <PokemonList pokemon={pokemon}/>
    //1. sending the current pokemon list down to PokemonList.js as a prop
  );
}

export default App;
