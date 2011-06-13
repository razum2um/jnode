(function($) {
    $(document).ready( function() {
        function _poll() {
            // date updater
            $.get('/date', function(json) {
                $('#date').text(json.date);
                _poll();
            });
        };
        _poll();
    });
})(jQuery);
