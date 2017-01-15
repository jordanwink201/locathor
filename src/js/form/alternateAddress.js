const $ = require('jquery');

// TODO: refactor
// Close the dropdown menu if the user clicks outside of it
window.onclick = (event) => {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

class AddressSelector {
    constructor() {
        this.addressInputField = $('#address');
        this.config = {
            height: this.addressInputField.outerHeight(),
            borderRadius: this.addressInputField.css('border-radius'),
            offset: '30px',
        };
    }

    getConfig() {
        return this.config;
    }

    getAddressInputField() {
        return this.addressInputField;
    }
}

class InputAddressSelector extends AddressSelector {
    constructor() {
        super();

        const config = super.getConfig();
        this._transformExistingAddressInputField(config);
    }

    _transformExistingAddressInputField(config) {
        this.addressInputField.css('paddingRight', config.offset);
        this.addressInputField.css('display', 'inline-block');

        return this;
    }
}

class SelectButton extends AddressSelector {
    constructor() {
        super();

        const config = super.getConfig();
        this.selectButton = $('<button id="sideButton" class="dropbtn" type="button">&#9662;</button>');
        this._transformSelectButton(config);
    }

    _transformSelectButton(config) {
        this.selectButton.css('position', 'absolute');
        this.selectButton.css('width', config.offset);
        this.selectButton.css('height', config.height);
        this.selectButton.css('margin-left', '-' + config.offset);
        this.selectButton.css('border-top-right-radius', config.borderRadius);
        this.selectButton.css('border-bottom-right-radius', config.borderRadius);

        return this;
    }

    addEvt(evt) {
        this.selectButton.click(evt);

        return this;
    }

    addToElement(element) {
        element.after(this.selectButton);

        return this;
    }
}

// Create list of alternate addresses
class DropDownList extends AddressSelector {
    constructor() {
        super();

        this.addressInputField = super.getAddressInputField();
        this.addressList = $('<div id="myDropdown" class="dropdown-content" />');
    }

    toggleAddressList() {
        this.addressList.toggleClass('show');

        return this;
    }

    addAlternateAddress(address) {
        const listItem = $('<a href="#" class="addressListItem" />');

        // TODO: check if 'street_address' is on the object or not
        const streetAddress = address.street_address;

        listItem.text(streetAddress)
                .click(this._addressSelectEvent.bind(this))
                .appendTo(this.addressList);

        return this;
    }

    _addressSelectEvent(evt) {
        let selectedAddress = evt.target.textContent;

        this.addressInputField.val(selectedAddress);
    }

    addToElement(element) {
        element.after(this.addressList);

        return this;
    }
}

const inputAddressSelector = new InputAddressSelector();
const selectButton = new SelectButton();
const dropDownList = new DropDownList();

function setup() {
    dropDownList.addToElement(inputAddressSelector.addressInputField);
    selectButton.addToElement(inputAddressSelector.addressInputField);
    selectButton.addEvt(dropDownList.toggleAddressList.bind(dropDownList));
}

setup();

module.exports = {
    dropDownList: dropDownList
}
