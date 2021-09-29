const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    likedFarms: [
        {
            farmId: { type: Number },
            farmRating: { type: Number }
        }
    ],
    isFarmer: {
        type: Boolean,
        default: false
    },
    userFarms: [
        {
            farmId: { type: Number, unique: true },
            farmName: { type: String },
            farmDescription: { type: String },
            farmAddress: { type: String },
            farmCity: { type: String },
            farmState: { type: String },
            farmZip: { type: Number },
            farmImage: { type: String },
            farmWebsite: { type: String },
            farmEmail: { type: String },
            farmInventory: [
                {
                    productId: { type: Number, unique: true },
                    productCategory: [{ type: String }],
                    productName: { type: String },
                    productDescription: { type: String },
                    productQty:  { type: Number },
                    productUnitPrice: { type: Number }
                }
            ],
            farmEvents: [
                {
                    eventId: { type: Number, unique: true },
                    eventName: { type: String },
                    eventAddress: { type: String },
                    eventCity: { type: String },
                    eventState: { type: String },
                    eventZip: { type: Number },
                    eventStartDate:  { type: Date },
                    eventFinishDate: { type: Date }
                }
            ]    
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;