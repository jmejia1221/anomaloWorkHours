import React from 'react';

import './RightPanel.css';

const RightPanel = (props) => (
    <div className="RightPanelContent">
        <h1 className="RigthPanelTitle">{ props.title }</h1>
        {props.children}
    </div>
);

export default RightPanel;