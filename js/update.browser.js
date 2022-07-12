void function() {
    if (navigator.userAgent.indexOf('MSIE') !== -1) {
        var update = document.createElement('p');
        update.id = 'update-browser';
        update.classList = 'box';
        update.textContent = 'Update or change your browser, Internet Explorer may display this page and scripts incorrectly.';
        document.getElementById('info').appendChild(update);
    }
}();
