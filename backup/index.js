const app = require("express")();
const { static } = require("express");
const ejs = require("ejs");
var server = require("http").Server(app);
const requestIp = require("request-ip");
const path = require("path");
const ip = require("ip");

const logger = require("./lib/log");

const server_port = 80;

server.listen(
    {
        port: server_port,
        host: "0.0.0.0",
    },
    () => {
        logger.log("Web", `Runpier is currently running at: http://${ip.address()}:${server_port}/`);
    }
);

app.set("view engine", "ejs");
app.use(requestIp.mw());

app.set("views", "./web/views/");
app.use("/static/", static(path.join(__dirname, "web/static")));

app.all("*", function (req, res, next) {
    logger.log("Web", `${req.clientIp} loaded ${req.url}`);
    next();
});

require("./routes/routes")(app);
require("./api/routes")(app);
require("./lib/socket")(server);
