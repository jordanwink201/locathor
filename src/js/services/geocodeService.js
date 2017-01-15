/**
 * Google Geocoding Service
 */
const geocoder = new google.maps.Geocoder();

/**
 * Reverse geocode using Google Geocoding Service
 *
 * @param latlng
 *
 * @return promise
 */
function reverseGeocode(latlng) {
    return new Promise((resolve, reject) => {
        const locationObj = { 'location': latlng };

        geocoder.geocode(locationObj, (results, status) => {
            if (status === 'OK') {
                resolve(results);
            } else {
                reject('reverse geocode status: ', status, ', results: ', results);
            }
        });
    });
}

/**
 * Reverse geocode using Google Geocoding Service
 *
 * @param position
 *
 * @return Promise
 */
function reverseGeocodeWithPosition(position) {
    return transformPosition(position)
        .then(reverseGeocode);
}

/**
 * Transform the position object to be compatible with Google Geocoding Service
 *
 * @param position
 *
 * @return promise
 */
function transformPosition(position) {
    return new Promise((resolve, reject) => {
        if (position.coords.latitude && position.coords.longitude) {
            const latlngObj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            resolve(latlngObj);
        } else {
            reject('could not get position coordinates because position: ' + position);
        }
    });
}

module.exports = {
    reverseGeocode: reverseGeocode,
    reverseGeocodeWithPosition: reverseGeocodeWithPosition,
};