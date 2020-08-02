import React from 'react';

const RED_AGENT = "RED_AGENT";
const BLUE_AGENT = "BLUE_AGENT";
const TAN_BYSTANDER = "TAN_BYSTANDER";
const BLACK_ASSASSIN = "BLACK_ASSASSIN";

const Card = props => {
    let cssClass = "card-dimension word-card text-center";
    if (props.isSpyMaster) {
        switch (props.data.type) {
            case RED_AGENT:
                cssClass += " red-card-light";
                break;
            case BLUE_AGENT:
                cssClass += " blue-card-light";
                break;
            case TAN_BYSTANDER:
                cssClass += " tan-card-light";
                break;
            case BLACK_ASSASSIN:
                cssClass += " black-card";
                break;
            default:
                break;
        }
    }

    if (props.data.isChosen) {
        switch (props.data.type) {
            case RED_AGENT:
                cssClass += " red-card";
                break;
            case BLUE_AGENT:
                cssClass += " blue-card";
                break;
            case TAN_BYSTANDER:
                cssClass += " tan-card";
                break;
            case BLACK_ASSASSIN:
                cssClass += " black-card";
                break;
            default:
                break;
        }
    } else if (!props.isChosen || props.data.type === BLACK_ASSASSIN) {
        cssClass += " shadow";
    }

    return (
        <div className={`${cssClass}`} onClick={props.onClick}>{props.data.word}</div>
    );
};

export default Card;