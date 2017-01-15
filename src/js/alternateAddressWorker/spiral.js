const _ = require('lodash');

class SpiralCoords {
    constructor() {
        this.maxAlternateAddresses = 4; // Geocoding service has a limit of 4 requests
        this.alternateAddressCoords = [];
        this.stepAmt = 0.0005;
    }

    _transformCoord(lat, lng) {
        return {
            lat: lat,
            lng: lng
        }
    }

    _geocodingPrecision(num) {
        return Number(num.toFixed(6));
    }

    addCoordinates(lat, lng) {
        lat = this._geocodingPrecision(lat);
        lng = this._geocodingPrecision(lng);

        if (this.isCoordinateRecorded(lat, lng)) {
            return;
        }

        this.alternateAddressCoords.push(this._transformCoord(lat, lng));

        return this.alternateAddressCoords;
    }

    isCoordinateRecorded(lat, lng) {
        let includes = _.filter(this.alternateAddressCoords, function (elem) {
            if (_.includes(elem, lat) && _.includes(elem, lng)) {
                return true;
            }
        });

        return _.head(includes);
    }

    calculatePositionHandler(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        while (this.alternateAddressCoords.length < this.maxAlternateAddresses) {
            // addCoordinates each direction
            this.addCoordinates(lat - this.stepAmt, lng); // down
            this.addCoordinates(lat, lng + this.stepAmt); // right
            this.addCoordinates(lat + this.stepAmt, lng); // up
            this.addCoordinates(lat, lng - this.stepAmt); // left
            this.stepAmt += this.stepAmt;
        }
    }

    passCoordinates() {
        return new Promise((resolve, reject) => {
            if(this.alternateAddressCoords.length > 0) {
                resolve(this.alternateAddressCoords);
            } else {
                reject('no alternateAddressCoords')
            }
        })
    }
}

module.exports = {
    spiralCoords: SpiralCoords,
};