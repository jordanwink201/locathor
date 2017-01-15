const _ = require('lodash');

/**
 * Utility: Get the first address type specified from Geocoding service 'address_components'
 *
 * @param collection
 * @param type
 *
 * @return object
 */

function  getFirstResultOfType(collection, type) {
    return _.head(_.filter(collection, (item) => {
        return item.types.includes(type);
    }));
}

function promisifyMap(collection, cb) {
    return Promise.all(_.map(collection, (item) => {
        return cb(item);
    }));
}

module.exports = {
    _getFirstResultOfType: getFirstResultOfType,
    _promisifyMap: promisifyMap,
};