import React from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FullScreenAction.css';

const FullScreenAction = (props) => {
    let toggleCaret = props.toggleCaret ? faAngleRight : faAngleLeft;
    return (
        <div
            onClick={props.clicked}
            className="FullScreen">
            <FontAwesomeIcon
                className="FullScreenIcon"
                icon={toggleCaret} />
            <strong className="FullScreenText">{props.children}</strong>
        </div>
    );
};

export default FullScreenAction;