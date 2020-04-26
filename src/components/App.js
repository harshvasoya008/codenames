import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import Game from './Game';
import { PubSub, handlePublishError } from './PubSub';
import { EVENT_JOIN, EVENT_START } from '../constants/events';
import { wordList } from '../constants/words';

const APP_NAME = "codenames";
const SEPARATOR = ":::";

const TEAM_RED = "Red";
const TEAM_BLUE = "Blue";

const MIN_PLAYERS_REQUIRED = 2;
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
        };

        this.lobbyChannel = null;
        this.words = [];
        this.players = [];
        this.playerMap = null;
    }

    subscribeToChannel = (channelName) => {
        if (channelName != null) {
            PubSub.subscribe(channelName, (msg) => {
                const eventType = msg['name'];
                const msgData = msg['data'];

                if (eventType === EVENT_JOIN && this.state.isRoomCreator) {
                    console.log(msgData.name + " joined");
                    this.setState({
                        count: this.state.count + 1
                    });
                    this.players.push({
                        uuid: msgData.uuid,
                        name: msgData.name,
                    });
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
        this.players.push({
            uuid: this.uuid,
            name: this.state.name,
        });

        let teams = {}
        let teamFlag = true;
        _.shuffle(this.players).forEach(p => {
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

    handleNicknameInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleRoomIdInputChange = (e) => {
        this.setState({
            roomId: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Codenames</h1>

                {
                    !this.state.isPlaying &&
                    <div className="game">
                        <div>
                            <div>
                                <span>Nickname: </span>
                                <input onChange={this.handleNicknameInputChange} />
                            </div>
                            <div>
                                <span>Room code: </span>
                                <input onChange={this.handleRoomIdInputChange} />
                            </div>
                            <div className="button-container">
                                <button
                                    className="create-button "
                                    disabled={this.state.isDisabled}
                                    onClick={() => this.onPressCreate()}>
                                    Create
                                </button>
                                <button
                                    className="join-button"
                                    onClick={() => this.onPressJoin()}>
                                    Join
                                </button>
                                {
                                    this.state.isRoomCreator && this.state.count >= MIN_PLAYERS_REQUIRED &&
                                    <button onClick={() => this.onPressStartGame()}>
                                        Start Game
                                    </button>
                                }
                            </div>

                        </div>
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