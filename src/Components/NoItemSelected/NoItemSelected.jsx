import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// CSS
import './NoItemSelected.css'

const NoItemSelected = ({ icon, text, style }) => {
    return (
        <div style={style} className="no-team-selected">
            <FontAwesomeIcon
                className="selectIcon"
                icon={icon} />
            <span className="selectText">{text}</span>
        </div>
    )
}

export default NoItemSelected;