import React from 'react';

import { SpellText } from '../../Shared/Utility';

import './ProfileBuilder.css';

const ProfileBuilder = (props) => {
    let profileName = null;
    if (props.userName) profileName = SpellText(props.userName);
    return (
        <div className="Profile">
            <div className="ProfilePicture">
                <span className="ProfilePictureText">
                    {profileName}
                </span>
            </div>
            <div></div>
            <div className="ProfileInfo">
                <ul>
                    <li className="ProfileName">
                        <span>{props.userName}</span>
                    </li>
                    <li className="ProfileEmail">
                        <span>{props.email}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileBuilder;