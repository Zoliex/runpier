
const express = require('express');
const Plugins = require('./plugins');
const log = require('./lib/logger');

class App {
	constructor(port) {
		this.server = express();
		this.plugins = new Plugins(this);
		this.port = port;
		this.server.use(express.json());
	}

	async start() {
		await this.plugins.loadFromConfig();

		this.server.get('/', (req, res) => {
			res.send('Hello World!');
		});

		this.server.listen(this.port, () => {
			log.info('Express.js', `Serveur web démarré sur le port ${this.port}`)
		});
	}

	stop() {
		if (this.stopped) return;
		this.plugins.stop();
		log.info('Express.js', `Serveur web arrêté`)
		this.stopped = true;
		process.exit();
	}
}

const app = new App(3000);
app.start();

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
	process.on(event, () => app.stop());
});