function carbon_calc() {
    // Magic calculations on clicking the calculate button.
    $('#travel').submit(() => {
        event.preventDefault();
        let trvtype = $("#traveltype").find(":selected").val();
        let pts = 0;
        let dist = $("#distance").val();
        let pollution = 0;
        let alts = '';
        if(trvtype == "Walk") {
            pts = (15 * dist) / 3;
            alts = 'None! But you can decrease your carbon footprint in these other ways listed below:';
            $('#useroutput').wrap('<a href="https://carbonfund.org/take-action/individuals/">');
        }
        else if(trvtype == "Bicycle") {
            pts = (12 * dist) / 4;
            alts = 'You could walk instead. Bicycles don\'t pollute directly, but they are made in factories that do.';
        }
        else if(trvtype == "Train") {
            pts = (8 * dist) / 5;
            //alts = ;
        }
        else if(trvtype == "Bus") {
            pts = (3 * dist) / 6;
        }
        else if(trvtype == "Car") {
            pts = (-5 * dist) / 4;
            // Pretty terrible estimate.
            pollution = dist * 1/20;
        }
        let user_travel = {
            distance: dist,
            travel_type: trvtype,
            points: pts
        };
        $("#useroutput").text("You traveled " + user_travel.distance + " miles, and by " + user_travel.travel_type + " which used " + pollution + " gallons of fuel and gives you " + user_travel.points + " points. \n" + "You may want to consider these alternative methods of travel: \n" + alts);
        $.post('/form',
               user_travel,
               function(res, req) {
            alert(req);
        });
    });
}

$(() => {
    carbon_calc();
});
