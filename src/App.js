import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";

function App() {

  console.log("do we reach the top of the app component?");
  const [pokemon, setPokemon] = useState([]);
  // const [pokemon, setPokemon] = useState(["bulba","squirt","char"]);
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon/?limit=150");
  const [prevPageURL, setPrevPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("loading is now true")
    let cancel; 
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log("finally finished axios");
      // console.log(res.data);
      console.log("pokemon is now: " + pokemon);
      setLoading(false);
      console.log("im assuming we leave here to re render or naw??");
      setPrevPageURL(res.data.previous); 
      setNextPageURL(res.data.next);
      setPokemon(res.data.results);
      console.log("just set poke to res so now its: " + pokemon);
    })
    return () => cancel();
    //this return will run when useEffect is invoked again
  }, [currentPageURL]);
  //everytime the currentPageURL changes, this component will rerender 

  function goToNextPage(){
    setCurrentPageURL(nextPageURL)
  }
  function goToPrevPage(){
    setCurrentPageURL(prevPageURL)
  }

  if (loading) {
    console.log("LOADING...");
    return "Loading..."};

  console.log("poke during loading" + pokemon);
  return (
    console.log("we're in the APP return statement"),
    console.log("poke that gets sent to other component is: " + pokemon),
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination
        goToNextPage ={nextPageURL ? goToNextPage : null}
        goToPrevPage ={prevPageURL ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
