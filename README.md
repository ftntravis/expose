Expose Modal
============

An easy to use modal that responds to it's environment. Documentation coming soon.

## Installation

    npm install expose-modal --save

## Usage

    var Expose = require('expose-modal');
    
    // Init Multiple Modals
    var modals = document.querySelectorAll('[data-expose]');

    for(var i = modals.length; i--;) {
        
        var expose = new Expose(modals[i]);

        // listen for modal open/close
        expose.modal.addEventListener('expose:opened', onModalOpen, false);
        expose.modal.addEventListener('expose:closed', onModalClose, false);
        
        // close modal with cancel button
        expose.modal.querySelector('.modal_cancel').addEventListener('click', closeModal.bind(expose), false);
    }

    function onModalOpen() {
        //console.log('modal opened');
    }

    function onModalClose() {
        //console.log('modal closed');
    }

    function closeModal() {
        this.closeModal();
    }


## Release History

* 0.1.0 Initial release