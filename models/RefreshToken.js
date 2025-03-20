const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    token: {
        type: String,
        required: true,
    },

    expiresAt : {
        type : Date,
        required : true,
    },

    createdAt : {
        type : Date,
        default : Date.now
    }

});

const model = mongoose.models.RefreshToken || mongoose.model("RefreshToken", schema)
module.exports = model;