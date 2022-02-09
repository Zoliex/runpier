const si = require('systeminformation');

async function run() {
	console.log(await si.printer());
}

run();