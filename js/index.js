import agentHTML from './modules/agents.js';
void function() {
	'use strict';
	//document.getElementById('info').style.bottom = '25px';
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
	var root = document.domain === '127.0.0.1' || document.domain === 'localhost' ? '' : 'https://rockingerser.github.io/wolfoo-crazy/';
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
	// If wolfooCrazy variable does not exists, uses default settings, also shows default settings at index.html
	try {
		settings = wolfooCrazy;
	} catch (e) {
		settings = {
			'render-speed': 1000 / 60,
			'-agent-health': 100,
			'-agent-speed': 2,
			'-agent-rotate-speed': 20,
			'-agent-drag-background-color': 'rgba(0, 255, 0, 0.1)',
			'-agent-drag-outline-color': 'rgba(0, 255, 0, 0.4)',
			'-agent-drag-outline-width': '4px',
			'-agent-drag-outline-style': 'solid'
		};
		try {
			var _import_ = document.getElementById('import');
			_import_.textContent = _import_.textContent.replaceAll('/* @wolfoo-crazy-default */', 'var wolfooCrazy = ' + JSON.stringify(settings, null, 4) + ';');
		} catch (e) { alert(e) }
	}
	// Add credits in a domain outside of rockingerser.github.io
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
	/**
	 * Check if an element is overlapping another element.
	 * @param {*} el0 Element 1 to be checked
	 * @param {*} el1 Element 2 to be checked
	 * @returns {Boolean} True if they are overlapping, otherwise false.
	 */
	function collideHTML(el0, el1) {
		var elX0 = el0.offsetLeft < el1.offsetLeft ? el0 : el1;
		var elX1 = el0 != elX0 ? el0 : el1;
		var xInstersection = (elX0.offsetLeft + elX0.offsetWidth) - elX1.offsetLeft > 0;

		var elY0 = el0.offsetTop < el1.offsetTop ? el0 : el1;
		var elY1 = el0 != elY0 ? el0 : el1;
		var yInstersection = (elY0.offsetTop + elY0.offsetHeight) - elY1.offsetTop > 0;

		return xInstersection && yInstersection;
	}
	// Add the license
	var LICENSE = document.createElement('div');
	LICENSE.id = 'license';
	LICENSE.classList = 'box';
	LICENSE.innerHTML = '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"></a><span>This&nbsp;work&nbsp;is&nbsp;licensed&nbsp;under&nbsp;a&nbsp;<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative&nbsp;Commons&nbsp;Attribution-ShareAlike&nbsp;4.0&nbsp;International&nbsp;License</a>.</span>';
	document.getElementById('info').appendChild(LICENSE);
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
	 * Starts up everything.
	 */
	function setup() {
		// Spawn agents
		function spawnChar() {
			// Create the agent
			var character = random(manifest.available);
			var div = document.createElement('div');
			div.classList = 'wolfoo-character-container non-grabbable';
			div.innerHTML = agentHTML;
			div.title = div.name = character;
			div.querySelector('.wolfoo-character-avatar').src = root + 'characters/svg/' + random(manifest[character]);
			div.querySelector('.wolfoo-character-name').textContent = character;
			// Setup Audios
			div.CONSTPig = new Audio(root + 'characters/sounds/pig.wav');
			div.CONSTHurt = new Audio(root + 'characters/sounds/hurt.wav');

			div.health = settings['-agent-health'];
			div.lastHealth = div.health;
			div.CONSTMaxHealth = div.health;
			div.CONSTHealWait = 180;
			div.healWait = div.CONSTHealWait;
			div.frozen = 0;
			div.beaten = false;
			// Setup event listeners
			div.addEventListener('click', () => {
				if (Math.random() < 0.04)
					div.frozen = 60;
				if (!div.beaten)
					div.health -= 5;
				div.CONSTHurt.play();
			});
			// Set his position to a random one
			div.CONSTGoRandomPos = function () {
				div.x = (div.offsetWidth / 2) + Math.random() * (document.documentElement.scrollWidth - div.offsetWidth);
				div.y = (div.offsetHeight / 2) + Math.random() * (document.documentElement.scrollHeight - div.offsetHeight);
			};
			div.CONSTGoRandomPos();
			// Set his direction to a random one
			div.direction = Math.random() * 360;
			// This variable is for checking if the agent is stuck on the edges, they sometimes can get stuck in the edges
			div.stuck = 0;
			document.body.appendChild(div);
			setTimeout(() => requestAnimationFrame(spawnChar), spawnSpeed);
		}
		spawnChar();

		// Render the agents
		function renderAll() {
			// The blacklist is to disable grabbing on HTML elements, because these elements crash the script when the agents drag them
			var blacklist = [
				'[object HTMLProgressElement]'
			];
			var rotSpeed = settings['-agent-rotate-speed'] * (settings['render-speed'] / (1000 / 60)),
				moveSpeed = settings['-agent-speed'] * 2 * (settings['render-speed'] / (1000 / 60));
			var grabbable = Array.from(document.body.querySelectorAll('*'));
			grabbable = grabbable.filter(el => (!blacklist.includes(''+el)&&(!el.className.includes || !(el.className.includes('non-grabbable') || el.parentNode.className.includes('non-grabbable')))) && el.children.length <= 5);
			var grabbed = grabbable.filter(el => el.grabbedBy);
			// Handle collisions with HTML elements
			for (var el of grabbed) {
				el.style.left = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.relX + 'px';
				el.style.top = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.relY + 'px';
				// They can randomly "click" on HTML elements
				if (el.grabbedBy.frozen <= 0 && Math.random() < 0.001 * (settings['render-speed'] / (1000 / 60)))
					el.click();
				// Drop the HTML element randomly
				if (el.grabbedBy.frozen > 0 || Math.random() < 0.01 * (settings['render-speed'] / (1000 / 60))) {
					el.grabbedBy = null;
					el.classList.remove('grabbed');
				}
			}
			// Render the agents positions
			for (var me of document.querySelectorAll('.wolfoo-character-container')) {
				// Select agent's avatar and save it in a local variable
				var imgAvatar = me.querySelector('.wolfoo-character-avatar');
				// The agent turn black if is frozen or beaten
				imgAvatar.style.filter = `brightness(${(me.frozen <= 0 && !me.beaten) + 0})`;
				// Set the agent's health bar value according to its health
				me.querySelector('.wolfoo-character-health').value = me.health / me.CONSTMaxHealth;
				me.frozen -= settings['render-speed'] / (1000 / 60);

				if (me.frozen <= 0 && !me.beaten) {
					me.direction += -rotSpeed + Math.random() * (rotSpeed * 2);
					me.direction = (me.direction < 0 ? me.direction + 360 : me.direction) % 360;
					var lastValue = me.x;
					me.x += Math.cos(rad(me.direction)) * moveSpeed;
					// Check if the agent is colliding with the edges horizontally, if does, handle bouncing
					if (me.x + (me.offsetWidth / 2) > document.documentElement.scrollWidth || me.x - (me.offsetWidth / 2) < 0) {
						me.x = lastValue;
						me.direction = 180 - me.direction;
						// Check if the agent is stuck
						me.stuck += 2;
					} else
						// If the agent didn't collided with the edges horizontally, substract by one, to avoid getting stuck in the X axis
						me.stuck--;
					lastValue = me.y;
					me.y += Math.sin(rad(me.direction)) * moveSpeed;
					// Check if the agent is colliding with the edges vertically, if does, handle bouncing
					if (me.y + (me.offsetHeight / 2) > document.documentElement.scrollHeight || me.y - (me.offsetHeight / 2) < 0) {
						me.y = lastValue;
						me.direction *= -1;
						// Here aswell
						me.stuck += 2;
					} else
						// If the agent didn't collided with the edges vertically, substract by one, to avoid getting stuck in the Y axis
						me.stuck--;
					// If the agent's stuck variable is greater than four, indicating that was stuck, make it go to a random position
					if (me.stuck > 4)
						me.CONSTGoRandomPos();
				}
				// Center the agent according to its width and height
				me.style.left = me.x - (me.offsetWidth / 2) + 'px';
				me.style.top = me.y - (me.offsetHeight / 2) + 'px';
				// If the agent is facing left, flip his avatar 180 degrees
				imgAvatar.style.transform = `rotateY(${(me.direction < 270 && me.direction >= 90) ? 180 : 0}deg)`;
				if (me.health !== me.lastHealth) {
					if (me.lastHealth > me.health)
						me.healWait = me.CONSTHealWait;
					me.lastHealth = me.health;
				}
				if (!me.beaten)
					me.healWait--;
				if (me.healWait < 0)
					me.health += 0.125;
				if (me.health > me.CONSTMaxHealth)
					me.health = me.CONSTMaxHealth;
				else if (me.health <= 0) {
					me.health = 1e-323;
					me.beaten = true;
				}
				if (me.frozen > 0 || me.beaten) {
					if (me.beaten) {
						me.health += 10 / me.CONSTMaxHealth;
						if (me.health > me.CONSTMaxHealth) {
							me.health = me.CONSTMaxHealth;
							me.beaten = false;
						}
					}
					continue;
				}
				// Grab HTML elements
				for (var el of grabbable) {
					if (Math.random() < 0.0009 * (settings['render-speed'] / (1000 / 60)) && collideHTML(el, me)) {
						el.classList.add('grabbed');
						el.grabbedBy = me;
						el.position = el.style.position || 'static';
						el.style.position = 'absolute';
						el.relX = Number(el.grabbedBy.style.left.substring(0, el.grabbedBy.style.left.length - 2)) - el.offsetLeft;
						el.relY = Number(el.grabbedBy.style.top.substring(0, el.grabbedBy.style.top.length - 2)) - el.offsetTop;
						// We don't want agents to grab two HTML elements at same time, so, break to end the loop
						break;
					}
				}
				// Randomly plays that annoying sound
				if (Math.random() < 0.04 * (settings['render-speed'] / (1000 / 60)))
					me.CONSTPig.play();
			}
			setTimeout(() => requestAnimationFrame(renderAll), settings['render-speed'] - 1000 / 60);
		}
		renderAll();
	}
	// Wait until manifest.json is loaded, then call setup()
	var manifest = fetch(root + 'characters/manifest.json').then(j=>j.json()).then(j=>{
		manifest = j;
		if (document.domain === 'rockingerser.github.io' || document.domain === '127.0.0.1' || document.domain === 'localhost')
			window.setup = setup;
		else
			setup();
	});
}();
