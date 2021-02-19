// Libs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeekDay from 'dayjs/plugin/isoWeek';

// Dayjs extended plugins
dayjs.extend(utc);
dayjs.extend(isoWeekDay);

export const CURRENT_DATE = dayjs();
export const CURRENT_DAY = dayjs().day();
export const COMPUTED_TIME = CURRENT_DATE.subtract(CURRENT_DAY, 'day').format('DD/MM/YYYY');
export const WEEKDAY_VALUE = {
    'SU': 0,
    'M': 1,
    'TU': 2,
    'W': 3,
    'TH': 4,
    'F': 5,
    'SA': 6
}