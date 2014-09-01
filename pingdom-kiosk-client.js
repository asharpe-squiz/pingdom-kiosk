// this script is run as follows:
// # cat public/js/main.js pingdom-kiosk-console.js | /opt/rh/nodejs010/root/usr/bin/node

var console = require("console");
var io = require("socket.io-client")

// fake the DOM
var jsdom = require('jsdom');
var window = jsdom.jsdom().parentWindow;

// capture jquery here for use in Pingdom
var $;

// TODO gotta put the right location here
//global.location = 'http://localhost:3000/';
global.location = 'http://pingdom-status.squiz.co.uk/';

// force a connection to the correct location, the subsequent connect()
// will use the cache
var orig_connect = io.connect;

io.connect = function() {
	return orig_connect(global.location);
}.bind(io);
//io.connect(global.location);

// see http://stackoverflow.com/a/4299416
jsdom.jQueryify(window, "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", function () {
	$ = window.$;

	// avoids errors - we may need to do something useful with this
	templates = {
		list: function() {
			console.log(arguments);
		},
		monitorStatus: function() {
			console.log(arguments);
		}
	};

	kiosk = new Pingdom();
});

