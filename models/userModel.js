let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let user = {
    email:String,
    username:String,
    password:String
};

module.exports = mongoose.model('user',new Schema(user));