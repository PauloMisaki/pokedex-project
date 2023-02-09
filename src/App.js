import './App.css';
import React, { useState } from 'react';
import api from './services/api';

const App = () => {
  const[pokemon, setPokemon] = useState(null);
  const[error, setError] = useState(null);
  const[query, setQuery] = useState('');
  const[loading, setLoading] = useState(false);

  const genericHandleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    setLoading(true);
    try {
      const fetchResponse = await api.get(`/pokemon/${query}`);
      setPokemon(fetchResponse.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError('Nenhum pokémon com esse nome ou id foi encontrado');
      setLoading(false);
      setPokemon(null);
    }
  };

  return (
    <div className="App">
      <h1>Projeto Pokedex</h1>
      <p>Pesquise um pokémon pelo nome ou id</p>
      <form onSubmit={handleSubmit}>
      <input data-testid='query-input' value={query} placeholder="Digite aqui o nome ou id" onChange={genericHandleChange}/>
      <button data-testid='search-button'>
        { loading ? (
          <span>Carregando</span>
        ) : (
          <>
            Buscar
          </>
        )}
      </button>
      </form>
      {error ? <p>{error}</p> : null}
      {pokemon && (
        <div key={pokemon.id}>
          { loading ? (
            <span>Carregando</span>
          ) : (
            <div>
              <h2 className='capitalize' data-testid="pokemon-name">{pokemon.name}</h2>
              <img src={pokemon.sprites['front_default']} alt={pokemon.name}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
