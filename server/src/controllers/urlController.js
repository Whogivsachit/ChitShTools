const { Urls } = require('../models');
const shortid = require('shortid');

exports.shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();
    const creator = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    
    const urlExists = await Urls.findOne({ where: { url: originalUrl } });
    if(urlExists) return res.status(200).send({ status: 200, message: 'URL already exists!', shortUrl: urlExists.shortUrl, impressions: urlExists.impressions });

    await Urls.create({
        url: originalUrl,
        shortUrl: shortUrl,
        creator: creator,
        impressions: 0
    });

    res.status(200).send({ status: 200, message: 'URL shortened!', shortUrl: shortUrl, creator: creator, impressions: 0});
},


exports.redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    const url = await Urls.findOne({ where: { shortUrl: shortUrl } });
    if(!url) return res.status(404).send({ status: 404, message: 'URL not found!' });

    url.increment('impressions');
    res.redirect(url.url);
}
