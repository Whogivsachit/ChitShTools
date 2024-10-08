const { Client } = require('ssh2');

module.exports = (socket) => {
    socket.on('connectSSH', (sshDetails) => {
        const conn = new Client();
        conn.on('ready', () => {
            conn.shell((err, stream) => {
                if (err) throw err;

                stream.on('data', (data) => {
                    socket.emit('data', data.toString());
                });

                socket.on('command', (command) => {
                    stream.write(command + '\n');
                });

                stream.on('close', () => {
                    conn.end();
                });

            });
        }).connect({
            host: sshDetails.host,
            port: sshDetails.port,
            username: sshDetails.username,
            password: sshDetails.password,
        }).on('error', (err) => {
            if (err.level === 'client-authentication') {
                socket.emit('data', 'Invalid credentials');
            } else if (err.level === 'client-timeout') {
                socket.emit('data', 'Connection timeout');
            } else {
                socket.emit('data', err.toString());
            }
        });
    });
};