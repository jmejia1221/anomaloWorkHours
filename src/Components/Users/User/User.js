import React from 'react';

import './User.css';

const User = (props) => {
    return (
        <li className="User">
            {props.name}
        </li>
    );
}

export default User;