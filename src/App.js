import React, { Component } from 'react';
import './App.css';

let level = 2 * 2;

class App extends Component {

  constructor() {
    super();
    
    this.state = {
      squares: [],
      player: "white",
      status: "Player: white",
      count: 0,
      matchStarted: false,
      matchEnd: false,
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.pass = this.pass.bind(this);
    this.surrender = this.surrender.bind(this);
    this.matchStart = this.matchStart.bind(this);
  }

  changePlayer(player) {
      this.setState({player: player});
  }
  
  handleClick(low, column, disk) {
    // alert(low + " " +  column + " " + disk);
    // return false;
    const squares = this.state.squares;
    let reversedDisk = squares;
    const player = this.state.player;

    if (this.state.matchEnd) {
      return false;
    }

    if (disk === "none") {
      let ifChanged = false;

      // 正の方向のcolumn
      if (column < level + 1) {
        if (squares[low][column + 1] !== "none" && squares[low][column + 1] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          for (let i = column + 1; i < level + 2; i++) {
            if (temporaryReversedDisk[low][i] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[low][i] !== "none") {
              temporaryReversedDisk[low][i] = player;
            } else {
              break;
            }
          }
        }
      }

      // 負の方向のcolumn
      if (column > 0) {
        if (squares[low][column - 1] !== "none" && squares[low][column - 1] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          for (let i = column - 1; i >= 0; i--) {
            if (temporaryReversedDisk[low][i] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[low][i] !== "none") {
              temporaryReversedDisk[low][i] = player;
            } else {
              break;
            }
          }
        }
      }

      // 正の方向のlow
      if (low < level + 1) {
        if (squares[low + 1][column] !== "none" && squares[low + 1][column] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          for (let i = low + 1; i < level + 2; i++) {
            if (temporaryReversedDisk[i][column] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[i][column] !== "none") {
              temporaryReversedDisk[i][column] = player;
            } else {
              break;
            }
          }
        }
      }

      // 負の方向のlow
      if (low > 0) {
        if (squares[low - 1][column] !== "none" && squares[low - 1][column] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          for (let i = low - 1; i >= 0; i--) {
            if (temporaryReversedDisk[i][column] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[i][column] !== "none") {
              temporaryReversedDisk[i][column] = player;
            } else {
              break;
            }
          }
        }
      }

      // 以下斜め方向
      if (low < level + 1 && column < level + 1) {
        if (squares[low + 1][column + 1] !== "none" && squares[low + 1][column + 1] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          let ii = low + 1;
          for (let i = column + 1; i < level + 2; i++) {
            if (ii >= level + 1) {break;}
            if (temporaryReversedDisk[ii][i] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[ii][i] !== "none") {
              temporaryReversedDisk[ii][i] = player;
              ii++;
            } else {
              break;
            }
          }
        }
      }

      if (low > 0 && column < level + 1) {
        if (squares[low - 1][column + 1] !== "none" && squares[low - 1][column + 1] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          let ii = low - 1;
          for (let i = column + 1; i < level + 2; i++) {
            if (ii <= 0) { break; }
            if (temporaryReversedDisk[ii][i] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[ii][i] !== "none") {
              temporaryReversedDisk[ii][i] = player;
              ii--;
            } else {
              break;
            }
          }
        }
      }

      if (column > 0 && low < level + 1) {
        if (squares[low + 1][column - 1] !== "none" && squares[low + 1][column - 1] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          let ii = low + 1;
          for (let i = column - 1; i > 0; i--) {
            if (ii >= level + 1) { break; }
            if (temporaryReversedDisk[ii][i] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[ii][i] !== "none") {
              temporaryReversedDisk[ii][i] = player;
              ii++;
            } else {
              break;
            }
          }
        }
      }

      if (column > 0 && low > 0) {
        if (squares[low - 1][column - 1] !== "none" && squares[low - 1][column - 1] !== player) {
          let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
          let ii = low - 1;
          for (let i = column - 1; i > 0; i--) {
            if (ii <= 0) { break; }
            if (temporaryReversedDisk[ii][i] === player) {
              // 石を裏返す処理
              reversedDisk = temporaryReversedDisk;
              ifChanged = true;
              break;
            } else if (temporaryReversedDisk[ii][i] !== "none") {
              temporaryReversedDisk[ii][i] = player;
              ii--;
            } else {
              break;
            }
          }
        }
      }

      // 石を打てない場合に終了
      if (ifChanged === false) {
        return false;
      }
      // 石を打つ処理
      let temporaryReversedDisk = JSON.parse(JSON.stringify(reversedDisk));;
      if (player === "white") {
        temporaryReversedDisk[low][column] = "white";
        this.changePlayer("black");
        this.setState({ status: "Player: black" });
      } else {
        temporaryReversedDisk[low][column] = "black";
        this.changePlayer("white");
        this.setState({ status: "Player: white" });
      }
      this.setState({ squares: temporaryReversedDisk });

      // ゲームエンドの判定
      this.judge();

    } else {
      return false;
    }
  }

  pass() {
    if (this.state.player === "white") {
      this.setState({ player: "black" });
      this.setState({ status: "Player: black" });
    } else {
      this.setState({ player: "white" });
      this.setState({ status: "Player: white" });
    }
  }

  surrender() {
    if (this.state.player === "white") {
      this.judge("black");
    } else {
      this.judge("white");
    }
  }

  judge(player) {
    if (!player && this.state.count < ((level + 2) ** 2) - 5) {
      let count = this.state.count;
      count++;
      this.setState({ count: count });
      return false;
    }
    let winner;
    if (player) {
      winner = player;
    }
    let whites = 0;
    let squares = JSON.parse(JSON.stringify(this.state.squares));
    squares.forEach(e => {
      e.forEach(ee => {
        if (ee === "none") {
          return false;
        } else if (ee === "white") {
          whites++;
        }
      });
    });
    if (whites > ((level + 2) ** 2) / 2) {
      winner = "white";
    } else if (whites === ((level + 2) ** 2) / 2) {
      winner ="draw";
    } else {
      winner = "black";
    }

    this.setState({ status: "Win: " + winner });
    this.setState({ matchEnd: true });
  }

  matchStart() {
    let squares = [];
    for (let i = 1; i < level + 3; i++) {
      squares.push(Array(level + 2).fill("none"));
    }

    const defaultDisk1 = level / 2;
    const defaultDisk2 = level / 2 + 1;

    squares[defaultDisk1][defaultDisk1] = "white";
    squares[defaultDisk2][defaultDisk2] = "white";
    squares[defaultDisk1][defaultDisk2] = "black";
    squares[defaultDisk2][defaultDisk1] = "black";

    this.setState({ squares: squares });

    this.setState({ matchStarted: true });
  }

  onChange(e) {
    level = e.target.value * 2;
  }

  render() {
    const style = {width: 100 * (level + 2)};
    let className = "text-" + this.state.player;
    if (!this.state.matchStarted) {
      return (
        <div className="container">
          <div className="start-menu">
            <MatchStart handleClick={this.matchStart} />
            <input id="level" type="range" min="1" max="4" defaultValue="2" onChange={this.onChange.bind(this)}></input>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p className={className}>{this.state.status}</p>
          <Pass handleClick={this.pass} />
          <Surrender handleClick={this.surrender} />
          <div className="container" style={style}>
            <Board squares={this.state.squares} player={this.state.player} handleClick={this.handleClick} changePlayer={this.changePlayer} />
          </div>
        </div>
      );
    }
  }
}

const MatchStart = props => {
  return (
    <div>
      <button onClick={() => props.handleClick()}>Match Start</button>
    </div>
  );
}

const Pass = props => {
  return (
    <button onClick={() => props.handleClick()}>Pass</button>
  );
}

const Surrender = props => {
  return (
    <button onClick={() => props.handleClick()}>Surrender</button>
  );
}

const Board = props =>  {

  let squares = [];
  
  for (let i = 0; i < level+2; i++) {
    let squaresLow = [];
  
      for (let ii = 0; ii < level+2; ii++) {
        let diskState = props.squares;
        let low = diskState[i];

        squaresLow.push(
          <Square key={ii} disk={low[ii]} handleClick={() => props.handleClick(i, ii, low[ii])} />
        );

      }
    
      const className = "squares-low " + i;
      squares.push(
        <div key={"low" + i} className={className}>
          {squaresLow}
        </div>
      );
  }

  return (
    <div>
      {squares}
    </div>
  );

}

const Square = props => {
  const className= "square " + props.className;

  if (props.disk === "none") {
    return (
      <div className={className} onClick={() => props.handleClick()}>
      </div>
    );
  } else if (props.disk === "black") {
    return (
      <div className={className} onClick={() => props.handleClick()}>
        <Disk className="reversed" />
      </div>
    );
  } else {
    return (
      <div className={className} onClick={props.handleClick}>
        <Disk className="" />
      </div>
    );
  }
}

const Disk = props => {
  const className = "disk " + props.className;
  return (
    <div className={className}>
      <div className="white">
      </div>
      <div className="black">
      </div>
    </div>
  );
}

export default App;
