let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let blog = {
    title: String,
    content: String,
    imgpath: String
};

module.exports = mongoose.model('blog',new Schema(blog));