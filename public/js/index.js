function carbon_calc() {
    // Magic calculations on clicking the calculate button.
    $("#calculate").click(() => {
        let trvtype = $("#traveltype").find(":selected").val();
        let pts = 0;
        let dist = $("#distance").val();
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
        }
        else if(trvtype == "Plane") {
            pts = (-10 * dist) / 3;
        }
        alert(pts);
        let user_travel = {
            distance: dist,
            travel_type: trvtype,
            points: pts
        };
    });
}

$(() => {
    carbon_calc();
});
