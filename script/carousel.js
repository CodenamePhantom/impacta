$(document).ready(() => {
    $('#carousel > img:gt(0)').hide();

    setInterval(() => {
        $('#carousel > img:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#carousel');
    }, 4000);
})