void function() {
    'use strict';
    var settings;
    /**
     * Convert radians to degrees.
     * @param {Number} rad Radians.
     * @returns {Number} Number in degrees.
     * @deprecated
     */
    function deg(rad) {
        return rad * (180 / Math.PI);
    }
    /**
     * Convert degrees to radians.
     * @param {Number} rad Degrees.
     * @returns {Number} Number in radians.
     */
    function rad(deg) {
        return deg * (Math.PI / 180);
    }
    try {
        settings = wolfooCrazy;
    } catch (e) {
        settings = {
            'render-speed': 1000 / 60,
            '-agent-speed': 1,
            '-agent-rotate-speed': 25,
            '-agent-drag-background-color': 'rgba(0, 255, 0, 0.2)',
            '-agent-drag-outline-color': 'rgba(0, 255, 0, 0.4)',
            '-agent-drag-outline-width': '4px',
            '-agent-drag-outline-style': 'solid'
        };
        try {
            var _import_ = document.getElementById('import');
            _import_.textContent = _import_.textContent.replaceAll('/* @wolfoo-crazy-default */', 'var wolfooCrazy = ' + JSON.stringify(settings, null, 4) + ';');
        } catch (e) {alert(e)}
    }
    if (document.domain !== 'rockingerser.github.io') {
        var credits = document.createElement('div');
        credits.id = 'credits';
        credits.innerHTML = '<p>Wolfoo&nbsp;Crazy:&nbsp;Author:&nbsp;Rockingerser(scratcher_userOH),&nbsp;Script:&nbsp;<a class="show-link" href="https://rockingerser.github.io/wolfoo-crazy/"></a>&nbsp;Characters:&nbsp;<a class="show-link" href="https://scratch.mit.edu/projects/563550882/"></a></p>';
        document.body.appendChild(credits);
    }
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
     */
    function CSSVar(variable, set) {
        if (set != undefined)
            document.documentElement.style.setProperty(variable, set);
        return getComputedStyle(document.documentElement).getPropertyValue(variable);
    }
    CSSVar('--agent-drag-background-color', settings['-agent-drag-background-color']);
    CSSVar('--agent-drag-outline-color', settings['-agent-drag-outline-color']);
    CSSVar('--agent-drag-outline-width', settings['-agent-drag-outline-width']);
    CSSVar('--agent-drag-outline-style', settings['-agent-drag-outline-style']);
    CSSVar('--glide-transition', settings['render-speed'] + 'ms');
    /**
     * Starts everything.
     */
    function setup() {
        // Spawn characters
        function spawnChar() {
            var character = random(chars.available);
            var div = document.createElement('div');
            div.classList = 'wolfoo-character-container non-grabbable';
            div.title = character;
            div.innerHTML = `<img src="${random(chars[character])}" class="non-grabbable"><span class="non-grabbable">${character}</span>`;
            div.pig = new Audio(root +'characters/sounds/pig.wav');
            div.x = Math.random() * document.documentElement.scrollWidth;
            div.y = Math.random() * document.documentElement.scrollHeight;
            div.myDir = Math.random() * 360;
            document.body.appendChild(div);
            setTimeout(()=>requestAnimationFrame(spawnChar), spawnSpeed);
        }
        spawnChar();

        // Glide characters
        function glideAll() {
            var rotSpeed = settings['-agent-rotate-speed'] * (settings['render-speed'] / (1000 / 60)),
                moveSpeed = settings['-agent-speed'] * 4 * (settings['render-speed'] / (1000 / 60));
            for (var me of document.querySelectorAll('.wolfoo-character-container')) {
                me.myDir += -rotSpeed + Math.random() * (rotSpeed * 2);
                me.myDir = me.myDir % 360;
                var lastValue = me.x;
                me.x += Math.cos(rad(me.myDir)) * moveSpeed;
                if (me.x > document.documentElement.scrollWidth || me.x < 0)
                    me.x = lastValue;
                lastValue = me.y;
                me.y += Math.sin(rad(me.myDir)) * moveSpeed;
                if (me.y > document.documentElement.scrollHeight || me.y < 0)
                    me.y = lastValue;
                me.style.left = me.x - (me.offsetWidth / 2) + 'px';
                me.style.top = me.y - (me.offsetHeight / 2) + 'px';
                me.querySelector('img').style.transform = `rotateY(${(me.myDir < 270 && me.myDir >= 90) ? 180 : 0}deg)`;
            }
            setTimeout(()=>requestAnimationFrame(glideAll), settings['render-speed']);
        }
        glideAll();

        // Set behavior of the characters
        function renderAll() {
            for (var me of document.body.querySelectorAll('.wolfoo-character-container')) {
                var grabbable = document.body.querySelectorAll('*');
                for (var el of grabbable) {
                    if (!el.className.includes)
                        el.className.includes = function() {
                            return false;
                        };
                    if (el.className.includes('non-grabbable') || el.children.length >= 5)
                        continue;
                    if (el.grabbedBy) {
                        el.style.position = 'absolute';
                        el.style.left = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.relX + 'px';
                        el.style.top = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.relY + 'px';
                        if (Math.random() < 0.01 * (settings['render-speed'] / (1000 / 60))) {
                            el.grabbedBy = null;
                            el.classList.remove('grabbed');
                        }
                        continue;
                    }
                    if (!el.className.includes('grabbed') && Math.random() < 0.01 * (settings['render-speed'] / (1000 / 60)) && collideHTML(el, me)) {
                        el.classList += ((el.className.length) ? ' ' : '') + 'grabbed';
                        el.grabbedBy = me;
                        el.position = el.style.position || 'static';
                        el.relX = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.offsetLeft;
                        el.relY = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.offsetTop;
                    }
                }
                if (Math.random() < 0.1 * (settings['render-speed'] / (1000 / 60)))
                    me.pig.play();
            }
            setTimeout(()=>requestAnimationFrame(renderAll), settings['render-speed']);
        }
        renderAll();
    }
    var chars = fetch(root + 'characters/manifest.json').then(j=>j.json()).then(j=>{
        chars = j;
        setup();
    });
}();