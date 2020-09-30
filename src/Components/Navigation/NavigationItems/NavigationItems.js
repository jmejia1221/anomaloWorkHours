import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHourglass, faLayerGroup, faSignOutAlt, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

import './NavigationItems.css';

class NavigationItems extends Component {
    state = {
        showItems: false
    }

    menuHandler = () => {
        this.setState((prevState) => ({showItems: !prevState.showItems}));
    }
    render() {
        return (
            <div className="NavContent">
                <span>
                    <Button
                        clicked={this.menuHandler}
                        class="NavButton"
                        icon={faBars}
                        type="primary" />
                </span>
                <ul className={`${this.state.showItems ? 'ShowNavItems' : ''} NavItems`}>
                    <NavigationItem>
                        <FontAwesomeIcon
                            title="Profile"
                            icon={faUserCircle} />
                        <span className="NavTooltip">
                            Profile
                        </span>
                    </NavigationItem>
                    <NavigationItem>
                        <FontAwesomeIcon
                            title="Teams"
                            icon={faLayerGroup} />
                        <span className="NavTooltip">
                            My Teams
                        </span>
                    </NavigationItem>
                    <NavigationItem>
                        <FontAwesomeIcon
                            title="Anomalos"
                            icon={faUsers} />
                        <span className="NavTooltip">
                            Anomalos
                        </span>
                    </NavigationItem>
                    <NavigationItem>
                        <FontAwesomeIcon
                            title="Hours"
                            icon={faHourglass} />
                        <span className="NavTooltip">
                            My Hours
                        </span>
                    </NavigationItem>
                    <NavigationItem>
                        <FontAwesomeIcon
                            title="SignOut"
                            icon={faSignOutAlt} />
                        <span className="NavTooltip">
                            SignOut
                        </span>
                    </NavigationItem>
                </ul>
            </div>
        )
    }
}

export default NavigationItems;