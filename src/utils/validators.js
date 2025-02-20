const Schema = require("validate");

const registerUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
        message: "ایمیل وارد شده صحیح نیست",
    },
    phone : {
        type : String,
        match : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
        message: "شماره تلفن وارد شده صحیح نیست",
    },
    password: {
        type: String,
        required: true,
    }
});

const registerUserValidator = (obj) => {
    return registerUserSchema.validate(obj);
};

module.exports = {
    registerUserValidator,
}