import React from 'react';
import './Celula.css'; // Importa o CSS para a Célula

const Celula = ({ valor, aoClique }) => {
  return (
    <button
      className="celula"
      onClick={aoClique}
    >
      {valor}
    </button>
  );
};

export default Celula;
