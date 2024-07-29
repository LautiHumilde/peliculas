import React from 'react';
import './Content.css';

const Content = ({ peliculas, guardadas, onGuardar, onQuitar }) => (
  <main className="content">
    <div className="column">
      {peliculas.length > 0 && (
        <div className="section">
          <h2>Películas buscadas</h2>
          <div className="movie-cards">
            {peliculas.map(p => (
              <div key={p.imdbID} className="movie-card">
                <img src={p.Poster} alt={p.Title} />
                <h3>{p.Title}</h3>
                <button onClick={() => onGuardar(p)} className="save-button">
                  Guardar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <div className="column">
      {guardadas.length > 0 && (
        <div className="section">
          <h2>Películas guardadas</h2>
          <div className="movie-cards">
            {guardadas.map(p => (
              <div key={p.imdbID} className="movie-card">
                <img src={p.Poster} alt={p.Title} />
                <h3>{p.Title}</h3>
                <button onClick={() => onQuitar(p.imdbID)} className="remove-button">
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    {!peliculas.length && !guardadas.length && (
      <p>No hay películas</p>
    )}
  </main>
);

export default Content;
