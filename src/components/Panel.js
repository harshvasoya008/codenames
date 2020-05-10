import React, { Component } from 'react';
import _ from 'lodash';

const SPYMASTER = "Spymaster";
const FIELD_OPERATIVE = "Field Operative"

const TEAM_RED = "Red";
const TEAM_BLUE = "Blue";

class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamRed: [],
            teamBlue: [],
        }
    }

    componentDidMount() {
        this.prepareTeams();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playerMap !== this.props.playerMap) {
            this.prepareTeams();
        }
    }

    prepareTeams() {
        const teamRed = _.filter(Object.keys(this.props.playerMap), uuid => this.props.playerMap[uuid].team === TEAM_RED);
        const teamBlue = _.filter(Object.keys(this.props.playerMap), uuid => this.props.playerMap[uuid].team === TEAM_BLUE);
        this.setState({
            teamRed: teamRed,
            teamBlue: teamBlue,
        });
    }

    getSpyView(row, col) {
        const spyView = [];
        let cellCounter = 0;
        const cardTypeList = this.props.cards.map(c => c.type.toLowerCase().replace('_', '-'));

        for (let i = 0; i < row; i += 1) {
            const row = [];
            for (let j = 0; j < col; j += 1) {
                const cardType = cardTypeList[cellCounter];
                const cssClass = "card-dimension rounded-pill bg-" + cardType;
                row.push(<div key={cellCounter} className={cssClass}>!</div>);
                cellCounter++;
            }
            spyView.push(<div className="d-flex">{row}</div>);
        }

        return spyView;
    }

    render() {
        const disableSpyView = !this.props.isSpyMaster ? 'disabled' : '';

        return (
            <div className="panel">
                <div className="py-3">
                    <span className="role-label">Role: </span>
                    <span className={this.props.playerTeam.toLowerCase() + "-agent role-value"}>{this.props.isSpyMaster ? SPYMASTER : FIELD_OPERATIVE}</span>
                </div>
                <div>
                    <ul className="nav nav-tabs nav-justified" id="panelTabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="player-view-tab" data-toggle="tab" href="#player-view" role="tab" aria-controls="player-view" aria-selected="true">Operatives</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + disableSpyView} id="spy-view-tab" data-toggle="tab" href="#spy-view" role="tab" aria-controls="spy-view" aria-selected="false">Spy View</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="panelTabsContent">
                        <div className="tab-pane fade show active" id="player-view" role="tabpanel" aria-labelledby="player-view-tab">
                            <div className="d-flex p-2">
                                <div className="col-6 border-right p-2">
                                    {
                                        this.state.teamRed.map((player) => {
                                            if (this.props.isSpyMaster) return (<div className="red-agent">[{this.props.playerMap[player].name}]</div>);
                                            else return (<div className="red-agent">{this.props.playerMap[player].name}</div>);
                                        })
                                    }
                                </div>
                                <div className="col-6 p-2">
                                    {
                                        this.state.teamBlue.map((player) => {
                                            if(this.props.isSpyMaster) return (<div className="blue-agent">[{this.props.playerMap[player].name}]</div>);
                                            else return (<div className="blue-agent">{this.props.playerMap[player].name}</div>);
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            this.props.isSpyMaster && this.props.cards.length === 25 &&
                            <div class="tab-pane fade" id="spy-view" role="tabpanel" aria-labelledby="spy-view-tab">
                                <div className="p-4">
                                    {this.getSpyView(5, 5)}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Panel;
