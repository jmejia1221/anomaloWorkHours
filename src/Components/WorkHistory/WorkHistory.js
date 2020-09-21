import React from 'react';
import ItemHistory from './ItemHistory/ItemHistory';

import './WorkHistory.css';

const initialData = [
    {
        hours: 35,
        dateStart: '12/09/2019',
        dateEnd: '12/09/2019'
    },
    {
        hours: 35,
        dateStart: '12/09/2019',
        dateEnd: '12/09/2019'
    },
    {
        hours: 35,
        dateStart: '12/09/2019',
        dateEnd: '12/09/2019'
    },
    {
        hours: 35,
        dateStart: '12/09/2019',
        dateEnd: '12/09/2019'
    },
    {
        hours: 35,
        dateStart: '12/09/2019',
        dateEnd: '12/09/2019'
    },
];
const WorkHistory = initialData.map((item, i) => {
    return (
        <ItemHistory
            key={i}
            hours={item.hours}
            dateStart={item.dateStart}
            dateEnd={item.dateEnd} />
    );
});
const listHistory = (props) => (
    <ul className="WorkHistory">
        {WorkHistory}
    </ul>
);

export default listHistory;
