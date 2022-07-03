void function() {
    'use strict';
    var a = document.getElementsByTagName('a');
    for (var me of a)
        me.classList.add('non-grabbable');
}();