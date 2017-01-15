const _ = require('lodash');

const utilityService = require('./utilityService');

/**
 * Get the type of 'street_address' from the Geocoding service response if it exists (cannot auto-complete street number/name if this doesn't exist)
 *
 * @param results
 *
 * @return object
 */
function getStreetAddressFromGAddress(results) {
    const streetAddress = utilityService._getFirstResultOfType(results, 'street_address');

    return new Promise((resolve, reject) => {
        if (streetAddress) {
            resolve(streetAddress['address_components']);
        } else {
            reject('FAILED EXECUTION: Cannot get specific type of street_address from GAddress so cannot get street name/number');
        }
    });
}

// get most specific address possible

// will there always be

function transformAddress(addressComponents) {
    let createdAddress = {};

    if (addressComponents) {
        createdAddress.street_number = utilityService._getFirstResultOfType(addressComponents, 'street_number');
        createdAddress.route = utilityService._getFirstResultOfType(addressComponents, 'route');
        createdAddress.locality = utilityService._getFirstResultOfType(addressComponents, 'locality');
        createdAddress.administrative_area_level_1 = utilityService._getFirstResultOfType(addressComponents, 'administrative_area_level_1');
        createdAddress.country = utilityService._getFirstResultOfType(addressComponents, 'country');
        createdAddress.postal_code = utilityService._getFirstResultOfType(addressComponents, 'postal_code');
    }

    return new Promise((resolve, reject) => {
        if (createdAddress) {
            resolve(createdAddress);
        } else {
            reject('no street address available');
        }
    });
}

function createStreetAddressFromGAddress(address) {
    const streetNumber = address['street_number'];
    const streetName = address['route'];

    // add key of 'street_address' to address object
    address['street_address'] = streetNumber + ' ' + streetName;

    return address;
}

module.exports = {
    getStreetAddressFromGAddress: getStreetAddressFromGAddress,
    transformAddress: transformAddress,
    createStreetAddressFromGAddress: createStreetAddressFromGAddress,
};