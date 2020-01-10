import React from 'react';
import logo from './logo.svg';
import './App.css';

class Board extends React.Component{
  
  renderSquare(i){
      return (
      <Square 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />
      );
  }
  
  render(){
      return(
          <div>
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

function Square(props){
  return(
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
  );
}

function calculateWiner(squares){
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
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      steNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWiner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  
  render(){
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWiner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      "Mover #" + move :
      "Inciar jogo";
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Jogo da velha do Gusta</h1>
          <img src={logo} className="App-logo" alt="logo" />
          
          <div className="game">
            <div className="game-board">
              <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(1)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>

          </div>
         
        </header>
      </div>
        
    );
  }
}

export default App;
