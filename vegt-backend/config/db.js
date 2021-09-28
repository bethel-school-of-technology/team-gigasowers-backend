const mongoose = require('mongoose');


const connectDB = async () => {

    const MONGO_URI = "mongodb+srv://vegtUser:swipeRight1!@veggietendercluster.ph22y.mongodb.net/VeggieTenderDB?retryWrites=true&w=majority";

    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;