const _ = require('lodash');

const clientConfig = {
    /**
     * Auto-completion for form of input type html elements
     *
     * @param string dom_id : form element id
     * @param string dom_type : form element type
     * @param string || array[string] GS_id : Google Services address type
     *
     * NOTE
     * To concatenate multiple GS elements, use an array for `GS_id`
     * ex: GS_id: ['street_number', 'route'] => will be `street_number` + `route`
     *
     * CAUTION
     * `GS_id` must map to the correct property in the returned Google Address
     */
    collection: [
        {
            dom_id: 'address-country',
            dom_type: 'select',
            GS_id: 'country',
        },
        {
            dom_id: 'shipping-addressLine1',
            dom_type: 'input',
            GS_id: ['street_number', 'route'],
        },
        {
            dom_id: 'shipping-city',
            dom_type: 'input',
            GS_id: 'locality',
        },
        {
            dom_id: 'address-province',
            dom_type: 'select',
            GS_id: 'administrative_area_level_1',
        },
        {
            dom_id: 'shipping-postCode',
            dom_type: 'input',
            GS_id: 'postal_code',
        },
    ]
};

class ConfigItem {
    constructor(dom_id, dom_type, GS_id) {
        this.dom_id = dom_id;
        this.dom_type = dom_type;
        this.GS_id = GS_id;
    }
}

class ConfigItemCollection {
    constructor() {
        this.elementCollection = [];
        this.generate();
    }

    generate() {
        _.each(clientConfig.collection, (item) => {
            const collectionItem = new ConfigItem(item.dom_id, item.dom_type, item.GS_id);
            this.elementCollection.push(collectionItem);
        });
    }

    getConfigItemCollection() {
        return this.elementCollection;
    }
}

module.exports = {
    configCollection: new ConfigItemCollection().getConfigItemCollection()
};