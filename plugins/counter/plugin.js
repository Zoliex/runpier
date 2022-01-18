const fs = require('fs');
const path = require('path');

let count = 0;

function load(app) {
	count = +fs.readFileSync(path.join(__dirname, 'counter.txt'));


	app.server.use((req, res, next) => {
		count++;
		next();
	});

	app.server.get('/count', (req, res) => {
		res.send({ count });
	})
}

function unload(app) {
	fs.writeFileSync(path.join(__dirname, 'counter.txt'), count.toString());
}

module.exports = {
	load,
	unload
};