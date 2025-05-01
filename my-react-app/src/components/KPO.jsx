import { useState } from 'react';

const options = ['Kő', 'Papír', 'Olló'];

const getResult = (player, computer) => {
  if (player === computer) return 'Döntetlen';
  if (
    (player === 'Kő' && computer === 'Olló') ||
    (player === 'Papír' && computer === 'Kő') ||
    (player === 'Olló' && computer === 'Papír')
  ) {
    return 'Nyertél!';
  }
  return 'Vesztettél!';
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const play = (choice) => {
    const random = options[Math.floor(Math.random() * options.length)];
    const outcome = getResult(choice, random);

    setPlayerChoice(choice);
    setComputerChoice(random);
    setResult(outcome);

    if (outcome === 'Nyertél!') {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (outcome === 'Vesztettél!') {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className='container'>
      <h2>Kő, Papír, Olló</h2>
      <div className='rps-options'>
        {options.map((opt) => (
          <button key={opt} onClick={() => play(opt)}>{opt}</button>
        ))}
      </div>

      {result && (
        <div className='rps-result-box'>
          <p><strong>Te választottad:</strong> {playerChoice}</p>
          <p><strong>Számítógép választotta:</strong> {computerChoice}</p>
          <p><strong>Eredmény:</strong> {result}</p>
        </div>
      )}

      <div className='rps-score'>
        <h3>Pontszám</h3>
        <p>Te: {score.player} - Gép: {score.computer}</p>
        <button className='restart' onClick={resetGame}>
          Új játék
        </button>
      </div>
    </div>
  );
}