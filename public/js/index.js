function carbon_calc() {
    // Magic calculations on clicking the calculate button.
    $("#calculate").click(() => {
        let trvtype = $("#traveltype").find(":selected").val();
        let pts = 0;
        let dist = $("#distance").val();
        let pollution = 0;
        if(trvtype == "Walk") {
            pts = (15 * dist) / 3;
        }
        else if(trvtype == "Bicycle") {
            pts = (12 * dist) / 4;
        }
        else if(trvtype == "Train") {
            pts = (8 * dist) / 5;
        }
        else if(trvtype == "Bus") {
            pts = (3 * dist) / 6;
        }
        else if(trvtype == "Car") {
            pts = (-5 * dist) / 4;
            pollution = dist * 1/20;
        }
        let user_travel = {
            distance: dist,
            travel_type: trvtype,
            points: pts
        };
        $("#useroutput").text("You traveled " + user_travel.distance + " miles, and by" + user_travel.travel_type + " which used " + pollution + "gallons of fuel and gives you " + user_travel.points + ".");
    });
}

$(() => {
    carbon_calc();
});
