const axios = require('axios');

exports.fetchServerInfo = async (req, res) => {
    const { game, ip } = req.body;

    try {
        const response = await axios.get(`https://api.chit.sh/serverinfo/${game}/${ip}`);
        res.send(response.data);
    } catch (error) {
        res.send({status: 500, message: error.response.data.message});
    }
}