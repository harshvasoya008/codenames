import React, { Component } from 'react';
import Card from './Card';
import '../styles/Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.createBoard = this.createBoard.bind(this);
    }

    createBoard(row, col) {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const columns = [];
            for (let j = 0; j < col; j += 1) {
                columns.push(this.renderCard(cellCounter++));
            }
            board.push(<div key={i} className="board-row">{columns}</div>);
        }

        return board;
    }

    renderCard(i) {
        return (
            <Card
                key={i}
                data={this.props.cards[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return <div className="board">{this.createBoard(5, 5)}</div>;
    }
}

export default Board;
