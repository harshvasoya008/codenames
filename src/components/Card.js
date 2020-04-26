import React from 'react';
import '../styles/Card.css';

const RED_AGENT = "RED_AGENT";
const BLUE_AGENT = "BLUE_AGENT";
const TAN_BYSTANDER = "TAN_BYSTANDER";
const BLACK_ASSASSIN = "BLACK_ASSASSIN";

const Card = props => {
    let cssClass = "word-card";
    if (props.data.isChosen || props.isSpyMaster) {
        switch(props.data.type) {
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
    }

    return (
        <button className={`${cssClass}`} onClick={props.onClick}>
            {props.data.word}
        </button>
    );
};

export default Card;