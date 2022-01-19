const pm2 = require("pm2-promise");

pm2.connect(async function (err) {
	if (err) {
		console.error(err);
		process.exit(2);
	}
});

module.exports = {
	list: async function () {
		var list = await pm2.list();
		return list;
	},
	restart: async function (appName) {
		pm2.restart(appName, (err, proc) => {
		})
	},
	start: async function (appName) {
		pm2.start(appName, (err, proc) => {
		})
	},
	stop: async function (appName) {
		pm2.stop(appName, (err, proc) => {
		})
	}
};
