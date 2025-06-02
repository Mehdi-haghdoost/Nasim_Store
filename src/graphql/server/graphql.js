require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { createHandler } = require('graphql-http/lib/use/express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const schema = require('./index.resolver');
const connectToDB = require('../../../configs/db');
const fileUpload = require('express-fileupload');



const app = express();

// فعال‌سازی CORS - اضافه شده
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','Cookie'] 
}));

// استفاده از میدلور
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // محدودیت 10 مگابایت
    createParentPath: true
}));

app.use(cookieParser());

async function startServer() {
    try {
        await connectToDB();

        // تنظیم مسیر Graphql
        app.use(
            "/graphql",
            createHandler({
                schema,
                context: (req) => {
                    // در graphql-http، اولین پارامتر حاوی اطلاعات req و res است
                    return {
                        req: req.raw || req,
                        res: req.raw?.res || req.res
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
        });
    } catch (error) {
        console.error("Failed to start server", error)
    }
}

startServer();