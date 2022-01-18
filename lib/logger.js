var colors = require("colors");

function print(name, text) {
    console.log(`[${name}] ${text}`);
}

module.exports = {
    info: function (name, text) {
        print(colors.bold.green(name), colors.cyan(text));
    },
    warn: function (name, text) {
        print(colors.bold.yellow(name), colors.yellow(text));
    },
    error: function (name, text) {
        print(colors.bold.red(name), colors.red(text));
    },
};
