const pm2 = require("pm2-promise");
const fsPromises = require("fs").promises;

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
};
