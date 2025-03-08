const mongoose = require("mongoose");
const ProductModel = require("./Product");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    icon: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        timestamps: true,
    }
);

const model = mongoose.models.Category || mongoose.model("Category", schema);

module.exports = model;