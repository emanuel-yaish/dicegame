import React from "react";
import GameAction from "../GameAction/GameAction";
import Dice from "../Dice/Dice";
import TotalScore from "../TotalScore/TotalScore";
import "./GamePlay.css";

class GamePlay extends React.Component {
  state = {
    currentPlayer: 1,
    dices: [1, 1],
    winnerScore: null,
    gameStarted: false,
  };

  updateWinnerScore = (newScore) => {
    this.setState({ winnerScore: newScore });
  };

  newGame = () => {
    this.props.updateCurrentScore([0, 0]);
    this.props.updateGlobalScore([0, 0]);
    this.setState({ winnerScore: null });
    this.setState({ currentPlayer: this.state.currentPlayer === 1 ? 2 : 1 });
    this.setState({ gameStarted: false });
  };

  rollDice = (dices) => {
    if (!this.state.gameStarted && !this.state.winnerScore) return;
    if (!this.state.gameStarted && this.state.winnerScore) {
      this.setState({ gameStarted: true });
    }

    const newRoll = dices.map(() => Math.floor(6 * Math.random()) + 1);
    this.setState({ dices: newRoll });

    if (newRoll[0] === 6 && newRoll[1] === 6) {
      this.props.updateCurrentScore([0, 0]);
      this.setState({ currentPlayer: this.state.currentPlayer === 1 ? 2 : 1 });
      return;
    }

    const newCurrentScore = [0, 0];
    newCurrentScore[this.state.currentPlayer - 1] =
      this.props.currentScore[this.state.currentPlayer - 1] +
      newRoll[0] +
      newRoll[1];

    this.props.updateCurrentScore(newCurrentScore);
  };
  W;

  hold = () => {
    const newGlobalScore = [
      this.props.globalScore[0],
      this.props.globalScore[1],
    ];

    newGlobalScore[this.state.currentPlayer - 1] =
      this.props.globalScore[this.state.currentPlayer - 1] +
      this.props.currentScore[this.state.currentPlayer - 1];
    this.props.updateGlobalScore(newGlobalScore);

    if (newGlobalScore[this.currentPlayer - 1] > 100) {
      // update winner title
      return;
    }

    this.setState({ currentPlayer: this.state.currentPlayer === 1 ? 2 : 1 });
    this.props.updateCurrentScore([0, 0]);
  };

  render() {
    return (
      <div className="GamePlay">
        <div className="game-play-container">
          <GameAction actionName="New Game" action={this.newGame} />
          <Dice diceNumber={this.state.dices[0]} />
          <Dice diceNumber={this.state.dices[1]} />
          <GameAction
            actionName="Roll Dice"
            action={() => this.rollDice(this.state.dices)}
          />
          <GameAction actionName="Hold" action={this.hold} />
          <TotalScore
            gameStarted={this.state.gameStarted}
            winnerScore={this.state.winnerScore}
            updateWinnerScore={this.updateWinnerScore}
          />
        </div>
      </div>
    );
  }
}

export default GamePlay;
