$.fn.expose = function(options) {
    
    'use strict';

    var settings = $.extend({
            appendClose: true,
            allowHash: false
        }, options),

        $modal   = $(this),
        $doc     = $(document),
        $win     = $(window),
        $body    = $('body'),
        $trigger = $('a[href=#' + $(this).attr('id') + ']'),
        $close   = settings.appendClose ? $('<i class="modal_close" />') : '',

        _scrollTop = 0;
    
    // add close button to modal
    if(settings.appendClose) {
        $modal.append($close);
    }

    // open modal functionality
    $modal.on('expose:open', function() {

        // open the modal
        $modal.addClass('modal--open');

        // grab current scroll position
        _scrollTop = $(window).scrollTop();

        // set the body to fixed and position it where scrollbar was
        $body.css('top', -_scrollTop + 'px').addClass('fixed');

        // trigger "opened" callback
        $modal.trigger('expose:opened');
    });

    // close modal functionality
    $modal.on('expose:close', function() {

        // remove fixed position and set back to normal
        $body.removeClass('fixed').css('top', '');

        // position the page back to where it was
        window.scroll(0, _scrollTop);

        // close the modal
        $modal.removeClass('modal--open');

        // trigger "closed" callback
        $modal.trigger('expose:closed');
    });

    // launch modal on click
    $trigger.on('click', function(e) {

        if(!settings.allowHash) {
            e.preventDefault();
        }
        $modal.trigger('expose:open');
    });

    // close modal with close button or by clicking bg
    $modal.add($close).on('click', function(e) {

        // if it isn't the background or close button, bail
        if( e.target !== this )
            return;
        
        e.preventDefault();
        $modal.trigger('expose:close');
    });

    // close modal with ESC key
    $doc.on('keydown keyup', function(e) {

        if(e.which === 27) {
            e.preventDefault();
            $modal.trigger('expose:close');
        }
    });

    // open modal if in hash
    if(window.location.hash === '#' + $(this).attr('id') && settings.allowHash) {
        $modal.trigger('expose:open');
    }

    return this;
};