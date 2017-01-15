const _ = require('lodash');
const $ = require('jquery');

const locationService = require('./services/locationService');
const geocodeService = require('./services/geocodeService');
const gAddressService = require('./services/gAddressService');
const utilityService = require('./services/utilityService');

const formInterface = require('./form/formInterface');
const SpiralInterface = require('./alternateAddressWorker/spiral');
const spiralCtrl = require('./alternateAddressWorker/spiralCtrl');

const spiralCoords = new SpiralInterface.spiralCoords();

// Detector icon on
$('#enable_detector').click(eventHandler);

// Auto-complete form
function eventHandler(evt) {
    evt.preventDefault();

    autoCompleteAddress();
    // fetchAlternateAddresses();
}

// function fetchAlternateAddresses() {
//     return locationService.getCurrentPosition()
//         .then(spiralCoords.calculatePositionHandler.bind(spiralCoords))
//         .then(spiralCoords.passCoordinates.bind(spiralCoords))
//         .then((alternateAddressCoords) => utilityService._promisifyMap(alternateAddressCoords, geocodeService.reverseGeocode))
//         .then(spiralCtrl.processAlternateAddresses)
//         .then(spiralCtrl.addAlternateAddresses);
// }

function autoCompleteAddress() {
    return locationService.getCurrentPosition()
        .then(geocodeService.reverseGeocodeWithPosition)
        .then(gAddressService.getStreetAddressFromGAddress)
        .then(gAddressService.transformAddress)
        .then(formInterface.autoCompleteForm)
        .catch(locationService.errorHandler);
}
