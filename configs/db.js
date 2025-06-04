const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        if (mongoose.connection.readyState === 2) {
            return;
        }
        
        await mongoose.connect(process.env.MONGO_URL, {
            authSource: "admin",
        });
        
       
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📍 Database Host: ${mongoose.connection.host}`);
        console.log(`🗄️  Database Name: ${mongoose.connection.name}`);
        

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Connection Error:', err);
        });
        

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