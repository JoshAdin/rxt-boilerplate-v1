// can't use this, it will result in a stack trace error
// import moment from 'moment';

// In other to actually mock out the given library we have to get the lib model itself
const moment = require.requireActual('moment');

// timestamp default 0, so we can force a specific point in time if no timestamp is provided
export default (timestamp = 0) => {
    return moment(timestamp);
}