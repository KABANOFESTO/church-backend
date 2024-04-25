const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Log the loaded environment variables
console.log(process.env.MONGO_URI);


exports.dbConnect = () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error('MONGO_URI environment variable is not defined');
    }

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log('Connected to MongoDB successfully!!') })
        .catch((err) => { console.error('Error connecting to MongoDB:', err) });
};
