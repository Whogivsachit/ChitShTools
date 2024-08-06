const { spawn } = require('child_process');

const allowedFlags = ['-Pn', '-p'];

const parseFlags = (flags) => {
    const parts = flags.trim().split(/\s+(?=[-])/); // Split by spaces that precede a flag
    const result = [];

    parts.forEach(part => {
        if (allowedFlags.some(flag => part.startsWith(flag))) {
            const [flag, ...valueParts] = part.split(/\s+(?![^\s]+$)/); // Split only at spaces not within the value
            const value = valueParts.join(' ').trim(); // Trim leading/trailing spaces from value
            result.push(`${flag.trim()} ${flag === '-p' ? value.replace(/\s+/g, ',') : value}`.trim()); // Ensure no trailing spaces
        } else {
            result.push(part.trim()); // Trim leading/trailing spaces from other parts
        }
    });

    return result;
};

const isValidHost = (host) => {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):([0-9a-fA-F]{1,4}|:)((:[0-9a-fA-F]{1,4}){1,6}|:)|::([0-9a-fA-F]{1,4}:){1,7}|:|:(([0-9a-fA-F]{1,4}:){1,6}|:):((:[0-9a-fA-F]{1,4}){1,6}|:))$/;
    const hostnamePattern = /^(?!:\/\/)([a-zA-Z0-9-_\.]{1,256}\.[a-zA-Z]{2,6})$/;
    return ipv4Pattern.test(host) || ipv6Pattern.test(host) || hostnamePattern.test(host);
};


exports.nmap = async (req, res) => {
    const { host, flags } = req.body;

    if (!host) return res.send({ status: 400, message: 'Malformed Body' });
    if (!isValidHost(host)) return res.send({ status: 401, message: 'Invalid host format' });

    // Check if flags are valid
    if(flags && !flags.trim().split(/\s+(?=[-])/).every(flag => allowedFlags.some(allowedFlag => flag.startsWith(allowedFlag)))) {
        return res.send({ status: 402, message: 'Invalid flags' });
    }

    const nmap = spawn('nmap', [host, ...parseFlags(flags)]);
    
    let output = '';
    let errorOutput = '';

    nmap.stdout.on('data', (data) => output += data);
    nmap.stderr.on('data', (data) => errorOutput += data);
    nmap.on('close', (code) => {
        if (code !== 0 || errorOutput) {
            return res.send({ status: 500, message: `nmap process exited with code ${code} ${errorOutput}`, error: errorOutput });
        }
        return res.send({ status: 200, message: 'Successfully scanned ports.', data: output });
    });
};