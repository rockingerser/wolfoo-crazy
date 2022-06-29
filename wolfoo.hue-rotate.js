void function() {
    document.getElementById('image-container').animate([
        {
            filter: 'hue-rotate(360deg)'
        }
    ], {
        duration: 8000,
        iterations: Infinity
    });
}();