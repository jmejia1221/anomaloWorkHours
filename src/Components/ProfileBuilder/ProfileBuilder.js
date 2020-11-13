import React from 'react';

import './ProfileBuilder.css';

const ProfileBuilder = (props) => {
    return (
        <div className="Profile">
            <div className="ProfilePicture">
                <span className="ProfilePictureText">{props.userName}</span>
            </div>
            {/* <h1>John Mejia</h1> */}
        </div>
    )
}

export default ProfileBuilder;