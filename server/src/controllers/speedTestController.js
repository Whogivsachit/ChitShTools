const fs = require('fs');
const fetch = require('node-fetch');

exports.upload = async (req, res) => {
    if (!req.file) return res.status(400).send({ error: 'File not uploaded' });

    fs.unlinkSync(req.file.path);
    res.send({ status: 200, message: 'File uploaded successfully.' });
}

exports.testUp = async (req, res) => {
    if (!req.file) return res.status(400).send({ error: 'File not uploaded' });

    const startTime = parseInt(req.body.startTime, 10);
    const endTime = Date.now();

    const duration = (endTime - startTime) / 1000;
    const fileSize = req.file.size * 8 / (1024 * 1024); // Size in megabits
    const speed = (fileSize / duration).toFixed(2);

    fs.unlinkSync(req.file.path);
    res.send({ status: 200, message: `Uploaded 100MB in ${duration} seconds at ${speed} Mbps.`, duration, speed });
}

exports.testDown = async (req, res) => {
    const downloadUrl = 'https://ash-speed.hetzner.com/100MB.bin';
    const startTime = Date.now();

    const response = await fetch(downloadUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const endTime = Date.now();

    const duration = (endTime - startTime) / 1000;
    const fileSize = buffer.length * 8 / (1024 * 1024);
    const speed = (fileSize / duration).toFixed(2);

    res.send({ status: 200, message: `Downloaded 100MB in ${duration} seconds at ${speed} Mbps.`, duration, speed });
}