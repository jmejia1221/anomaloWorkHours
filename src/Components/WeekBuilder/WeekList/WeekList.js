import React from 'react';
import WeekItem from './WeekItem/WeekItem';
import WeekHead from './WeekHead/WeekHead';
import Aux from '../../../hoc/Aux/Aux';

import './WeekList.css';

const WeekList = (props) => (
    <Aux>
        <WeekHead actions={props.actions} />
        <ul className="ListContent">
            <WeekItem actions={props.actions} />
        </ul>
    </Aux>
);

export default WeekList;