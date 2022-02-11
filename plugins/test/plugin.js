const fs = require('fs');
const path = require('path');

let count = 0;
let count_app = 0;

function load(app) {
	count = +fs.readFileSync(path.join(__dirname, 'counter.txt'));


	app.server.use((req, res, next) => {
		count++;
		count_app++;
		next();
	});

	app.server.get('/count', (req, res) => {
		res.send({ count, count_app });
	})
}

function unload(app) {
	fs.writeFileSync(path.join(__dirname, 'counter.txt'), count.toString());
}

module.exports = {
	load,
	unload
};