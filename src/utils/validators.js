const Schema = require("validate");

const registerUserSchema = new Schema({
    name :String,
    email : {
        type : String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        message: "ایمیل وارد شده صحیح نیست",
    },
    password : {
        type : String,
        required : true,
    }
});

const registerUserValidator = (obj) => {
    return registerUserSchema.valdate(obj);
};

module.exports = {
    registerUserValidator,
}