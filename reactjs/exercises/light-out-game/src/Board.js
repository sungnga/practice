import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
class Board extends Component {
	static defaultProps = {
		nRows: 5,
		nCols: 5,
		changeLightStartsOn: 0.25,
	};
	constructor(props) {
		super(props);
		// TODO: set initial state
		this.state = {
			hasWon: false,
			board: this.createBoard(),
		};
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	createBoard() {
		let board = [];
		// TODO: create array-of-arrays of true/false values
		for (let y = 0; y < this.props.nRows; y++) {
			let row = [];
			for (let x = 0; x < this.props.nCols; x++) {
				row.push(Math.random() < this.props.changeLightStartsOn);
			}
			board.push(row);
		}
		return board;
	}

	/** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    // console.log('flipping', coord)
    let { nCols, nRows } = this.props;
    // Step 0: Board is the current state board
		let board = this.state.board;
		let [y, x] = coord.split('-').map(Number);
    
    // A function to flip the cell(at the coordinate of the board) to the opposite
		function flipCell(y, x) {
			// if this coord is actually on board, flip it
			if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
			}
    }
    // Step 1: Flip this cell (the cell you click on) and neighbor cells
    // By calling the flipCell function, the cell will turn true to false and vise versa
    flipCell(y, x)
    flipCell(y, x - 1) //left cell
    flipCell(y, x + 1) //right cell
    flipCell(y + 1, x) //cell above
    flipCell(y - 1, x) //cell below
        
		// Step 2: Determine if the game has been won
    // win when every cell is turned off
    // Alternative way of using a for loop to loop thru each rows and cols of the board
    // Check to see if each cell is false
    // So, every row in every cell should be false
    let hasWon = board.every(row => row.every(cell => !cell));
		this.setState({board, hasWon});
	}

	/** Render game board or winning message. */
	render() {
    // if the game is won, just show a winning msg & render nothing else
    // If this condition is met, RETURN EARLY. Render the message
    // EARLY RETURN means the rest of the code will not run, thus the table board will disappear
    if (this.state.hasWon) {
      return (
        <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>
        </div>
      )
    }
		// make table board
		let tblBoard = [];
		for (let y = 0; y < this.props.nRows; y++) {
			let row = [];
			for (let x = 0; x < this.props.nCols; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						isLit={this.state.board[y][x]}
						flipCellsAroundMe={() => this.flipCellsAround(coord)}
					/>
				);
			}
			tblBoard.push(<tr key={y}>{row}</tr>);
		}
		return (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className='Board'>
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
		);
	}
}

export default Board;
