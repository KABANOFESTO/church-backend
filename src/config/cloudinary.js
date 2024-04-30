const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dto97ao8p',
    api_key: '855548699358571',
    api_secret: 'f1FbBTgOBqMjA9icrtygTt15DB4'
});


module.exports = cloudinary.uploader;