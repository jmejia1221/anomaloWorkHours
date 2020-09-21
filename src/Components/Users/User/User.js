import React from 'react';

import './User.css';

const User = (props) => {
    let splitName = props.name.split(' ');
    let getLetter = splitName.map(name => {
        return name.substring(0, 1);
    });
    let joinLetter = getLetter.join('');
    return (
        <li className="User">
            {joinLetter}
        </li>
    );
}

export default User;