// const mongoose = require('mongoose');

// const connectToDB = async () => {
//     try {
//         if (mongoose.connection.readyState === 1) {
//             return;
//         }

//         if (mongoose.connection.readyState === 2) {
//             return; // جلوگیری از تلاش همزمان
//         }

//         await mongoose.connect(process.env.MONGO_URL, {
//             authSource: "admin",
//         });
//         // رویداد خطا
//         mongoose.connection.on('error', (err) => {
//             console.error('MongoDB Connection Error:', err);
//         });

//         // رویداد قطع اتصال
//         mongoose.connection.on('disconnected', () => {
//             console.warn('MongoDB Disconnected! Retrying in 5 seconds...');
//             setTimeout(connectToDB, 5000);
//         });

//     } catch (error) {
//         console.error('DB Connection Failed! Retrying in 5 seconds...', error);
//         setTimeout(connectToDB, 5000);
//         throw error;
//     }
// };

// module.exports = connectToDB;

const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        if (mongoose.connection.readyState === 2) {
            return; // جلوگیری از تلاش همزمان
        }
        
        await mongoose.connect(process.env.MONGO_URL, {
            authSource: "admin",
        });
        
        // لاگ موفقیت‌آمیز اتصال
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📍 Database Host: ${mongoose.connection.host}`);
        console.log(`🗄️  Database Name: ${mongoose.connection.name}`);
        
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