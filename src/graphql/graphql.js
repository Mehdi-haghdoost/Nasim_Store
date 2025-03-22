require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { createHandler } = require('graphql-http/lib/use/express');
const cookieParser = require('cookie-parser');
const schema = require('./index.resolver');
const connectToDB = require('../../configs/db');



const app = express();

app.use(cookieParser());

async function startServer() {
    try {
        await connectToDB();

        // تنظیم مسیر Graphql
        app.use(
            "/graphql",
            createHandler({
                schema,
                context: (req,res) => {
                    return {
                        req: req,
                        res: res
                    };
                },
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
    } catch (error) {
        console.error("Failed to start server", error)
    }
}

startServer();