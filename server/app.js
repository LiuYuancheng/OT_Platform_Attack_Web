var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var bodyParser = require('body-parser')
var socketIo = require('socket.io')
var dgram = require('dgram');

var app = express();
console.log(__dirname);
// consts
const MITM_HOST = '192.168.10.21';
const M221_HOST = '192.168.10.91';
const DOWNLOAD_PROGRAM_HOST = '192.168.10.251';

const UDP_TECH_HOST = '192.168.10.251';
//const UDP_RESP_HOST = '127.0.0.1';
const UDP_RESP_HOST = '192.168.10.91';

const udp_rsbp_port = 5005;
const udp_tech_port = 5006;
var udpClient = dgram.createSocket('udp4');

const listen_port = 8080;
const agents_port = 8081;

mitm_url = "http://" + MITM_HOST + ":" + agents_port.toString();
m221_url = "http://" + M221_HOST + ":" + agents_port.toString();
download_program_url = "http://" + DOWNLOAD_PROGRAM_HOST + ":" + agents_port.toString();

// server setup

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const server = http.Server(app);

server.listen(listen_port, function () {
    console.log("Listening on " + listen_port);
});

//

// socket io setup

const io = socketIo(server);

io.on('connection', (socket) => {
    socket.emit('hello', {
        greeting: "Welcome To Radiflow's Cyber Security Training Program"
    });
})

//

var state = {
    mitm: "none",
    m221: "none",
    download_program: "none"
}

var syslogs = {
    mitm: [],
    m221: [],
    download_program: []
}

// Syslogs

function addSyslog(agentName, msg) {

    var d = new Date();
    
    var Days = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var Months = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth();
    var Years = d.getFullYear() < 10 ? "0" + d.getFullYear() : d.getFullYear();

    var Hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var Minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var Seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    
    var time = "";

    time += Days + "/";
    time += Months + "/";
    time += Years + ", ";
    time += Hours + ":";
    time += Minutes + ":";
    time += Seconds;
    

    record = {
        time: time,
        msg: msg
    };
    if (syslogs[agentName]) {
        syslogs[agentName].push(record);
    }

    io.emit('addSyslog', {
        agent: agentName,
        time: record.time,
        msg: record.msg
    });
}

app.post('/sendLogs/:agent', function (req, res) {
    var agentName = req.params.agent;
    var msg = req.body.msg;

    addSyslog(agentName, msg);
});

app.get('/getLogs', function (req, res) {
    res.send(syslogs);
});

//


// mitm

app.get('/actions/mitm/startAttack', function (req, res) {
    var options = {
        url: mitm_url + "/start",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/mitm/stopAttack', function (req, res) {
    var options = {
        url: mitm_url + "/stop",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/mitm/getAttackState', function (req, res) {
    var options = {
        url: mitm_url + "/getState",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/mitm/getIlluminateState', function (req, res) {
    var options = {
        url: mitm_url + "/getIlluminateState",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/mitm/illuminateOn', function (req, res) {
    var options = {
        url: mitm_url + "/illuminateOn",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/mitm/illuminateOff', function (req, res) {
    var options = {
        url: mitm_url + "/illuminateOff",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

// m221

app.get('/actions/m221/startAttack', function (req, res) {
    var options = {
        url: m221_url + "/start",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/m221/stopAttack', function (req, res) {
    var options = {
        url: m221_url + "/stop",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/m221/getAttackState', function (req, res) {
    var options = {
        url: m221_url + "/getState",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/m221/getIlluminateState', function (req, res) {
    var options = {
        url: m221_url + "/getIlluminateState",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/m221/illuminateOn', function (req, res) {
    var options = {
        url: m221_url + "/illuminateOn",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/m221/illuminateOff', function (req, res) {
    var options = {
        url: m221_url + "/illuminateOff",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

//





// download_program

app.get('/actions/download_program/startAttack', function (req, res) {
    var options = {
        url: download_program_url + "/start",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/download_program/stopAttack', function (req, res) {
    var options = {
        url: download_program_url + "/stop",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/download_program/getAttackState', function (req, res) {
    var options = {
        url: download_program_url + "/getState",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/download_program/getIlluminateState', function (req, res) {
    var options = {
        url: download_program_url + "/getIlluminateState",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/download_program/illuminateOn', function (req, res) {
    var options = {
        url: download_program_url + "/illuminateOn",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});

app.get('/actions/download_program/illuminateOff', function (req, res) {
    var options = {
        url: download_program_url + "/illuminateOff",
        timeout: 4000
    }
    request(options, (error, response, body) => {
        res.send(body);
    });
});


// falseInj_Attack
app.get('/actions/falseInj_Attack/startAttack', function (req, res) {
    console.log('start false data injection attack');
    var message = 'A;2';
    udpClient.send(message, 0, message.length, udp_rsbp_port, UDP_RESP_HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP client message sent to ' + UDP_RESP_HOST + ':' + udp_rsbp_port);
    });
    res.send(syslogs);
});

app.get('/actions/falseInj_Attack/stopAttack', function (req, res) {
    console.log('stop false data injection attack');
    var message = 'A;0';
    udpClient.send(message, 0, message.length, udp_rsbp_port, UDP_RESP_HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP client message sent to ' + UDP_RESP_HOST + ':' + udp_rsbp_port);
    });
    res.send(syslogs);
});

// Black out attack:
app.get('/actions/blackOut_Attack/startAttack', function (req, res) {
    console.log('start blackOut attack');
    var message = 'A;1';
    udpClient.send(message, 0, message.length, udp_tech_port, UDP_TECH_HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP client message sent to ' + UDP_RESP_HOST + ':' + udp_rsbp_port);
    });
    res.send(syslogs);
});

app.get('/actions/blackOut_Attack/stopAttack', function (req, res) {
    console.log('stop blackOut attack');
    var message = 'A;0';
    udpClient.send(message, 0, message.length, udp_rsbp_port, UDP_RESP_HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP client message sent to ' + UDP_RESP_HOST + ':' + udp_rsbp_port);
    });
    res.send(syslogs);
});

// Substation attack


app.get('/playSound/:num', function (req, res) {
    var num = req.params.num;
    io.emit('playSound', { soundNum: num });
    res.send("played");
});
