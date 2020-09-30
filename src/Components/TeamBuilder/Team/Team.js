import React from 'react';

const Team = (props) => {
    let setUsers = [];
    let usersLeft = null;
    props.teamCreated.users.forEach(user => {
        let splitName = user.name.split(' ');
        let getLetter = splitName.map(name => {
            return name.substring(0, 1);
        });
        setUsers.push(getLetter.join(''));
    });
    let sliceUsers = setUsers.slice(0, 4);

    if (setUsers.length > 4) {
        usersLeft = <span>+{ setUsers.length - 4}</span>;
    }
    return (
        <div className="TeamBuilderTeam">
            <h3>{props.teamCreated.name}</h3>
            <div className="TeamBuilderUsers">
                {
                    sliceUsers.map((user, i) => (
                        <span key={i}>{user}</span>
                    ))
                }
                { usersLeft }
            </div>
        </div>
    )
}

export default Team;