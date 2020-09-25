import React from 'react';

import './Panels.css';

const Panels = (props) => (
    <div className="Panels">
        {props.children}
    </div>
);

export default Panels;