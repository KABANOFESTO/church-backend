const uploader = require('../config/cloudinary');

const blogImage = async (req) => {

    const tmp = req.files.imageUrl.tempFilePath;
    const Result = await uploader.upload(tmp, { folder: 'My-Brand' });
    return Result;
};



module.exports = blogImage;