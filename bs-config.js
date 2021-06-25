require('dotenv').config();
const browserSync =require('browser-sync');
const querystring = require ('querystring');
const url = require('url');
const fs = require('fs');
const path = require('path')
const server = browserSync.create();

const injectScript = function () {
    
    const filePath = path.join(__dirname, '/static/index.html');
    console.log();
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }


        data = data.replace(/\$SRC/g, process.env.WEBLOADER_URL);
        data = data.replace(/\$ENV/g, process.env.ENVIRONMENT_ID);
        data = data.replace(/\$END/g, process.env.PARTICIPANT_URL);

        fs.writeFile(filePath, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    });
};

injectScript();

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