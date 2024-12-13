const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);