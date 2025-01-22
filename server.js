const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname + '/public'));

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        console.log(`Message received: ${message}`);
        // console.log(`check: ${message == 'launch'}`);
        if (message == 'launch') {
            // Broadcast to all clients
            wss.clients.forEach((client) => {
                // console.log("FOREACH");
                if (client.readyState === WebSocket.OPEN) {
                    // console.log("SENDING SERVER MESSAGE");
                    client.send('replaceWithVideo');
                }
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});