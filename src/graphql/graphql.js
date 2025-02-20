const express = require('express');
const mongoose = require('mongoose');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./index.resolver');

require("dotenv").config();


const app = express();

// اتصال به دیتا بیس MongoDB
mongoose.connect(process.env.MONGO_URL, {
    authSource: "admin",
})
    .then(() => console.log('connected to MongoDB'))
    .catch((err => console.log('Error Connecting to MongoDB', err)))

mongoose.connection.once("open", () => {
    console.log("✅ Connected to MongoDB successfully");
});

// تنظیم مسیر Graphql
app.use(
    "/graphql",
    createHandler({
        schema,
        context: (req) => ({ req }),
    })
);

app.get("/", (req, res) => {
    res.json({ message: "✅ GraphQL Server is running" })
});

// راه اندازی سرور
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);

});