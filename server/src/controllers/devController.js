exports.heartbeat = (req, res) => {
    res.send({status: 200, message: 'Server is running!',});
}
