const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: 'dto97ao8p',
    api_key: '855548699358571',
    api_secret: 'f1FbBTgOBqMjA9icrtygTt15DB4',
    secure: true,
});

module.exports = cloudinary.uploader;


