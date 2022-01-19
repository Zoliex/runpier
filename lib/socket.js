const si = require("systeminformation");
const pm2 = require('./pm2')

module.exports = function (server) {
    var io = require("socket.io")(server);
    const log = require("./logger");

    io.on("connection", function (socket) {
        socket.on("cpuTemperature", async function (data) {
            socket.emit("res_cpuTemperature", await si.cpuTemperature());
        });
        socket.on("currentLoad", async function (data) {
            socket.emit("res_currentLoad", await si.currentLoad());
        });
        socket.on("mem", async function (data) {
            socket.emit("res_mem", await si.mem());
        });
        socket.on("fsSize", async function (data) {
            socket.emit("res_fsSize", await si.fsSize());
        });
        socket.on("time", async function (data) {
            socket.emit("res_time", await si.time());
        });
        socket.on("list", async function (data) {
            socket.emit("res_list", await pm2.list());
        })
        log.info("WebSocket", `Client ${socket.request.connection.remoteAddress} connected with id ${socket.id} !`);
    });
};
