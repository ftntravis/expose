+(function($) {

    var $popup = $('#Popup').expose({
        allowHash: true
    });

    // Trigger Events
    //$popup.trigger('expose:open');

    // Example Callbacks
    $popup.on(
        'expose:opened', function () {
            console.log('Modal Opened!');
        },
        'expose:closed', function () {
            console.log('Modal Closed!');
        }
    );

    // Example Cancel Button
    $('.modal_cancel').on('click', function (e) {
        e.preventDefault();
        $(this).trigger('expose:close');
    });

}(jQuery));