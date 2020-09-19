const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const shopSchema = new schema({
    itemName: {type: String, required: true}, 
    description: {type: String, required: true},
    cost: {type: Number, required: true}
}, {
    timestamps: true
});

const shop = mongoose.model('shop', shopSchema); 

module.exports = shop; 