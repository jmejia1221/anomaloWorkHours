import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Panels from '../../Components/Panels/Panels';
import LeftPanel from '../../Components/Panels/LeftPanel/LeftPanel';
import RightPanel from '../../Components/Panels/RightPanel/RightPanel';
import WeekBuilder from '../../Components/WeekBuilder/WeekBuilder';
import User from '../../Components/Users/Users';

class UsersFeed extends Component {
    render() {
        const users = [
            {
                name: 'John Mejia',
                id: 1
            },
            {
                name: 'Daniel Mejia',
                id: 2
            },
            {
                name: 'Juan Hernandez',
                id: 3
            }
        ];
        let weekListUser = users.map(user => {
            return (
                <WeekBuilder
                    key={user.id}
                    name={user.name}
                    hoursListed />
            );
        });
        return(
            <Aux>
                <Panels>
                    <LeftPanel
                        title="Anomalo List"
                        type="history">
                        <User users={users} />
                    </LeftPanel>
                    <RightPanel
                        title="Anomalos' Work Hours">
                        {weekListUser}
                    </RightPanel>
                </Panels>
            </Aux>
        );
    }
}

export default UsersFeed;