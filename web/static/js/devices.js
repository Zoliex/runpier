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

var socket = io();

socket.on("res_usb", async function (data) {
    var content = document.getElementById("devices-table");
    var html = "";
    var power = 0;
    for (const device of data) {
        const types = [
            {
                type: "Camera",
                icon: 'fas fa-camera',
            },
            {
                type: "Hub",
                icon: 'fab fa-usb',
            },
            {
                type: "Keyboard",
                icon: 'fas fa-keyboard',
            },
            {
                type: "Mouse",
                icon: 'fas fa-mouse',
            },
            {
                type: "Storage",
                icon: 'fas fa-hdd',
            },
            {
                type: "Microphone",
                icon: 'fas fa-microphone',
            },
            {
                type: "Audio",
                icon: 'fas fa-volume-up ',
            },
            {
                type: "Touch Bar",
                icon: 'fas fa-desktop ',
            },
            {
                type: "Controller",
                icon: 'fas fa-gamepad ',
            },
            {
                type: "Trackpad",
                icon: 'fas fa-mouse-pointer ',
            },
            {
                type: "Sensor",
                icon: 'fas fa-network-wired ',
            },
            {
                type: "Bluetooth",
                icon: 'fab fa-bluetooth-b ',
            },
            {
                type: "Human Interface Device",
                icon: 'fas fa-mouse',
            },
        ]
        html = html + `<tr><td class="icon-name"><div style="background: #ff6000;" class="icon"><i style="${textColor("#ff6000")};" class="${types.filter(item => item.type === device.type)[0].icon}"></i></div><span>${device.name}</span></td><td>${device.id}</td><td>${device.vendor}</td><td>${device.type}</td><td>${device.maxPower}</td></tr>`;
        power += parseInt(device.maxPower.replace("mA", ""));
    }
    content.innerHTML = html;
    document.getElementById("info-devices-value").innerText = data.length;
    document.getElementById("info-power-value").innerText = power;
});

socket.on("res_printer", function (data) {
    document.getElementById("info-printers-value").innerText = data.length;
});

socket.on("res_time", function (data) {
    const dates = document.querySelectorAll(".date");
    data.current = moment(data.current).format("HH:mm");
    for (const date of dates) {
        date.innerHTML = data.current;
    }
});

function getInfos() {
    socket.emit("usb");
    socket.emit("printer");
    socket.emit("time");
}
getInfos();

setInterval(function () {
    getInfos();
}, 10000);