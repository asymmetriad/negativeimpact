function carbon_calc() {
    // Magic calculations on clicking the calculate button.
    $("#calculate").click(() => {
        let gas_pollution = $("#distance").val();
    });
}

$(() => {
    carbon_calc();
});
