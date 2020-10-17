const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toJSON().split('T')[0]
    }
});

module.exports = mongoose.model('Product',productModel);