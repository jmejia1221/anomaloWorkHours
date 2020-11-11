import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHourglass, faLayerGroup, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

import * as actions from '../../../store/actions';

import './NavigationItems.css';

class NavigationItems extends Component {
    state = {
        showItems: false
    }

    menuHandler = () => {
        this.setState((prevState) => ({showItems: !prevState.showItems}));
    }

    logout = () => {
        this.props.onLogout();
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
                    <NavigationItem
                        path="/profile">
                        <FontAwesomeIcon
                            title="Profile"
                            icon={faUserCircle} />
                        <span className="NavTooltip">
                            Profile
                        </span>
                    </NavigationItem>
                    <NavigationItem
                        exact
                        path="/teams">
                        <FontAwesomeIcon
                            title="Teams"
                            icon={faLayerGroup} />
                        <span className="NavTooltip">
                            My Teams
                        </span>
                    </NavigationItem>
                    <NavigationItem
                        exact
                        path="/">
                        <FontAwesomeIcon
                            title="Hours"
                            icon={faHourglass} />
                        <span className="NavTooltip">
                            My Hours
                        </span>
                    </NavigationItem>
                    <NavigationItem
                        path="/login"
                        clicked={this.logout}>
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

const mapDispatchToState = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToState)(NavigationItems);