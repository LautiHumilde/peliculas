import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import './App.css';

const App = () => {
  const [busqueda, setBusqueda] = useState('');
  const [peliculas, setPeliculas] = useState([]);
  const [guardadas, setGuardadas] = useState([]);

  useEffect(() => {
    const guardadasLocal = JSON.parse(localStorage.getItem('guardadas')) || [];
    setGuardadas(guardadasLocal);
  }, []);

  const buscar = async () => {
    if (busqueda) {
      const res = await fetch(`http://www.omdbapi.com/?s=${busqueda}&apikey=1dd0b8f1`);
      const data = await res.json();
      setPeliculas(data.Search || []);
    }
  };

  const guardar = (pelicula) => {
    const nuevasGuardadas = [...guardadas, pelicula];
    setGuardadas(nuevasGuardadas);
    localStorage.setItem('guardadas', JSON.stringify(nuevasGuardadas));
    setPeliculas(peliculas.filter(p => p.imdbID !== pelicula.imdbID));
  };

  const quitar = (id) => {
    const restantes = guardadas.filter(p => p.imdbID !== id);
    setGuardadas(restantes);
    localStorage.setItem('guardadas', JSON.stringify(restantes));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Buscador de Películas</h1>
        <div className="search-bar">
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Busca una película..."
          />
          <button onClick={buscar}>Buscar</button>
        </div>
      </header>
      <Content
        peliculas={peliculas}
        guardadas={guardadas}
        onGuardar={guardar}
        onQuitar={quitar}
      />
    </div>
  );
};

export default App;
