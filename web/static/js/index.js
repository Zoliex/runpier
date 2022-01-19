var logs_app_name = "";
var logs_show = false;

window.momentDurationFormatSetup(moment);

function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

const buttons = document.querySelectorAll(".item");
for (const button of buttons) {
    button.addEventListener("click", createRipple);
}

function formatBytes(bytes, showUnit, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    if (showUnit) {
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
    } else {
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    }
}

function map(x, in_min, in_max, out_min, out_max) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

var textColor = function (bgColor) {
    var output = runNetwork(bgColor);
    if (output.black > 0.5) {
        return "#000";
    }
    return "#fff";
};

var runNetwork = function anonymous(input) {
    var net = { layers: [{ r: {}, g: {}, b: {} }, { 0: { bias: 0.30606978889779535, weights: { r: 0.8381133171486668, g: -0.8602486258125565, b: -1.5270511521731682 } }, 1: { bias: 3.1329999860658906, weights: { r: 2.2463466077278498, g: -1.1545550503755377, b: -4.0279511285495255 } }, 2: { bias: 1.122002476278899, weights: { r: 1.2189688760097008, g: -0.7477856700925529, b: -2.253326449942745 } } }, { black: { bias: 3.324204314263548, weights: { 0: -1.7719498459629373, 1: -5.890287515022658, 2: -2.878376676040711 } } }], outputLookup: true, inputLookup: true };

    for (var i = 1; i < net.layers.length; i++) {
        var layer = net.layers[i];
        var output = {};

        for (var id in layer) {
            var node = layer[id];
            var sum = node.bias;

            for (var iid in node.weights) {
                sum += node.weights[iid] * input[iid];
            }
            output[id] = 1 / (1 + Math.exp(-sum));
        }
        input = output;
    }
    return output;
};

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

var logs_terminal = document.querySelector(".background-info");

function showLogs(appName) {
    logs_app_name = appName;
    logs_show = true;
    logs_terminal.classList.toggle("active");
}

function closeLogs() {
    logs_show = false;
    logs_terminal.classList.toggle("active");
    console_text.innerHTML = "Chargement des logs de l'application...";
}

var socket = io();
var ansi_up = new AnsiUp();

socket.on("res_cpuTemperature", function (data) {
    var temp = document.getElementById("temp");
    if (data.main === null) {
        document.querySelectorAll(".info-cpu-temp")[0].style.display = "none";
    } else {
        document.querySelectorAll(".info-cpu-temp")[0].style.display = "block";
    }
    temp.innerHTML = `${data.main.toFixed(1)} °C`;

    var temp_bar = document.getElementById("temp_bar");
    temp_bar.style.width = `${map(data.main, 10, 90, 0, 100)}%`;
});

socket.on("res_currentLoad", function (data) {
    var usage = document.getElementById("usage");
    if (data.currentLoad === null) {
        document.querySelectorAll(".info-cpu-usage")[0].style.display = "none";
    } else {
        document.querySelectorAll(".info-cpu-usage")[0].style.display = "block";
    }
    usage.innerHTML = `${data.currentLoad.toFixed(1)} %`;

    var usage_bar = document.getElementById("usage_bar");
    usage_bar.style.width = `${data.currentLoad}%`;
});

socket.on("res_mem", function (data) {
    var usage = document.getElementById("ram");
    if (data.currentLoad === null) {
        document.querySelectorAll(".info-cpu-usage")[0].style.display = "none";
    } else {
        document.querySelectorAll(".info-cpu-usage")[0].style.display = "block";
    }
    usage.innerHTML = `${Number(data.used / 100000000).toFixed(2)}/${Number(data.total / 100000000).toFixed(2)}Gb`;

    var ram_bar = document.getElementById("ram_bar");
    ram_bar.style.width = `${map(data.used, 0, data.total, 0, 100)}%`;
});

socket.on("res_fsSize", async function (data) {
    var disk = document.getElementById("disk");
    var diskspace = 0;
    var diskusage = 0;

    for (var i = 0; i < data.length; i++) {
        diskspace = diskspace + data[i].size;
        diskusage = diskusage + data[i].available;
    }

    disk.innerHTML = `${formatBytes(diskusage, true)}/${formatBytes(diskspace, true)}`;

    var disk_bar = document.getElementById("disk_bar");
    disk_bar.style.width = `${map(diskusage, 0, diskspace, 0, 100)}%`;
});

socket.on("res_time", function (data) {
    const dates = document.querySelectorAll(".date");
    data.current = moment(data.current).format("HH:mm");
    for (const date of dates) {
        date.innerHTML = data.current;
    }
});

socket.on("res_list", async function (data) {
    var content = document.getElementById("apps-table");
    var html = "";
    for (const app of data) {
        var state_text;
        var state_color;
        if (app.pm2_env.status === "online") {
            state_text = "En ligne";
            state_color = "#27ae60";
        } else if (app.pm2_env.status === "stopped") {
            state_text = "Hors ligne";
            state_color = "#eb5757";
        }
        html = html + `<tr onclick="showLogs('${app.name}')"><td class="icon-name"><div style="background: ${app.db_infos.icon_color};" class="icon"><i style="color: ${textColor(app.db_infos.icon_color)};" class="${app.db_infos.icon_name}"></i></div><span>${app.name}</span></td><td style="color: ${state_color};">${state_text}</td><td>${moment.duration(moment().diff(moment(app.pm2_env.pm_uptime))).format()}</td><td>${formatBytes(app.db_infos.folder_size, true)}</td><td>${app.monit.cpu}%</td><td>${app.pm2_env.restart_time}</td></tr>`;
    }
    content.innerHTML = html;
    showLogs;
});

var console_text = document.querySelector(".logs");
socket.on("res_getAppLogs", async function (data) {
    if (data.appName === logs_app_name) {
        console_text.innerHTML = linkify(ansi_up.ansi_to_html(data.text)).replace(/\n/g, "<br />");
    }
});

setInterval(function () {
    socket.emit("cpuTemperature");
    socket.emit("currentLoad");
    socket.emit("mem");
    socket.emit("fsSize");
    socket.emit("time");
    socket.emit("list");
    if (logs_show) {
        socket.emit("getAppLogs", logs_app_name);
    }
}, 3000);

let screen = document.querySelector(".screen");
var autoscroll_toggle = true;

let screen_scroll = window.setInterval(function () {
    if (autoscroll_toggle) screen.scrollBy({ top: screen.scrollHeight * 1, left: 0, behavior: "smooth" });
}, 100);
var autoscroll_button = document.querySelector(".autoscroll");
var autoscroll_toggle = true;

autoscroll_button.addEventListener("click", (event) => {
    autoscroll_button.classList.toggle("disabled");
    if (autoscroll_toggle) {
        autoscroll_toggle = false;
    } else {
        autoscroll_toggle = true;
    }
});
