import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = (props) => {
    return (
        <NavLink
            to={`${props.path}`}
            className="NavItem">
                {props.children}
            </NavLink>
    )};

export default NavigationItem;