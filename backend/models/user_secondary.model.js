const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const userSecondarySchema = new Schema({
    email: {type: String, required: true, unique: true},
    address: {type: String, unique: false},
    phone: {type: String, unique: false},
    purchases: {type: Array, unique: false}, 
    wishlist: {type: Array, unique: false},
    cart: {type: Array, unique: false}
});
 
const userSecondary = mongoose.model('userSecondary', userSecondarySchema); 

module.exports = userSecondary; 