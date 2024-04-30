const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
    try {
        const valationResult = await messageSchema.validateAsync(req.body);
        const message = new Message({
            name: valationResult.name,
            email: valationResult.email,
            message: valationResult.message
        })
        message.save()
            .then(result => {
                res.status(200).json({ message: 'message sent successful' })
            })
    } catch (error) {
        res.status(500).json({ error })
    }
};

exports.getMessages = async (req, res) => {
    Message.find()
        .then(messages => {
            res.status(200).json({ messages })
        })
        .catch(error => res.json(error))
};

exports.deleteMessage = (req, res) => {
    const { id } = req.params
    Message.deleteOne({ _id: id })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(error => console.log(error))
}
