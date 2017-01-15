const _ = require('lodash');
const $ = require('jquery');
const config = require('../config/geocode');

/**
 * Auto-completion for form of input type html elements
 *
 * @param addressData
 * @param dom_id
 *
 * @return object
 */
function inputTypeMapper(addressData) {
    let inputVal = addressData.long_name;

    $('#' + addressData.dom_id).val(inputVal.trim());
}

/**
 * Auto-completion for form of select type html elements
 *
 * @param addressData
 * @param mappedVal
 * @param dom_id
 *
 * @return object
 */
function selectTypeMapper(addressData) {
    let domElementOptionsCollection = '#' + addressData.dom_id + ' > option';
    let optionFound;

    // TODO: refactor
    $(domElementOptionsCollection).each((idx, item) => {
        // determine if the select box is using the short name or the long name and use the corresponding
        if (item.value === addressData.short_name) {
            optionFound = addressData.short_name;
            return false;
        }
        if (item.value === addressData.long_name) {
            optionFound = addressData.long_name;
            return false;
        }
    });

    $('#' + addressData.dom_id).val(optionFound);
}

module.exports = {
    input: inputTypeMapper,
    select: selectTypeMapper,
}