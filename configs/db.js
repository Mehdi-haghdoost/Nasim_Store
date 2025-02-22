const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Already Connected to DB');
            return;
        }

        if (mongoose.connection.readyState === 2) {
            console.log('Connection in progress, waiting...');
            return; // جلوگیری از تلاش همزمان
        }

        await mongoose.connect(process.env.MONGO_URL, {
            authSource: "admin",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect To DB Successfully :))');

        // رویداد خطا
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Connection Error:', err);
        });

        // رویداد قطع اتصال
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB Disconnected! Retrying in 5 seconds...');
            setTimeout(connectToDB, 5000);
        });

    } catch (error) {
        console.error('DB Connection Failed! Retrying in 5 seconds...', error);
        setTimeout(connectToDB, 5000);
        throw error;
    }
};

module.exports = connectToDB;