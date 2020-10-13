import React from 'react';

import './Input.css';

const Input = (props) => {
    return (
        <input className="Input"
            {...props}
            value={props.value}
            onChange={props.changed} />
    );
};


export default Input;