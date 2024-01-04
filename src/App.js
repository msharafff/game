import { useState } from "react";
import "./App.css";
import Header from "./Component/Header";
import Player from "./Component/Player";
import GameBoard from "./Component/GameBoard";
import { Winning_Cases } from "./Component/WinningCases";
import Log from "./Component/Log";
import GameOver from "./Component/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function passActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "player 1",
    O: "player 2",
  });
  let activePlayer = passActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for (const winCase of Winning_Cases) {
    const firstcell = gameBoard[winCase[0].row][winCase[0].col];
    const secondCell = gameBoard[winCase[1].row][winCase[1].col];
    const thirdCell = gameBoard[winCase[2].row][winCase[2].col];

    if (firstcell && firstcell === secondCell && firstcell === thirdCell) {
      winner = players[firstcell];
    }
  }

  let hasDraw = gameTurns.length === 9;

  function restart() {
    setGameTurns([]);
  }

  function showPlayerName(symbol, name) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  }
  function selectSquareHandler(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = passActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  return (
    <main>
      <Header />
      <div id="gameContainer">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onShowName={showPlayerName}
          />
          <Player
            initialName={"player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onShowName={showPlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={restart} />
        )}
        <GameBoard onSelectSquare={selectSquareHandler} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
