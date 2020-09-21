import React from 'react';

import './LeftPanel.css';

const LeftPanel = (props) => {
    return (
        <div className="LeftPanelContainer">
            <h1 className="leftPanleTitle">
                {props.title}
            </h1>
            <div className="HistoryContent">
                {props.children}
            </div>
        </div>
    );
}

export default LeftPanel;