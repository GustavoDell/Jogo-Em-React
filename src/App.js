import React from 'react';
import logo from './logo.svg';
import './App.css';

class Board extends React.Component{
    
  constructor(props){
      super(props);
      this.state = {
          squares : Array(9).fill(null),
          xIsNext: true,
      };
  }

  handleClick(i){
      const squares = this.state.squares.slice();
      if(calculateWiner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
  }

  renderSquare(i){
      return (
      <Square 
        value={this.state.squares[i]}
        onClick= {() => this.handleClick(i)}
      />
      );
  }
  
  render(){
    const winner = calculateWiner(this.state.squares);
    let status;

    if(winner){
      status = "Vencedor : " + winner;
    }else{
      status = "Proximo Jogador : " + (this.state.xIsNext ? "X" : "O")
    }
      return(
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
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Jogo da velha do Gusta</h1>
          <img src={logo} className="App-logo" alt="logo" />
          
          <div className="game">
            <div className="game-board">
              <Board/>
            </div>
            <div className="game-info">
              <div>{/* Status */}</div>
              <ol>{/* TODO */}</ol>
            </div>

          </div>
         
        </header>
      </div>
        
    );
  }
}

export default App;
