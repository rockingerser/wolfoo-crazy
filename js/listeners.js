void function() {
    'use strict';
    var start = document.getElementById('start');
    start.addEventListener('click', e => {
        setup();
        e.target.remove();
    });
}();
