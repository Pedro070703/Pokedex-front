import React from 'react';

const PokemonDetails = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types[0].type.name}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>

    </div>
  );
};

export default PokemonDetails;
