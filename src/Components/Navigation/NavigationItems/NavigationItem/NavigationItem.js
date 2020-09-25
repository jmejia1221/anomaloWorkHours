import React from 'react';

import './NavigationItem.css';

const NavigationItem = (props) => (<li className="NavItem">{props.children}</li>);

export default NavigationItem;