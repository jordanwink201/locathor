const formAlternateAddress = require('../form/alternateAddress');

const utilityService = require('../services/utilityService');
const gAddressService = require('../services/gAddressService');

function processAlternateAddresses(gAddresses) {
    return utilityService._promisifyMap(gAddresses, gAddressService.getStreetAddressFromGAddress)
        .then((gAddresses) => utilityService._promisifyMap(gAddresses, gAddressService.transformAddress))
        .then((gAddresses) => {
            return _.map(gAddresses, (gAddress) => {
                return gAddressService.createStreetAddressFromGAddress(gAddress);
            });
        });
}

function addAlternateAddresses(transformedGAddresses) {
    _.forEach(transformedGAddresses, (transformedGAddress) => {
        formAlternateAddress.dropDownList
            .addAlternateAddress(transformedGAddress);
    });
}

module.exports = {
    processAlternateAddresses: processAlternateAddresses,
    addAlternateAddresses: addAlternateAddresses,
};