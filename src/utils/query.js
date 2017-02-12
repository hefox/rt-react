import { browserHistory } from 'react-router';

/**
 * @param {Object} query
 */
export const addQuery = (query) => {
    const location = Object.assign({}, browserHistory.getCurrentLocation());
    Object.assign(location.query, query);
    window.rtHistory.push(location);
};

/**
 * @param {...String} queryNames
 */
export const removeQuery = (...queryNames) => {
    const location = Object.assign({}, browserHistory.getCurrentLocation());
    window.rtHistory.forEach(q => delete location.query[q]);
    browserHistory.push(location);
};

/**
 * @param {...String} queryNames
 */
export const goToLocation = (location) => {
  window.rtHistory.push(location);
};
