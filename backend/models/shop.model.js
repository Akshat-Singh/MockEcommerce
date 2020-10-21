const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 


/* Schema for the database that will contain the data of the products */
const shopSchema = new schema({
    itemName: {type: String, required: true}, 
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    totalRatings: {type: Number},
    avgRatings: {type: Number}, 
    ratings: {type: Array},
    imageLink: {type: String}, 
    category: {type: String}
}, {
    timestamps: true
});

const shop = mongoose.model('shop', shopSchema); 

module.exports = shop; 