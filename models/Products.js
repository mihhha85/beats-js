const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    color: {
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required:true
    },
    images: {
        type: 'string',
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;