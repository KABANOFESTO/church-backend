// import uploader from '../config/cloudinary';
const uploader = require('../config/cloudinary');

const blogImage = async (req) => {
    try {
        if (!req.files || !req.files.photo) {
            throw new Error('No file uploaded');
        }

        const tmp = req.files.photo.tempFilePath;
        const Result = await uploader.upload(tmp, { folder: 'My-Brand' });
        return Result;
    } catch (error) {
        console.log(error);
    }
};



module.exports = blogImage;