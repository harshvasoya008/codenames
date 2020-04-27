import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import Game from './Game';
import { PubSub, handlePublishError } from './PubSub';
import { EVENT_JOIN, EVENT_START } from '../constants/events';
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
                {
                    !this.state.isPlaying &&
                    <div class="d-md-flex h-md-100 align-items-center">
                        <div className="heading heading-left bg-primary-color">
                            <i class="fas fa-code"></i>
                            <h1>code</h1>
                        </div>
                        <div className="heading heading-right">
                            <h1>names</h1>
                        </div>
                        <div class="col-md-6 p-0 h-md-100 align-items-center" style={{ "background": "#ebeeef" }}>
                            <div className="d-md-flex p-5">
                                <div className="login-box shadow">
                                    <div className="login-box-title">
                                        <span>Welcome!</span>
                                    </div>
                                    <form className="mt-3 p-4">
                                        <div class="form-group row">
                                            <label for="inputNickname" class="col-4 col-form-label">Nickname</label>
                                            <div class="col-8">
                                                <input type="text" class="form-control" id="inputNickname" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputRoomId" class="col-4 col-form-label">Room name</label>
                                            <div class="col-8">
                                                <input type="text" class="form-control" id="inputRoomId" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col">
                                                <button type="submit" class="rounded-pill btn btn-outline-dark btn-block">Create</button>
                                            </div>
                                            <div class="col">
                                                <button type="submit" class="rounded-pill btn btn-outline-dark btn-block">Join</button>
                                            </div>
                                        </div>
                                        {
                                            this.state.isRoomCreator && this.state.count >= MIN_PLAYERS_REQUIRED &&
                                            <div class="form-group row">
                                                <div class="col">
                                                    <button type="submit" class="rounded-pill btn btn-outline-success btn-block">Start Game!</button>
                                                </div>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 p-0 bg-primary-color h-md-100" />
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