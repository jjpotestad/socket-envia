const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const https = require('https');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Consumo del API Envia
let options = {
    host: 'queries-test.envia.com',
    path: '/guide/04/2020',
    headers: {
    accept: 'application/json',
    authorization: 'Bearer bdef82b27f0394666f22014cb101c5e6ed79b331dc5e1945500c0219552072f6'
    }  
};

let request = https.get(options, (res) => {
    var body = "";
    res.on('data', (out) => {
            body += out;
    });
    res.on('end',(out) => {
        let json = JSON.parse(body);
        var count = Object.keys(json.data).length;
        console.log(`total de guias: ${count}`);
        // Evento del contador
        io.on('connection', (socket) => {
            socket.emit('count', {cant: count});
        });
    })
});

request.end();



// Servidor http
http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});