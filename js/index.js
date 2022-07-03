void function() {
    'use strict';
    function msg(data, type) {
        for (var ln of data) {
            var msg = document.createComment(ln);
            console[type](msg);
        }
    }
    console.HTML = {
        debug: function(...data) {
            msg(data, 'debug');
        },
        error: function(...data) {
            msg(data, 'error');
        },
        info: function(...data) {
            msg(data, 'info');
        },
        log: function(...data) {
            msg(data, 'log');
        },
        warn: function(...data) {
            msg(data, 'warn');
        }
    }
    console.HTML.log(' This is Developer tools. ', ' If you don\'t know what are you doing here, please close this window. ');
    var settings;
    var root = (document.domain !== '127.0.0.1' && document.domain !== 'localhost') ? 'https://rockingerser.github.io/wolfoo-crazy/' : '';
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
            '-agent-speed': 2,
            '-agent-rotate-speed': 25,
            '-agent-drag-background-color': 'rgba(0, 255, 0, 0.2)',
            '-agent-drag-outline-color': 'rgba(0, 255, 0, 0.4)',
            '-agent-drag-outline-width': '4px',
            '-agent-drag-outline-style': 'solid'
        };
        try {
            var _import_ = document.getElementById('import');
            _import_.textContent = _import_.textContent.replaceAll('/* @wolfoo-crazy-default */', 'var wolfooCrazy = ' + JSON.stringify(settings, null, 4) + ';');
        } catch (e) { alert(e) }
    }
    if (document.domain !== 'rockingerser.github.io') {
        var credits = document.createElement('div');
        credits.id = 'credits';
        credits.classList = 'wolfoo-fixed-block';
        credits.innerHTML = '<p>Wolfoo&nbsp;Crazy:&nbsp;Author:&nbsp;Rockingerser(scratcher_userOH),&nbsp;Script:&nbsp;<a class="show-link" href="https://rockingerser.github.io/wolfoo-crazy/"></a>&nbsp;Characters:&nbsp;<a class="show-link" href="https://scratch.mit.edu/projects/563550882/"></a></p>';
        document.body.appendChild(credits);
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = root + 'style/wolfoo.crazy.css';
        document.head.appendChild(link);
    }
    function collideHTML(el0, el1) {
        var elX0 = (el0.offsetLeft < el1.offsetLeft) ? el0 : el1;
        var elX1 = (el0 != elX0) ? el0 : el1;
        var xInstersection = (elX0.offsetLeft + elX0.offsetWidth) - elX1.offsetLeft > 0;

        var elY0 = (el0.offsetTop < el1.offsetTop) ? el0 : el1;
        var elY1 = (el0 != elY0) ? el0 : el1;
        var yInstersection = (elY0.offsetTop + elY0.offsetHeight) - elY1.offsetTop > 0;

        return xInstersection && yInstersection;
    }
    var LICENSE = document.createElement('div');
    LICENSE.id = 'license';
    LICENSE.classList = 'wolfoo-fixed-block';
    LICENSE.innerHTML = '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"></a>This work is licensed under a&nbsp;<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.';
    document.body.appendChild(LICENSE);
    var spawnSpeed = 5000;
    /**
     * Returns a random item in an Array.
     * @param {Array} array The selected Array.
     */
    function random(array) {
        if (array instanceof Array)
            return array[Math.floor(Math.random() * array.length)];
        throw new TypeError(`Make sure ${typeof array} this is an Array`);
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
            var character = random(manifest.available);
            var div = document.createElement('div');
            div.classList = 'wolfoo-character-container non-grabbable';
            div.innerHTML = manifest['agent-html'];
            div.title = div.name = character;
            div.querySelector('.wolfoo-character').src = root + 'characters/svg/' + random(manifest[character]);
            div.querySelector('.wolfoo-character-name').textContent = character;
            div.pig = new Audio(root + 'characters/sounds/pig.wav');
            div.goRandomPos = function () {
                div.x = (div.offsetWidth / 2) + Math.random() * (document.documentElement.scrollWidth - div.offsetWidth);
                div.y = (div.offsetHeight / 2) + Math.random() * (document.documentElement.scrollHeight - div.offsetHeight);
            };
            div.goRandomPos();
            div.direction = Math.random() * 360;
            div.stuck = 0;
            document.body.appendChild(div);
            setTimeout(() => requestAnimationFrame(spawnChar), spawnSpeed);
        }
        spawnChar();

        // render characters
        function renderAll() {
            var rotSpeed = settings['-agent-rotate-speed'] * (settings['render-speed'] / (1000 / 60)),
                moveSpeed = settings['-agent-speed'] * 4 * (settings['render-speed'] / (1000 / 60));
            var grabbable = Array.from(document.body.querySelectorAll('*'));
            grabbable = grabbable.filter(el => (!el.className.includes || !el.className.includes('non-grabbable')) && el.children.length <= 5);
            var grabbed = grabbable.filter(el => el.grabbedBy);
            for (var el of grabbed) {
                el.style.left = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.relX + 'px';
                el.style.top = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.relY + 'px';
                if (Math.random() < 0.001 * (settings['render-speed'] / (1000 / 60)))
                    el.click();
                if (Math.random() < 0.01 * (settings['render-speed'] / (1000 / 60))) {
                    el.grabbedBy = null;
                    el.classList.remove('grabbed');
                }
            }
            for (var me of document.querySelectorAll('.wolfoo-character-container')) {
                me.direction += -rotSpeed + Math.random() * (rotSpeed * 2);
                me.direction = ((me.direction < 0) ? me.direction + 360 : me.direction) % 360;
                var lastValue = me.x;
                me.x += Math.cos(rad(me.direction)) * moveSpeed;
                if (me.x + (me.offsetWidth / 2) > document.documentElement.scrollWidth || me.x - (me.offsetWidth / 2) < 0) {
                    me.x = lastValue;
                    me.direction = 180 - me.direction;
                    me.stuck++;
                } else
                    me.stuck = 0;
                lastValue = me.y;
                me.y += Math.sin(rad(me.direction)) * moveSpeed;
                if (me.y + (me.offsetHeight / 2) > document.documentElement.scrollHeight || me.y - (me.offsetHeight / 2) < 0) {
                    me.y = lastValue;
                    me.direction *= -1;
                    me.stuck++;
                } else
                    me.stuck = 0;
                if (me.stuck > 2)
                    me.goRandomPos();
                me.style.left = me.x - (me.offsetWidth / 2) + 'px';
                me.style.top = me.y - (me.offsetHeight / 2) + 'px';
                me.querySelector('img').style.transform = `rotateY(${(me.direction < 270 && me.direction >= 90) ? 180 : 0}deg)`;
                for (var el of grabbable) {
                    if (Math.random() < 0.0009 * (settings['render-speed'] / (1000 / 60)) && collideHTML(el, me)) {
                        el.classList += (el.className.length ? ' ' : '') + 'grabbed';
                        el.grabbedBy = me;
                        el.position = el.style.position || 'static';
                        el.style.position = 'absolute';
                        el.relX = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.offsetLeft;
                        el.relY = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.offsetTop;
                        break;
                    }
                }
                if (Math.random() < 0.04 * (settings['render-speed'] / (1000 / 60)))
                    me.pig.play();
            }
            setTimeout(() => requestAnimationFrame(renderAll), settings['render-speed']);
        }
        renderAll();
    }
    var manifest = fetch(root + 'characters/manifest.json').then(j=>j.json()).then(j=>{
        manifest = j;
        setup();
    });
}();