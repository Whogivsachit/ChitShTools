exports.heartbeat = (req, res) => {
    res.status(200).send({status: 200, message: 'Server is running!',});
}
