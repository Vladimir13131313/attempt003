const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    products: [
        {
            manufacturer: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            purchase: {
                type: String,
                required: true
            },
            shipment: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("stores", storeSchema);