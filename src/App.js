import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

    //stateless functional component, doesn't have a state so we don't need a constructor or extend React.Component
    //in this case Square previously only had 1 function : render, so we got rid of it and the "this" object in the process,
    //props gets passed in automatically
    /*
    class Square extends React.Component {
      render() {
        return (
          <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
          </button>
        );
      }
    }
    */
function Square(props) {
    return (
      //setState is a react function that changes the state of the component
      //not sure if we have to specify the entire state, or just the property in state that's getting changed
      <button className="square" onClick={() => props.onClick()}>
      {props.value}
      </button>
      // when the state is changed, the component refreshes
      );
    }

class Board extends React.Component {
      //can inline values (i) in JSX like so
      //in the Square class, can be accessed through this.props.prop_name, in this case prop_name = squares
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {

        return (
          <div>
          <div className="status">{status}</div>
          <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          </div>
          <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          </div>
          <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          </div>
          </div>
          );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                newMove: null
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        var history = this.state.history;
        var current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
            squares: squares,
            newMove: i
        }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length
      });
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) ? false : true
      });
    }

    getCoordinate(move) {
        var row;
        var column;
        if (move <= 3) {
          row = 1;
          column = move;
      } else if (move <= 6) {
          row = 2;
          column = move - 3;
      } else {
          row = 3;
          column = move - 6;
      }
      return {
          row: row,
          column: column
      };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        //step is {squares: squares}, move is index
        const moves = history.map((step, move) => {
            var desc;
            if (move) {
                var coordinates = this.getCoordinate(step.newMove + 1);
                desc = 'Move#' + move + ': (' + coordinates.row + ', ' + coordinates.column + ')';
            } else {
                desc = 'Game start';
            }

            if (move === this.state.stepNumber) {
                return (
                    <li style={{"fontWeight":"bold"}} key={move}>
                        <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                    </li>
                )
            } else {
                return (
                    <li key={move}>
                        <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                    </li>
                )
            }
        });

        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
          <div className="game">
          <div className="game-board">
          <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          </div>
          </div>
          );
    }
}

// ========================================


function calculateWinner(squares) {
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default Game;
