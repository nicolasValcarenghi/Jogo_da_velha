import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import './Placar.css';

const Placar = ({ placar, aoResetarPlacar }) => {
  return (
    <div className="placar text-center mt-4">
      <h2>Placar</h2>
      <p className="lead">Vitórias: <span className="text-success">{placar.vitorias}</span></p>
      <p className="lead">Derrotas: <span className="text-danger">{placar.derrotas}</span></p>
      <p className="lead">Empates: <span className="text-warning">{placar.empates}</span></p>
      <button 
        className="btn btn-danger mt-3"
        onClick={aoResetarPlacar}
      >
        Zerar Placar
      </button>
    </div>
  );
};

export default Placar;
