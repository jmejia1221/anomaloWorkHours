import React from 'react';

import User from './User/User';

import './Users.css';

const Users = (props) => {
    let listUsers = props.users.map(user => {
        return <User name={user.name} />
    });
    return (
        <ul className="Users">
            {listUsers}
        </ul>
    );
};

export default Users;