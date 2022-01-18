const fs = require("fs");

class Plugins {
	constructor(app) {
		this.app = app;
		this.plugins = {};
		this.plugins_src = {};
	}

	async loadFromConfig(path = './plugins.json') {
		this.plugins_src = JSON.parse(fs.readFileSync(path));
		for (let plugin in this.plugins_src) {
			this.load(plugin);
		}
	}

	async load(plugin) {
		const path = this.plugins_src[plugin];
		try {
			const module = require(path);
			this.plugins[plugin] = module;
			await this.plugins[plugin].load(this.app);
			console.log(`Loaded plugin: '${plugin}'`);
		} catch (e) {
			console.log(`Failed to load '${plugin}'`)
			this.app.stop();
		}
	}

	unload(plugin) {
		if (this.plugins[plugin]) {
			this.plugins[plugin].unload();
			delete this.plugins[plugin];
			console.log(`Unloaded plugin: '${plugin}'`);
		}
	}

	stop() {
		for (let plugin in this.plugins) {
			this.unload(plugin);
		}
	}
}

module.exports = Plugins;