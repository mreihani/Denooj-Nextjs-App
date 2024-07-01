$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                //window.location.hash = hash;
            });
        }
    });
});

function openMenu() {
    document.getElementById('side_menu').style.right = '0';
    document.getElementById('black').style.display = 'block';
    document.getElementById('black').onclick = function () {
        closeMenu();
    };
}

function closeMenu() {
    document.getElementById('side_menu').style.right = '-300px';
    document.getElementById('black').style.display = 'none';
    document.getElementById('black').onclick = null;
}

function openFloat() {
    document.getElementById('float_window').style.bottom = '0';
    document.getElementById('black').style.display = 'block';
    document.getElementById('black').onclick = function () {
        closeFloat();
    };
}

function closeFloat() {
    document.getElementById('float_window').style.bottom = '-800px';
    document.getElementById('black').style.display = 'none';
    document.getElementById('black').onclick = null;
}
