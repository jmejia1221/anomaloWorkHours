import React, { Component } from 'react';

import Panels from '../../Components/UI/Panels/Panels';
import RightPanel from '../../Components/UI/Panels/RightPanel/RightPanel';
import ProfileBuilder from '../../Components/ProfileBuilder/ProfileBuilder';

class Profile extends Component {
    render() {
        return (
            <Panels>
                <RightPanel
                    title="My Profile">
                    <ProfileBuilder />
                </RightPanel>
            </Panels>
        )
    }
}

export default Profile;