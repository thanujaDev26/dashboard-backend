exports.greetingMessage = function(req, res) {
    res.status(200).send({
        message: 'Hello! Good Afternoon Dear Sir, Madam!!!'
    })
}