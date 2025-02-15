const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false;
        } else {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connect To DB Successfully :))');
        }
    } catch (error) {
        console.log('DB Connection has Error !!', error);
    }
}

export default connectToDB;