const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config()

module.exports = (server) => {

    // Create a new socket server
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        },
        path: '/socket.io',
    });

    // Listen for new connections
    io.on('connection', (socket) => {
        console.log('New client connected');

        // Dynamically load each socket handler
        fs.readdirSync(__dirname)
            .filter((file) => file !== 'index.js')
            .forEach((file) => {
                const handler = require(path.join(__dirname, file));
                if (typeof handler === 'function') {
                    handler(socket);
                }
            });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};