void function() {
    'use strict';
    // step length of the Wolfoo characters
    var moveSpeed = 100 * 2;
    var root = (document.domain !== '127.0.0.1' && document.domain !== 'localhost') ? 'https://rockingerser.github.io/wolfoo-crazy/' : '';
    function collideHTML(el0, el1) {
        var elY0 = (el0.offsetTop < el1.offsetTop)? el0 : el1;
        var elY1 = (el0 != elY0)? el0 : el1;
        var yInstersection = (elY0.offsetTop + elY0.offsetHeight) - elY1.offsetTop > 0;

        var elX0 = (el0.offsetLeft < el1.offsetLeft)? el0 : el1;
        var elX1 = (el0 != elX0)? el0 : el1;
        var xInstersection = (elX0.offsetLeft + elX0.offsetWidth) - elX1.offsetLeft > 0;

        return xInstersection && yInstersection;
    }
    var matrix3d = [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
    var LICENSE = document.createElement('div');
    LICENSE.id = 'license';
    LICENSE.innerHTML = '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"></a>This work is licensed under a&nbsp;<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.';
    document.body.appendChild(LICENSE);
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = root + 'index.css';
    document.head.appendChild(link);
    var spawnSpeed = 5000;
    /**
     * Returns a random item in an Array.
     * @param {Array} array The selected Array.
     */
    function random(array) {
        if (array instanceof Array)
            return array[Math.floor(Math.random() * array.length)];
        throw new TypeError('Make sure this is an Array');
    }
    /**
     * Get a CSS variable.
     * @param {String} variable CSS var to get.
     * @returns {String} The value of the var.
     * @deprecated
     */
    function CSSVar(variable, set) {
        var computed = getComputedStyle(document.documentElement);
        if (set != undefined)
            computed.setProperty(variable, set);
        return computed.getPropertyValue(variable);
    }
    var glideSpeed = 600;
    /**
     * Starts everything.
     */
    function setup() {
        // Spawn characters
        setInterval(function() {
            var character = random(chars.available);
            var div = document.createElement('div');
            div.classList = 'wolfoo-character-container non-grabbable';
            div.title = character;
            div.innerHTML = `<img src="${random(chars[character])}" class="non-grabbable"><span class="non-grabbable">${character}</span>`;
            div.pig = new Audio('characters/sounds/pig.wav');
            div.x = Math.random() * document.documentElement.scrollWidth;
            div.y = Math.random() * document.documentElement.scrollHeight;
            document.body.appendChild(div);
        }, spawnSpeed);

        // Glide characters
        setInterval(function() {
            for (var me of document.querySelectorAll('.wolfoo-character-container')) {
                var moveLeft = -moveSpeed + Math.random() * (moveSpeed * 2);
                var moveTop = -moveSpeed + Math.random() * (moveSpeed * 2);
                var lastValue = me.x;
                me.x += moveLeft;
                if (me.x > document.documentElement.scrollWidth || me.x < 0)
                    me.x = lastValue;
                lastValue = me.y;
                me.y += moveTop;
                if (me.y > document.documentElement.scrollHeight || me.y < 0)
                    me.y = lastValue;
                me.style.left = me.x - (me.offsetWidth / 2) + 'px';
                me.style.top = me.y - (me.offsetHeight / 2) + 'px';
            }
        }, glideSpeed);
        setInterval(function() {
            var offset3d = 0.000002;
            for (var me of document.body.querySelectorAll('.wolfoo-character-container')) {
                var grabbable = document.body.querySelectorAll('*');
                for (var el of grabbable) {
                    if (el.className.includes('non-grabbable') || el.children.length >= 5)
                        continue;
                    if (el.grabbedBy) {
                        el.style.position = 'absolute';
                        el.style.left = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.relX + 'px';
                        el.style.top = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.relY + 'px';
                        if (Math.random() < 0.01) {
                            el.grabbedBy = null;
                            el.classList.remove('grabbed');
                        }
                        continue;
                    }
                    if (!el.className.includes('grabbed') && Math.random() < 0.01 && collideHTML(el, me)) {
                        el.classList += ((el.className.length) ? ' ' : '') + 'grabbed';
                        el.grabbedBy = me;
                        el.position = el.style.position || 'static';
                        el.relX = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.offsetLeft;
                        el.relY = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.offsetTop;
                    }
                }
                if (Math.random() < 0.1)
                    me.pig.play();
            }
        }, 1000 / 10)
    }
    var chars = fetch(root + 'characters/manifest.json').then(j=>j.json()).then(j=>{
        chars = j;
        setup();
    });
}();