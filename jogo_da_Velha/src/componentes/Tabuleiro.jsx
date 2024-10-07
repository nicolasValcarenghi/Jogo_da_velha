import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import './Tabuleiro.css';

const Tabuleiro = ({ tabuleiro, aoCliqueCelula }) => {
  return (
    <div className="tabuleiro d-grid gap-1" style={{ gridTemplateColumns: 'repeat(3, 1fr)', width: '250px', margin: 'auto' }}>
      {tabuleiro.map((valor, index) => (
        <button
          key={index}
          className="celula btn btn-outline-secondary"
          style={{ width: '80px', height: '80px', fontSize: '28px', borderRadius: '10px', transition: 'background-color 0.3s' }}
          onClick={() => aoCliqueCelula(index)}
        >
          {valor}
        </button>
      ))}
    </div>
  );
};

export default Tabuleiro;
