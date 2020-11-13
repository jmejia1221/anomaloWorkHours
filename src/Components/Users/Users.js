import React from 'react';

import User from './User/User';
import { SpellText } from '../../Shared/Utility';

import './Users.css';

const Users = (props) => {
    let listUsers = props.users.map((user, i) => {
        let SpelledName = SpellText(user.name);
        return <User key={i} name={SpelledName} />
    });
    return (
        <ul className="Users">
            {listUsers}
        </ul>
    );
};

export default Users;