void function() {
    'use strict';
    setTimeout(function() {
        var a = document.getElementsByTagName('a');
        for (var me of a)
            me.classList.add('non-grabbable');
    }, 1000);
}();
