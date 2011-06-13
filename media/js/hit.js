(function($) {
    $(document).ready( function() {
        $.get('/mpd', function(json) {
            $('#title').text(json.title);
        });
    });
})(jQuery);
