const express = require('express');
const messageRouter = express();
const messageController = require('../controllers/messageController');


messageRouter.post('/sendMessage', messageController.sendMessage);

messageRouter.get('/all', messageController.getMessages);

messageRouter.delete('/delete/:id', messageController.deleteMessage);

module.exports = messageRouter;
