void function() {
    var container = document.getElementById('image-container');
    container.animate([
        {
            filter: 'hue-rotate(360deg)'
        }
    ], {
        duration: 8000,
        iterations: Infinity
    });
}();