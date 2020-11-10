import React from 'react';

import './Input.css';

const Input = (props) => {
    return (
        <input className="Input"
            {...props}
            value={props.value} />
    );
};


export default Input;