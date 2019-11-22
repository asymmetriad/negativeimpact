function carbon_calc() {
    // Magic calculations on clicking the calculate button.
    $('#travel').submit(() => {
        event.preventDefault();
        $.post('/form',
               function(res, req) {
        });
    });
}

$(() => {
    carbon_calc();
});
