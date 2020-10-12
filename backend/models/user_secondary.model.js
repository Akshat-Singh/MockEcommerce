const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const userSecondarySchema = new Schema({
    email: {type: String, required: true, unique: true},
    address: {type: String},
    phone: {type: String},
    purchases: {type: Array}, 
    wishlist: {type: Array},
    cart: {type: Array}
});
 
const userSecondary = mongoose.model('userSecondary', userSecondarySchema); 

module.exports = userSecondary; 