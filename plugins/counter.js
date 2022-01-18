const fs = require('fs');

let count = 0;

function load(app) {
	count = +fs.readFileSync('./plugins/counter.txt');

	app.server.use((req, res, next) => {
		count++;
		next();
	});

	app.server.get('/count', (req, res) => {
		res.send({ count });
	})
}

// Save request count for next time
function unload(app) {
	fs.writeFileSync('./plugins/counter.txt', count.toString());
}

module.exports = {
	load,
	unload
};