import { useState } from 'react';
import './App.css';

function App() {
  const [tab, setTab] = useState(Array(9).fill('_'));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [vencedor, setVencedor] = useState(null);

  const checkVencedor = (Tab) => {
    const vitoria = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const v of vitoria) {
      const [a, b, c] = v;
      if (
        Tab[a] !== '_' &&
        Tab[a] === Tab[b] &&
        Tab[a] === Tab[c]
      ) {
        return Tab[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (tab[index] === '_' && !vencedor) {
      const newBoard = [...tab];
      newBoard[index] = currentPlayer;
      setTab(newBoard);



      const gameWinner = checkVencedor(newBoard);
      if (gameWinner) {
        setVencedor(gameWinner);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  return (
    <div className="game">

      <div className="text"><h1>Jogo da Velha</h1></div>
      {vencedor ? (
        <h2>O Jogador {vencedor} Venceu!</h2>
      ) : (
        <h2>Vez do jogador: {currentPlayer}</h2>
      )}
      <div className="linha">
        {tab.slice(0, 3).map((value, index) => (
          <button
            key={index}
            className="btn"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="linha">
        {tab.slice(3, 6).map((value, index) => (
          <button
            key={index + 3}
            className="btn"
            onClick={() => handleClick(index + 3)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="linha">
        {tab.slice(6, 9).map((value, index) => (
          <button
            key={index + 6}
            className="btn"
            onClick={() => handleClick(index + 6)}
          >
            {value}
          </button>
        ))}
      </div>
        <button className='btn2' onClick={() => {
          setTab(Array(9).fill('_'));
          setCurrentPlayer('X');
          setVencedor(null);
        }}>
          <h5>Jogar Novamente</h5>
        </button>
      
    </div>
  );
}

export default App;