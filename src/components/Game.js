import React, { Component } from 'react';
import _ from 'lodash';
import Board from './Board';
import { PubSub, handlePublishError } from './PubSub';
import { EVENT_NEW_BOARD, EVENT_CARD_CLICK, EVENT_TURN_PASS } from '../constants/events';

const TOTAL_CARDS = 25;
const TEAM_RED = "Red";
const TEAM_BLUE = "Blue";
const RED_AGENT = "RED_AGENT";
const BLUE_AGENT = "BLUE_AGENT";
const TAN_BYSTANDER = "TAN_BYSTANDER";
const BLACK_ASSASSIN = "BLACK_ASSASSIN";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            teamRed: [],
            teamBlue: [],
            turn: 'Nobody',
            isGameOver: false
        }

        this.myTeam = props.playerMap[props.myUuid].team;
        this.redCount = 0;
        this.blueCount = 0;
        this.winner = null;
    }

    componentDidMount() {
        this.prepareTeams();
        this.subscribeToChannel();

        if (this.props.isRoomCreator) {
            this.createBoard();
        }
    }

    prepareTeams() {
        const teamRed = _.filter(Object.keys(this.props.playerMap), uuid => this.props.playerMap[uuid].team === TEAM_RED);
        const teamBlue = _.filter(Object.keys(this.props.playerMap), uuid => this.props.playerMap[uuid].team === TEAM_BLUE);
        this.setState({
            teamRed: teamRed,
            teamBlue: teamBlue,
            isSpyMaster: (this.props.myUuid === teamRed[0] || this.props.myUuid === teamBlue[0])
        })
    }

    subscribeToChannel() {
        PubSub.subscribe(this.props.gameChannel, (msg) => {
            const eventType = msg['name'];
            const msgData = msg['data'];

            if (eventType === EVENT_NEW_BOARD) {
                this.redCount = msgData.board.redCount;
                this.blueCount = msgData.board.blueCount;
                this.setState({
                    board: msgData.board.words,
                    turn: msgData.board.turn
                });
            }

            else if (eventType === EVENT_CARD_CLICK) {
                this.redCount = msgData.redCount;
                this.blueCount = msgData.blueCount;

                let board = this.state.board;
                if (board[msgData.index].type === BLACK_ASSASSIN) {
                    this.blackCardClicked();
                } else {
                    board[msgData.index].isChosen = true;
                    this.setState({ board: board, turn: msgData.turn });
                    this.checkForWinner();
                }
            }

            else if (eventType === EVENT_TURN_PASS) {
                this.setState({ turn: msgData.turn });
            }
        });
    }

    createBoard = () => {
        const newBoard = this.prepareBoard();

        // Sending board to all players
        PubSub.publish(
            this.props.gameChannel,
            EVENT_NEW_BOARD,
            { board: newBoard },
            handlePublishError
        );
    }

    prepareBoard = () => {
        let words = [];
        for (let i = 0; i < TOTAL_CARDS; i += 1) {
            words.push("word-" + i);
        }

        return this.categorizeWords(words);
    }

    categorizeWords = (words) => {
        const redCount = Math.floor(Math.random() + 0.5) === 0 ? 9 : 8;
        let cards = [];
        for (let i = 0; i < words.length; i += 1) {
            let card = {
                word: words[i]
            }
            if (i < redCount) {
                card.type = RED_AGENT;
            } else if (i < 17) {
                card.type = BLUE_AGENT;
            } else if (i < 24) {
                card.type = TAN_BYSTANDER;
            } else {
                card.type = BLACK_ASSASSIN;
            }
            cards.push(card);
        }

        // Shuffling the array
        return {
            words: _.shuffle(cards),
            redCount: redCount,
            blueCount: 17 - redCount,
            turn: redCount === 9 ? TEAM_RED : TEAM_BLUE
        };
    }

    handleCardClick(index) {
        let board = this.state.board;
        const currTurn = this.state.turn;
        if (!board[index].isChosen && currTurn === this.myTeam && !this.state.isSpyMaster) {
            board[index].isChosen = true;
            this.setState({ board: board });

            let nextTurn = currTurn;
            switch (board[index].type) {
                case RED_AGENT:
                    this.redCount -= 1;
                    nextTurn = TEAM_RED;
                    break;

                case BLUE_AGENT:
                    this.blueCount -= 1;
                    nextTurn = TEAM_BLUE;
                    break;

                case TAN_BYSTANDER:
                    nextTurn = currTurn === TEAM_RED ? TEAM_BLUE : TEAM_RED
                    break;

                case BLACK_ASSASSIN:
                    nextTurn = "Nobody";
                    this.blackCardClicked();
                    break;

                default:
                    break;
            }

            this.setState({ turn: nextTurn });
            PubSub.publish(
                this.props.gameChannel,
                EVENT_CARD_CLICK,
                {
                    index: index,
                    turn: nextTurn,
                    redCount: this.redCount,
                    blueCount: this.blueCount
                },
                handlePublishError
            );

            // Check if there is a winner
            this.checkForWinner();
        }
    }

    blackCardClicked() {
        const currTurn = this.state.turn;
        if (currTurn === TEAM_RED) {
            this.winner = TEAM_BLUE;
        } else if (currTurn === TEAM_BLUE) {
            this.winner = TEAM_RED;
        }
        this.declareWinner();
    }

    checkForWinner() {
        if (this.redCount === 0) {
            this.winner = TEAM_RED;
            this.declareWinner();
        } else if (this.blueCount === 0) {
            this.winner = TEAM_BLUE;
            this.declareWinner();
        }
    }

    declareWinner() {
        // Revealing color of all cards        
        let board = this.state.board;
        for (let index = 0; index < board.length; index++) {
            board[index].isChosen = true;
        }
        this.setState({ board: board, isGameOver: true });
    }

    endTurn() {
        const currTurn = this.state.turn;
        const nextTurn = currTurn === TEAM_RED ? TEAM_BLUE : TEAM_RED;
        this.setState({ turn: nextTurn });
        PubSub.publish(
            this.props.gameChannel,
            EVENT_TURN_PASS,
            { turn: nextTurn },
            handlePublishError
        );
    }

    render() {
        return (
            <div>
                <div className="team-map">
                    <div>
                        <span>Team Red: </span>
                        <span>{this.state.teamRed.map(player => this.props.playerMap[player].name).join(',')}</span>
                    </div>
                    <div>
                        <span>Team Blue: </span>
                        <span>{this.state.teamBlue.map(player => this.props.playerMap[player].name).join(',')}</span>
                    </div>
                    <div>
                        <div>Cards remaining (Red-Blue): {this.redCount}-{this.blueCount}</div>
                        {
                            !this.state.isGameOver
                                ? <div>
                                    {this.state.turn}'s turn
                                    <button disabled={this.state.turn !== this.myTeam}
                                        onClick={() => this.endTurn()}>
                                        End Turn
                                    </button>
                                </div>
                                : <div>{this.winner} won!</div>
                        }
                    </div>
                </div>
                {
                    this.state.board.length === TOTAL_CARDS &&
                    <div className="game">
                        <div>
                            <Board
                                cards={this.state.board}
                                isSpyMaster={this.state.isSpyMaster}
                                onClick={index => this.handleCardClick(index)}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Game;
