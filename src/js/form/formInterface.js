const _ = require('lodash');
const config = require('../config/geocode');
const domElementTypeMapper = require('./elementTypeMapper');

/**
 * Fill form with computed address data
 *
 * @param results
 *
 * @return object
 */

function autoCompleteForm(addressData) {
    const addressItems = extractGData(addressData);

    _.each(addressItems, (item) => {
        // only need to check if dom type is select -> assume it's an input type
        if (item.dom_type === 'select') {
            domElementTypeMapper.select(item);
        } else {
            domElementTypeMapper.input(item);
        }
    });
}

function extractGData(addressData) {
    const configCollection = config.configCollection;

    return _.map(configCollection, (configItem) => {
        // ex: GS_id: ['street_number', 'route'] => will be `street_number` + `route`
        if (Array.isArray(configItem.GS_id)) {
            let gAddressData = {
                short_name: '',
                long_name: '',
            };

            _.each(configItem.GS_id, (id) => {
                gAddressData['short_name'] += ' ' + addressData[id]['short_name'];
                gAddressData['long_name'] += ' ' + addressData[id]['long_name'];
            });

            _.assignIn(configItem, gAddressData);
        } else {
            _.assignIn(configItem, addressData[configItem.GS_id]);
        }

        return configItem;
    });
}

module.exports = {
    autoCompleteForm: autoCompleteForm,
};