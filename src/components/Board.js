import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
    constructor(props) {
        super(props);
        this.createBoard = this.createBoard.bind(this);
    }

    createBoard(row, col) {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const row = [];
            for (let j = 0; j < col; j += 1) {
                row.push(this.renderCard(cellCounter++));
            }
            board.push(<div key={i} className="board-row d-flex">{row}</div>);
        }

        return board;
    }

    renderCard(i) {
        return (
            <Card
                key={i}
                data={this.props.cards[i]}
                isSpyMaster={this.props.isSpyMaster}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return <div>{this.createBoard(5, 5)}</div>;
    }
}

export default Board;
