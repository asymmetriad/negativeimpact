function enter_key(keydown) {
    if(event.key === 'Enter' && keydown.id === 'start') {
        $('label[for=dest]').show();
        $('#dest').show();
    }
}
function travel_submit() {
    $('#travel').submit(() => {
        event.preventDefault();

        $.post('/form',
               function(res, req) {
        });
    });
}

$(() => {
    travel_submit();
});
