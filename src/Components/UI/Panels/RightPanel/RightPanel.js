import React from 'react';

import FullScreenAction from '../../../Navigation/FullScreenAction/FullScreenAction';

import './RightPanel.css';

const RightPanel = (props) => {
    return (
        <div className="RightPanelContent">
            { props.showFullScreenButton &&
                <FullScreenAction
                    toggleCaret={props.hidePanel}
                    clicked={props.togglePanel}>
                    { props.hidePanel ? 'Show Menu' : 'Full Screen' }
                </FullScreenAction> }
            {   props.title &&
                <h1 className="RigthPanelTitle">{ props.title }</h1> }
            { props.children }
        </div>
    );
}

export default RightPanel;