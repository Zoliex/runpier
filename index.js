
const express = require('express');
const Plugins = require('./plugins');

class App {
	constructor() {
		this.server = express();
		this.plugins = new Plugins(this);
		this.server.use(express.json());
	}

	async start() {
		await this.plugins.loadFromConfig();

		this.server.get('/', (req, res) => {
			res.send('Hello World!');
		});

		this.server.listen(3000, () => {
			console.log('Server started on port 3000')
		});
	}

	stop() {
		if (this.stopped) return;
		this.plugins.stop();
		console.log('Server stopped');
		this.stopped = true;
		process.exit();
	}
}

const app = new App();
app.start();
/*
["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
	process.on(event, () => app.stop());
});
*/