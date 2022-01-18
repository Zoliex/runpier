const fs = require("fs");
const log = require('./lib/logger');

class Plugins {
	constructor(app) {
		this.app = app;
		this.plugins = {};
		this.plugins_src = [];
	}

	async loadFromConfig(path = "./plugins") {
		this.plugins_src = fs.readdirSync(path);
		for (let plugin_id in this.plugins_src) {
			this.load(this.plugins_src[plugin_id]);
		}
	}

	async load(plugin) {
		const path = `./plugins/${plugin}/plugin.js`;
		try {
			const module = require(path);
			this.plugins[plugin] = module;
			await this.plugins[plugin].load(this.app);
			log.info('PLugins', `Chargement de ${plugin}`);
		} catch (e) {
			log.error('PLugins', `Echec du chargement de ${plugin}`)
			this.app.stop();
		}
	}

	unload(plugin) {
		if (this.plugins[plugin]) {
			this.plugins[plugin].unload();
			delete this.plugins[plugin];
			log.info('PLugins', `Déchargement de ${plugin}`)
		}
	}

	stop() {
		for (let plugin in this.plugins) {
			this.unload(plugin);
		}
	}
}

module.exports = Plugins;