const { response } = require('express');
const request = require('request');

async function sendRequest(options) {
    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve({ response, body })
            }
        });
    });
}
module.exports = { sendRequest };