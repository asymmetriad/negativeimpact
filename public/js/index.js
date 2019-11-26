function enter_key(keydown) {
    if (event.key === 'Enter' && keydown.id === 'start') {
        $('label[for=dest]').show();
        $('#dest').show();
    }
    else if (event.key === 'Enter' && keydown.id === 'dest') {
        $('#calculate').show();
    }
}

function direct_trip_chk() {
    $('#direct_trip[type=checkbox]').click(() => {

        if ($('#direct_trip[type=checkbox]').prop('checked')) {
            $('label[for=dest]').hide();
            $('#dest').hide();
            $('label[for=start]').hide();
            $('#start').hide();

            $('label[for=startlat]').show();
            $('#startlat').show();
            $('label[for=startlong]').show();
            $('#startlong').show();
            $('label[for=endlat]').show();
            $('#endlat').show();
            $('label[for=endlong]').show();
            $('#endlong').show();

            $('#startlat').prop('required',true);
            $('#startlong').prop('required',true);
            $('#endlat').prop('required',true);
            $('#endlong').prop('required',true);

            $('#dest').prop('required',false);
            $('#start').prop('required',false);

            $('#calculate').show();

        } else {
            $('label[for=start]').show();
            $('#start').show();

            $('label[for=startlat]').hide();
            $('#startlat').hide();
            $('label[for=startlong]').hide();
            $('#startlong').hide();

            $('label[for=endlat]').hide();
            $('#endlat').hide();
            $('label[for=endlong]').hide();
            $('#endlong').hide();

            $('#calculate').hide();
            $('#startlat').prop('required',false);
            $('#startlong').prop('required',false);
            $('#endlat').prop('required',false);
            $('#endlong').prop('required',false);

            $('#dest').prop('required',true);
            $('#start').prop('required',true);
        }
    });
}

function to_radians(degrees) {
    return (degrees * (Math.PI / 180));
}

function travel_submit() {
    $('#travel').submit(() => {
        // Prevent default page behavior, like reloading the page.
        event.preventDefault();
        if ($('#direct_trip[type=checkbox]').prop('checked')) {
            // Haversine formula.
            // The earth's mean radius in miles.
            let earth_radius = 3958.7613;
            // User input.
            let start_lat = $('#startlat').val();
            let start_long = $('#startlong').val();
            let end_lat = $('#endlat').val();
            let end_long = $('#endlong').val();

            let diff_rad_lat = to_radians(end_lat - start_lat);
            let diff_rad_long = to_radians(end_long - start_long);
            let start_rad_lat = to_radians(start_lat);
            let end_rad_lat = to_radians(end_lat);
            // The square of half the chord length between the two points.
            let sqr_half_chord = Math.pow(Math.sin(diff_rad_lat / 2), 2) +
                Math.cos(start_rad_lat) * Math.cos(end_rad_lat) *
                Math.pow(Math.sin(diff_rad_long / 2), 2);
            let angular_dist = 2 *
                Math.atan2(Math.sqrt(sqr_half_chord),
                    Math.sqrt(1 - sqr_half_chord));
            let distance = earth_radius * angular_dist;

            $('#useroutput').empty().append(distance).append('<br> <a href="https://en.reset.org/act/reduce-your-ecological-footprint-0">Want to check out other ways to reduce your impact on the globe?</a>');
        }

        $.post('/form',
            function(res, req) {});
    });
}

$(() => {
    direct_trip_chk();
    travel_submit();
});
