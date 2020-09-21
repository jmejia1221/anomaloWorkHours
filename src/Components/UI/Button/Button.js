import React from 'react';

import './Button.css';

const Button = (props) => {
    let buttonClass = '';
    switch(props.type) {
        case 'status':
            buttonClass += 'status';
            switch(props.status) {
                case 'approved':
                    buttonClass += ' approved'
                    break;
                case 'in-progress':
                    buttonClass += ' in-progress'
                    break;
                case 'waiting-info':
                    buttonClass += ' waiting-info'
                    break;
                default:
                    buttonClass += ' open'
                    break;
            }
            break;
        default:
            buttonClass += ''
            break;
    };

    return (
        <button className={`Button ${buttonClass}`}>
            {props.children}
        </button>
    );
};

export default Button;