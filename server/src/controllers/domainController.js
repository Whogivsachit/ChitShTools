const whois = require('whois');
const dns = require('dns');
const { TCPClient } = require('dns2');

exports.whois = async (req, res) => {
    const { domain } = req.body;
    if(!domain) return res.send({ status: 401, message: 'Domain is required' });

    whois.lookup(domain, (err, data) => {
        if(err) return res.send({ status: 500, message: err });
        res.send({ status: 200, message: 'Successfuly pulled whois Information', data });
    })
}

exports.dns = async (req, res) => {
    const { domain } = req.body;
    if(!domain) return res.send({ status: 401, message: 'Domain is required' });
    
    const resolve = TCPClient();
    const recordTypes = ['A', 'NS', 'CNAME', 'SOA', 'MX', 'TXT', 'AAAA', 'SRV', 'CAA', 'PTR', 'SPF', 'MAILA', 'MAILB'];
    const results = {};

    for (const type of recordTypes) {
        try {
            const response = await resolve(domain, type);
            results[type] = response.answers;
        } catch (error) {
            results[type] = { error: error.message };
        }
    }

    res.send({ status: 200, message: 'Successfuly pulled DNS Information', data: results });

}