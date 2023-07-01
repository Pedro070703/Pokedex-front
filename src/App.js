import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonDetails from './components/PokemonDetails';
import PokemonThumb from './components/PokemonThumb';

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getAllPokemons = async () => {
    setLoading(true);
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    const createPokemonObject = async (results) => {
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return res.json();
        })
      );

      setAllPokemons((currentList) => [...currentList, ...pokemonData]);
      setLoading(false);
    };

    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  const handleLoadMore = () => {
    getAllPokemons();
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      {!showDetails && (
        <div className="pokemon-container">
          {allPokemons.map((pokemonStats, index) => (
            <div className="pokemon-item" key={index} onClick={() => handlePokemonClick(pokemonStats)}>
              <PokemonThumb
                id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />
            </div>
          ))}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : !showDetails ? (
        <button className="load-more" onClick={handleLoadMore}>
          Load more
        </button>
      ) : (
        <div>
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button>
          <PokemonDetails pokemon={selectedPokemon} />
        </div>
      )}
    </div>
  );
};

export default App;
