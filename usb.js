require('systeminformation').usb().then(json => {
    console.log(JSON.stringify(json));
});