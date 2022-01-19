
const express = require('express');
const path = require('path');
const http = require('http');
const Plugins = require('./plugins');
const log = require('./lib/logger');

class App {
	constructor(port) {
		this.server = express();
		this.plugins = new Plugins(this);
		this.port = port;
		this.server.use(express.json());
		this.http_server = http.createServer(this.server);
	}

	async start() {
		await this.plugins.loadFromConfig();

		this.server.set("view engine", "ejs");
		this.server.set("views", "./web/views/");
		this.server.use("/static/", express.static(path.join(__dirname, "web/static")));

		require("./routes/routes")(this.server);

		this.http_server.listen(this.port, () => {
			log.info('Express.js', `Serveur web démarré sur le port ${this.port}`)
		});
		require('./lib/socket')(this.http_server);
	}

	stop() {
		if (this.stopped) return;
		this.plugins.stop();
		log.info('Express.js', `Serveur web arrêté`)
		this.stopped = true;
		process.exit();
	}
}

const app = new App(5000);
app.start();
/*
["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
	process.on(event, () => app.stop());
});
*/