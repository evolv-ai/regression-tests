require('dotenv').config();
const browserSync =require('browser-sync');
const querystring = require ('querystring');
const url = require('url');
const fs = require('fs');
const path = require('path')
const server = browserSync.create();

fs.writeFile('static/js/loader.js', `var script = document.createElement('script');

script.src = "${process.env.WEBLOADER_URL}";
script.setAttribute('data-evolv-environment', "${process.env.ENVIRONMENT_ID}");
script.setAttribute('data-evolv-timeout', "10000");
script.setAttribute('data-evolv-endpoint', "${process.env.PARTICIPANT_URL}");
document.getElementsByTagName('head')[0].appendChild(script);`, {flag:'w'}, function (err) {
	if (err) throw err;
	console.log('File is created successfully.');
});

server.init({
	ui: {
		port: 9091
	},
	watchEvents: [
		'change'
	],
	watch: true,
	ignore: [],
	single: false,
	watchOptions: {
		ignoreInitial: true
	},
	server: {
		baseDir: '.',
		routes: {
			'/': 'static/',
		}
	},
    middleware: [
        function(req, res, next) {
            const query = url.parse(req.url).query;
            const params = querystring.parse(query);
            
            
            if (!query || !params.delay) {
                next();
            } else {
                setTimeout(next, parseInt(params.delay));
            }
        }
    ],
	proxy: false,
	port: 9090,
	serveStatic: [],
	logLevel: 'info',
	logPrefix: 'Browsersync',
	logConnections: false,
	logFileChanges: true,
	logSnippet: true,
	open: true,
	startPath: '/',
	browser: 'default',
	cors: false,
	xip: false,
	hostnameSuffix: false,
	reloadOnRestart: false,
	notify: true,
	reloadDelay: 0,
	reloadDebounce: 5000,
	reloadThrottle: 0,
	plugins: [],
	injectChanges: true,
	minify: true,
	host: '0.0.0.0',
	localOnly: false,
	codeSync: true,
	timestamps: true,
	injectNotification: false
});