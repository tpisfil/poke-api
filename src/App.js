import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";
import PokeImg from "./PokeImg";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon/?limit=9");
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();
  const [loading, setLoading] = useState(true);

  const setPages = () => {
    setLoading(true);
    let cancel; 
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setPrevPageURL(res.data.previous); 
      setNextPageURL(res.data.next);
      setPokemon(res.data.results);
    })
    return () => cancel();
    //this return will run when useEffect is invoked again
  }

  const getIndividualPokemonURL = () => {
    pokemon.map( async (poke)=> {
      const result = await axios.get(poke.url);
      console.log(result.data);
    })
  }

  // getIndividualPokemonURL();

  useEffect(() => {
    setPages();
    getIndividualPokemonURL();
    console.log("so it doenst make it here on the first run?");

  }, [currentPageURL]);
  //everytime the currentPageURL changes, this component will rerender 

  function goToNextPage(){
    setCurrentPageURL(nextPageURL)
  }
  function goToPrevPage(){
    setCurrentPageURL(prevPageURL)
  }

  if (loading) {
    return "Loading..."};
    //So this would return the Loading screen IF TRUE because the App component reaches this return statement before the other one
    //If loading is set to FALSE, that means it has finished gathering the pokemon list from the API
    //and should be able to return the below statement

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <PokeImg pokemon={pokemon}/>
      <Pagination
        goToNextPage ={nextPageURL ? goToNextPage : null}
        goToPrevPage ={prevPageURL ? goToPrevPage : null}
      />
    </>
  );
}

export default App;