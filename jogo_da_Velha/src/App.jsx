import React, { useState } from 'react';
import Tabuleiro from './componentes/Tabuleiro';
import Placar from './componentes/Placar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Certifique-se de importar o Bootstrap

const tabuleiroInicial = Array(9).fill(null);

const App = () => {
  const [tabuleiro, setTabuleiro] = useState(tabuleiroInicial);
  const [proximoJogadorX, setProximoJogadorX] = useState(true); // X joga primeiro
  const [placar, setPlacar] = useState({ vitorias: 0, derrotas: 0, empates: 0 });
  const [dificuldade, setDificuldade] = useState('facil');
  const [jogoEmProgresso, setJogoEmProgresso] = useState(true); // Novo estado para controlar se o jogo está ativo

  // Função de clique para o jogador X
  const handleCliqueCelula = (index) => {
    if (tabuleiro[index] || calcularVencedor(tabuleiro) || !proximoJogadorX || !jogoEmProgresso) return;

    const novoTabuleiro = tabuleiro.slice();
    novoTabuleiro[index] = 'X';
    setTabuleiro(novoTabuleiro);
    setProximoJogadorX(false); // Passa para o computador jogar

    const vencedor = calcularVencedor(novoTabuleiro);
    if (vencedor) {
      atualizarPlacar(vencedor);
      setJogoEmProgresso(false); // Fim da rodada
    } else if (!novoTabuleiro.includes(null)) {
      setPlacar({ ...placar, empates: placar.empates + 1 });
      setJogoEmProgresso(false); // Empate
    } else {
      // Jogada do computador (O) com delay
      setTimeout(() => jogadaComputador(novoTabuleiro), 500);
    }
  };

  // Função para calcular a melhor jogada com o algoritmo Minimax
  const melhorJogadaMinimax = (tabuleiroAtual) => {
    let melhorValor = -Infinity;
    let melhorMovimento = null;

    for (let i = 0; i < tabuleiroAtual.length; i++) {
      if (tabuleiroAtual[i] === null) {
        tabuleiroAtual[i] = 'O'; // Computador joga como 'O'
        let valor = minimax(tabuleiroAtual, false);
        tabuleiroAtual[i] = null; // Desfazer a jogada
        if (valor > melhorValor) {
          melhorValor = valor;
          melhorMovimento = i;
        }
      }
    }
    return melhorMovimento;
  };

  // Algoritmo Minimax
  const minimax = (tabuleiroAtual, isMaximizing) => {
    const vencedor = calcularVencedor(tabuleiroAtual);

    // Retorna pontuação baseado no resultado
    if (vencedor === 'O') {
      return 1; // Vitória do computador
    } else if (vencedor === 'X') {
      return -1; // Vitória do jogador
    } else if (!tabuleiroAtual.includes(null)) {
      return 0; // Empate
    }

    if (isMaximizing) {
      let melhorValor = -Infinity;
      for (let i = 0; i < tabuleiroAtual.length; i++) {
        if (tabuleiroAtual[i] === null) {
          tabuleiroAtual[i] = 'O';
          let valor = minimax(tabuleiroAtual, false);
          tabuleiroAtual[i] = null;
          melhorValor = Math.max(valor, melhorValor);
        }
      }
      return melhorValor;
    } else {
      let melhorValor = Infinity;
      for (let i = 0; i < tabuleiroAtual.length; i++) {
        if (tabuleiroAtual[i] === null) {
          tabuleiroAtual[i] = 'X';
          let valor = minimax(tabuleiroAtual, true);
          tabuleiroAtual[i] = null;
          melhorValor = Math.min(valor, melhorValor);
        }
      }
      return melhorValor;
    }
  };

  // Função para a jogada do computador (O)
  const jogadaComputador = (tabuleiroAtual) => {
    let novaJogada;

    if (dificuldade === 'facil') {
      const jogadasPossiveis = tabuleiroAtual
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);
      novaJogada = jogadasPossiveis[Math.floor(Math.random() * jogadasPossiveis.length)];
    } else {
      novaJogada = melhorJogadaMinimax(tabuleiroAtual); // Usa minimax para o modo difícil
    }

    if (novaJogada !== -1) {
      const novoTabuleiro = [...tabuleiroAtual];
      novoTabuleiro[novaJogada] = 'O';
      setTabuleiro(novoTabuleiro);
      setProximoJogadorX(true); // Volta para o jogador X

      const vencedor = calcularVencedor(novoTabuleiro);
      if (vencedor) {
        atualizarPlacar(vencedor);
        setJogoEmProgresso(false); // Fim da rodada
      }
    }
  };

  // Função para calcular o vencedor
  const calcularVencedor = (squares) => {
    const linhas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Função para atualizar o placar
  const atualizarPlacar = (vencedor) => {
    const novoPlacar = { ...placar };
    if (vencedor === 'X') {
      novoPlacar.vitorias += 1;
    } else if (vencedor === 'O') {
      novoPlacar.derrotas += 1;
    }
    setPlacar(novoPlacar);
  };

  // Função para resetar o placar
  const resetarPlacar = () => {
    setPlacar({ vitorias: 0, derrotas: 0, empates: 0 });
  };

  // Função para resetar o tabuleiro e começar uma nova rodada
  const resetarJogadas = () => {
    setTabuleiro(tabuleiroInicial);
    setProximoJogadorX(true); // O jogador X começa sempre
    setJogoEmProgresso(true); // Permite que o jogo continue
  };

  // Função para selecionar a dificuldade
  const selecionarDificuldade = (nivel) => {
    setDificuldade(nivel);
  };

  return (
    <div className="app-container container text-center mt-5">
      <h1 className="title mb-4">Jogo da Velha</h1>

      {/* Botões de dificuldade */}
      <div className="botoes-dificuldade mb-3">
        <button className="btn btn-success mx-2" onClick={() => selecionarDificuldade('facil')}>Fácil</button>
        <button className="btn btn-danger mx-2" onClick={() => selecionarDificuldade('dificil')}>Difícil</button>
      </div>

      {/* Exibindo o modo de dificuldade atual */}
      <p className="dificuldade-atual my-2">Modo atual: {dificuldade === 'facil' ? 'Fácil' : 'Difícil'}</p>

      <Placar placar={placar} aoResetarPlacar={resetarPlacar} />
      <Tabuleiro tabuleiro={tabuleiro} aoCliqueCelula={handleCliqueCelula} />

      {/* Botão de resetar jogadas */}
      <div className="botoes-controle mt-4">
        <button className="btn btn-secondary" onClick={resetarJogadas}>Nova Jogo</button>
      </div>
    </div>
  );
};

export default App;
