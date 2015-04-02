class Expose {
    
    constructor(modal, options) {
        
        // set up properties
        this.modal = modal;
        this.modalId = modal.dataset.expose;
        this.trigger = document.querySelector('[href="#'+ this.modalId +'"]');
        this.body = document.getElementsByTagName('body')[0];

        this.opened = false;

        this.openedEvent =
        this.closedEvent =
        this._scrollY = null;

        // extend options
        this.options = extend({
            allowHash: true
        }, options);

        // set up callbacks
        this.onOpen =
        this.onClose = function () {};
        
        // kick this thang off
        this._init();
        
        return this;
    }

    _init() {

        // add events
        this._addEvents();

        // open modal if in hash
        if(window.location.hash.split('#')[1] === this.modalId
           && this.options.allowHash) {
            this.openModal();
        }
    }
    
    _addEvents() {

        // add custom event listeners
        this.openedEvent = new Event('expose:opened');
        this.closedEvent = new Event('expose:closed');
        
        // Open modal with trigger button
        this.trigger.addEventListener('click', (e) => {
            // if we aren't allowing a hash, prevent url from being updated
            if(!this.options.allowHash) e.preventDefault();

            this.openModal();
        }, false);
        
        // Close modal with BG click
        this.modal.addEventListener('click', (e) => {
            // if we didn't click the background, bail
            if(e.target !== this.modal) return;

            this.closeModal();
        }, false);
        
        // Listen for 'ESC' key to close modal
        window.addEventListener('keyup', (e) => {
            if(this.opened && e.keyCode === 27) {
                e.preventDefault(); // this could be bad
                this.closeModal();
            }
        }, false);
    }
    
    openModal() {

        // we're open
        this.opened = true;

        // open modal
        this.modal.classList.add('modal--open');

        // on open callback
        this.onOpen();
        
        // store current scroll position
        this._scrollY = window.pageYOffset;
        
        // set body top position so it looks like it didn't move
        this.body.style.top = -this._scrollY + 'px';
        
        // set body to fixed position to prevent scrolling
        this.body.classList.add('fixed');
        
        // trigger opened event
        this.modal.dispatchEvent(this.openedEvent);
    }
    
    closeModal() {

        // we're closed
        this.opened = false;

        // remove fixed postioning
        this.body.classList.remove('fixed');
        
        // reset body top position
        this.body.style.top = '';
        
        // position page back to where it was
        window.scroll(0, this._scrollY);
        
        // close the modal
        this.modal.classList.remove('modal--open');

        // if we allowed a hash, reset it when closing
        if(this.options.allowHash) {
            // if we have the history API, remove the actual hash from the URL
            if(window.history && history.pushState) {
                history.pushState('', document.title, window.location.pathname);
            }
            else {
                window.location.hash = '';
            }
        }
        
        // trigger closed event
        this.modal.dispatchEvent(this.closedEvent);
    }
}

function extend(obj) {

    obj = obj || {};

    for(var i = 1; i < arguments.length; i++) {
        if(!arguments[i]) continue;

        for(var key in arguments[i]) {
            if(arguments[i].hasOwnProperty(key)) {
                obj[key] = arguments[i][key];
            }
        }
    }
    return obj;
}

export default Expose;