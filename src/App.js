import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import axios from "axios";

function App() {

  const [pokemon, setPokemon] = useState(["bulba","squirt","char"]);
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon/?limit=50");
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();

  useEffect(() => {
    axios.get(currentPageURL).then(res => {
      console.log(res.data);
      setPokemon(res.data.results);
      setPrevPageURL(res.data.previous);
      setNextPageURL(res.data.next);
    })
    // return () => {
    //   cleanup
    // }
  }, [currentPageURL]);
  //everytime the currentPageURL changes, this component will rerender 

  return (
    <PokemonList pokemon={pokemon}/>
    //1. sending the current pokemon list down to PokemonList.js as a prop
  );
}

export default App;
