import React from 'react';

const PokemonThumb = ({ id, image, name, type, onClick }) => {
  return (
    <div className="pokemon-item" onClick={onClick}>
      <div className="pokemon-image">
        <img src={image} alt={name} />
      </div>
      <div className="pokemon-info">
        <p className="pokemon-id">#{id}</p>
        <h3 className="pokemon-name">{name}</h3>
        <p className="pokemon-type">Type: {type}</p>
      </div>
    </div>
  );
};

export default PokemonThumb;
