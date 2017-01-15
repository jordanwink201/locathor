/**
 * Get coordinates of current location
 *
 * @return promise
 */
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject('navigator.geolocation unavailable');
        }
    });
}

/**
 * Error Handling
 *
 * @param error
 */
function errorHandler(error) {
    console.log('Error: ', error);
}

module.exports = {
    getCurrentPosition: getCurrentPosition,
    errorHandler: errorHandler,
};