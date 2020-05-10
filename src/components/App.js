import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import Game from './Game';
import { PubSub, handlePublishError } from './PubSub';
import { EVENT_JOIN, EVENT_PLAYER_LIST } from '../constants/events';
import { wordList } from '../constants/words';
import '../styles/App.css';

const APP_NAME = "codenames";
const SEPARATOR = ":::";

const TEAM_RED = "Red";
const TEAM_BLUE = "Blue";

const DEBUG = 0;
const TOTAL_CARDS = 25;

class App extends Component {
    constructor(props) {
        super(props);

        this.uuid = shortid.generate().substring(0, 6);
        this.state = {
            isRoomCreator: false,
            playerList: [],
            playerMap: {},
        };

        this.onPressCreate = this.onPressCreate.bind(this);
        this.onPressJoin = this.onPressJoin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.lobbyChannel = null;
        this.words = [];
        this.teamFlag = false;
    }

    componentDidMount() {
        if (DEBUG) {
            this.words = _.shuffle(wordList).slice(0, TOTAL_CARDS);
            this.uuid = "101";
            this.playerMap = {
                "101": {
                    uuid: "101",
                    name: "React",
                    team: TEAM_RED
                }
            }
            this.setState({isPlaying: true, isRoomCreator:true})
        }
    }

    subscribeToChannel = (channelName) => {
        if (channelName != null) {
            PubSub.subscribe(channelName, (msg) => {
                const eventType = msg['name'];
                const msgData = msg['data'];

                if (eventType === EVENT_JOIN && this.state.isRoomCreator) {
                    msgData.team = this.assignTeam();
                    this.setState(prevState => {
                        return {
                            playerList: prevState.playerList.concat(msgData)
                        };
                    });

                    // Sending updated player list to everyone
                    PubSub.publish(
                        channelName,
                        EVENT_PLAYER_LIST,
                        { playerList: this.state.playerList },
                        handlePublishError
                    );
                }

                else if (eventType === EVENT_PLAYER_LIST) {
                    const playerMap = this.generatePlayerMap(msgData.playerList);
                    this.setState({ playerList: msgData.playerList, playerMap: playerMap });
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
            isRoomCreator: true
        });

        this.subscribeToChannel(this.lobbyChannel);
        this.words = _.shuffle(wordList).slice(0, TOTAL_CARDS);

        const team = this.assignTeam();
        const playerList = [{ uuid: this.uuid, name: this.state.name, team: team }];
        const playerMap = this.generatePlayerMap(playerList);
        this.setState({ playerList: playerList, playerMap: playerMap });
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

    generatePlayerMap(playerList) {
        let tempMap = {};
        playerList.forEach(p => tempMap[p.uuid] = p);
        return tempMap;
    }

    assignTeam() {
        this.teamFlag = !this.teamFlag;
        return (this.teamFlag ? TEAM_RED : TEAM_BLUE);
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
                    !this.state.playerList.length &&
                    <div className="d-md-flex full-height align-items-center">
                        <div className="heading heading-left bg-split-ui-dark">
                            <h1>code</h1>
                        </div>
                        <div className="heading heading-right bg-split-ui-light">
                            <h1>names</h1>
                        </div>
                        <div className="col-md-6 p-0 bg-split-ui-light full-height align-items-center">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 p-0 bg-split-ui-dark full-height" />
                    </div>
                }
                {
                    this.state.playerList.length &&
                    <Game gameChannel={this.lobbyChannel}
                        playerMap={this.state.playerMap}
                        playerList={this.state.playerList}
                        myUuid={this.uuid}
                        isRoomCreator={this.state.isRoomCreator}
                        words={this.words} />
                }
            </div>
        );
    }
}

export default App;