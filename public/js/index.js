function enter_key(keydown) {
    if (event.key === 'Enter' && keydown.id === 'start') {
        $('label[for=dest]').show();
        $('#dest').show();
    }
    else if (event.key === 'Enter' && keydown.id === 'dest') {
        $('#calculate').show();
    }
    else if (event.key === 'Enter' && keydown.id === 'startlat') {
        $('label[for=startlong]').show();
        $('#startlong').show();
    }
    else if (event.key === 'Enter' && keydown.id === 'startlong') {
        $('label[for=endlat]').show();
        $('#endlat').show();
    }
    else if (event.key === 'Enter' && keydown.id === 'endlat') {
        $('label[for=endlong]').show();
        $('#endlong').show();
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

            let sinlat = to_radians(end_lat - start_lat);
            let sinlong = to_radians(end_long - start_long);
            let coslat1 = to_radians(start_lat);
            let coslat2 = to_radians(end_lat);
            // The square of half the chord length between the two points.
            let sqr_half_chord = Math.pow(Math.sin(sinlat / 2), 2) +
                Math.cos(coslat1) * Math.cos(coslat2) * Math.pow(Math.sin(sinlong / 2), 2);
            let angular_dist = 2 *
                Math.atan2(Math.sqrt(sqr_half_chord),
                    Math.sqrt(1 - sqr_half_chord));
            let distance = earth_radius * angular_dist;
            alert(distance);
        }

        $.post('/form',
            function(res, req) {});
    });
}

$(() => {
    direct_trip_chk();
    travel_submit();
});
