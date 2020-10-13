import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = (props) => {
    return (
        <NavLink
            onClick={props.clicked}
            to={`${props.path}`}
            exact={props.exact}
            className="NavItem">
                {props.children}
        </NavLink>
    )};

export default NavigationItem;