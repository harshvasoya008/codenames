import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import Game from './Game';
import { PubSub, handlePublishError } from './PubSub';
import { EVENT_JOIN, EVENT_PLAYER_LIST, EVENT_START } from '../constants/events';
import { wordList } from '../constants/words';
import '../styles/App.css';

const APP_NAME = "codenames";
const SEPARATOR = ":::";

const TEAM_RED = "Red";
const TEAM_BLUE = "Blue";

const MIN_PLAYERS_REQUIRED = 4;
const TOTAL_CARDS = 25;

class App extends Component {
    constructor(props) {
        super(props);

        this.uuid = shortid.generate().substring(0, 6);
        this.state = {
            isPlaying: false,
            isDisabled: false,
            isRoomCreator: false,
            count: 1,
            players: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPressCreate = this.onPressCreate.bind(this);
        this.onPressJoin = this.onPressJoin.bind(this);
        this.onPressStartGame = this.onPressStartGame.bind(this);

        this.lobbyChannel = null;
        this.words = [];
        this.playerMap = null;
    }

    subscribeToChannel = (channelName) => {
        if (channelName != null) {
            PubSub.subscribe(channelName, (msg) => {
                const eventType = msg['name'];
                const msgData = msg['data'];

                if (eventType === EVENT_JOIN && this.state.isRoomCreator) {
                    this.setState({
                        count: this.state.count + 1
                    });
                    this.setState(prevState => {
                        return {
                            players: prevState.players.concat(msgData)
                        };
                    });

                    // Sending updated player list to everyone
                    PubSub.publish(
                        channelName,
                        EVENT_PLAYER_LIST,
                        { playerList: this.state.players },
                        handlePublishError
                    );
                }

                else if (eventType === EVENT_PLAYER_LIST) {
                    this.setState({ players: msgData.playerList });
                }

                else if (eventType === EVENT_START) {
                    this.playerMap = msgData.teams;
                    this.setState({
                        isPlaying: true
                    });
                }
            });
        }
    }

    onPressCreate = () => {
        if (!(this.state.roomId && this.state.name)) {
            alert('Nickname and Room fields cannot be empty');
            return;
        }

        this.lobbyChannel = APP_NAME + SEPARATOR + this.state.roomId;
        this.setState({
            isDisabled: true,
            isRoomCreator: true
        });

        this.subscribeToChannel(this.lobbyChannel);
        this.state.players.push({ uuid: this.uuid, name: this.state.name });
        this.words = _.shuffle(wordList).slice(0, TOTAL_CARDS);
    }

    onPressJoin = () => {
        if (!(this.state.roomId && this.state.name)) {
            alert('Nickname and Room fields cannot be empty');
            return;
        }

        this.lobbyChannel = APP_NAME + SEPARATOR + this.state.roomId;
        PubSub.publish(
            this.lobbyChannel,
            EVENT_JOIN,
            {
                uuid: this.uuid,
                name: this.state.name
            },
            handlePublishError
        );

        this.subscribeToChannel(this.lobbyChannel);
    }

    onPressStartGame = () => {
        let teams = {}
        let teamFlag = true;
        _.shuffle(this.state.players).forEach(p => {
            p.team = (teamFlag ? TEAM_RED : TEAM_BLUE)
            teams[p.uuid] = p;
            teamFlag = !teamFlag;
        });

        PubSub.publish(
            this.lobbyChannel,
            EVENT_START,
            {
                teams: teams
            },
            handlePublishError
        );
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {
                    !this.state.isPlaying &&
                    <div className="d-md-flex h-md-100 align-items-center">
                        <div className="heading heading-left bg-primary-color">
                            <h1>code</h1>
                        </div>
                        <div className="heading heading-right">
                            <h1>names</h1>
                        </div>
                        <div className="col-md-6 p-0 h-md-100 align-items-center" style={{ "background": "#ebeeef" }}>
                            <div className="p-5">
                                <div className="box login-box shadow">
                                    <div className="box-title">
                                        <span>Welcome!</span>
                                    </div>
                                    <div className="mt-3 p-4">
                                        <div className="form-group row">
                                            <label className="col-4 col-form-label">Nickname</label>
                                            <div className="col-8">
                                                <input name="name" type="text" className="form-control" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-4 col-form-label">Room name</label>
                                            <div className="col-8">
                                                <input name="roomId" type="text" className="form-control" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col">
                                                <button type="button" className="rounded-pill btn btn-outline-dark btn-block" onClick={this.onPressCreate}>
                                                    Create
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button type="button" className="rounded-pill btn btn-outline-dark btn-block" onClick={this.onPressJoin}>
                                                    Join
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            this.state.isRoomCreator && this.state.count >= MIN_PLAYERS_REQUIRED &&
                                            <div className="form-group row">
                                                <div className="col">
                                                    <button type="button" className="rounded-pill btn btn-outline-success btn-block" onClick={this.onPressStartGame}>
                                                        Start Game!
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {
                                    this.state.players.length > 0 &&
                                    <div className="box players-box shadow mt-5">
                                        <div className="box-title">
                                            <span>Secret Operatives</span>
                                        </div>
                                        <div className="players-box-body p-3">
                                            {
                                                this.state.players.map((p, index) => {
                                                    const leftPlayer = p.name;
                                                    const rightPlayer = this.state.players[index + 1] ? this.state.players[index + 1].name : '';
                                                    return (
                                                        index % 2 === 0
                                                            ? <div className="d-flex">
                                                                <div className="w-50 text-center">{leftPlayer}</div>
                                                                <div className="w-50 text-center">{rightPlayer}</div>
                                                            </div>
                                                            : ''
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-6 p-0 bg-primary-color h-md-100" />
                    </div>
                }
                {
                    this.state.isPlaying &&
                    <Game gameChannel={this.lobbyChannel}
                        playerMap={this.playerMap}
                        myUuid={this.uuid}
                        isRoomCreator={this.state.isRoomCreator}
                        words={this.words} />
                }
            </div>
        );
    }
}

export default App;