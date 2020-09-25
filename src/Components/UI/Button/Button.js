import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        case 'primary':
            buttonClass += ' primary'
            break;
        default:
            buttonClass += ''
            break;
    };

    return (
        <button
            className={`Button ${buttonClass} ${props.class}`}
            onClick={props.clicked}>
            {props.icon && (
                <span
                    className="ButtonIcon"
                    style={{marginRight: props.children ? '8px' : '0'}}>
                    <FontAwesomeIcon icon={props.icon} />
                </span>
            )}
            {props.children}
        </button>
    );
};

export default Button;