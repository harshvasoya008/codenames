import React, { Component } from 'react';
import _ from 'lodash';
import Board from './Board';
import { PubSub, handlePublishError } from './PubSub';
import { EVENT_NEW_BOARD, EVENT_CARD_CLICK, EVENT_TURN_PASS } from '../constants/events';
import Panel from './Panel';

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
        const newBoard = this.categorizeWords(this.props.words);

        // Sending board to all players
        PubSub.publish(
            this.props.gameChannel,
            EVENT_NEW_BOARD,
            { board: newBoard },
            handlePublishError
        );
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
            <div className="p-3 text-center full-height">
                <div className="row mx-0 mt-3 mb-4">
                    <div className="col-2 text-left">
                        <h5>Hello, {this.props.playerMap[this.props.myUuid].name}!</h5>
                    </div>
                    <div className="col-8">
                        <h4>Codenames</h4>
                    </div>
                    <div className="col-2 p-0">
                        <button className="btn btn-outline-primary btn-sm px-3">New Game</button>
                        <button className="float-right btn btn-outline-danger btn-sm px-3">Leave Game</button>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="row m-0">
                        <div className="col-9">
                            <div className="row game-status mb-3">
                                <div className="col-4 d-flex pl-0">
                                    <div className="red-agent ml-3 mr-1">{this.redCount}</div>
                                    <div>-</div>
                                    <div className="blue-agent mx-1">{this.blueCount}</div>
                                </div>
                                <div className="col-4">
                                    <div className={this.state.turn === TEAM_RED ? 'red-agent' : 'blue-agent'}>
                                        {
                                            !this.state.isGameOver
                                                ? this.state.turn.toLowerCase() + "'s turn"
                                                : this.winner.toLowerCase() + " won!"
                                        }
                                    </div>
                                </div>
                                <div className="col-4 text-right align-top">
                                    <button className="btn btn-outline-dark btn-sm px-3" style={{ "marginRight": "0.5%" }}
                                        disabled={this.state.turn !== this.myTeam}
                                        onClick={() => this.endTurn()}>
                                        End Turn
                                    </button>
                                </div>
                            </div>

                            {
                                this.state.board.length === TOTAL_CARDS &&
                                <Board
                                    cards={this.state.board}
                                    isSpyMaster={this.state.isSpyMaster}
                                    onClick={index => this.handleCardClick(index)} />
                            }
                        </div>
                        <div className="col-3 pr-0">
                            <Panel teamRed={this.state.teamRed}
                                teamBlue={this.state.teamBlue}
                                playerMap={this.props.playerMap}
                                playerTeam={this.myTeam}
                                cards={this.state.board}
                                isSpyMaster={this.state.isSpyMaster} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
