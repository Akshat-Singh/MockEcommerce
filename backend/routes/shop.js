const router = require('express').Router(); 
const { json } = require('express');
const mongoose = require('mongoose');

/* Calling the mongoose model we just created */
let shop = require('../models/shop.model'); 

/* Trigger the following when "http//www.website.com/users/" is called */
router.route('/products').get((req, res) => {
    /* A GET route that returns the list of all users from the MongoDB database */


    /* If found in the MongoDB */
    shop.find()

        /* Return the users you got from the database in JSON format */ 
        .then(items => res.json(items))

        /* In case you hit an error */
        .catch(error => res.status(400).json("Error: + err")); 
}); 

/* Trigger the following if "http//www.website.com/users/add" is called */ 
router.route('/add').post((req, res) => {
    /* A POST route that adds a user to the database */


    const newShop = new shop({
        itemName: req.body.itemName, 
        description: req.body.description, 
        cost: Number(req.body.cost), 
        totalRatings: 0,
        avgRatings: 0,
        ratings: new Array(), 
        imageLink: req.body.imgLink, 
        category: req.body.category
    }); 

    newShop.save()
        .then(() => res.json("Item Added!"))
        .catch(err => res.status(400).json("Error: " + err)); 
}); 

/* Trigger the following if "http//www.website.com/shop/{id}" is called */ 
router.route('/:id').delete((req, res) => {
    /* A GET route that extracts the details of a product by its ID */

    shop.findByIdAndDelete(req.params.id)
        .then(() => res.json("Item Deleted Successfully"))
        .catch(error => res.status(400).json("Error: " + error)); 
});

/* Trigger the following if "http//www.website.com/shop/update/{id}" is called */
router.route('/update/:id').post((req, res) => {
    /* A POST route that updates the details of the product given its ID */

    shop.findById(req.params.id)
        .then(item => {
            item.itemName = req.body.itemName;
            item.description = req.body.description;
            item.cost = req.body.cost; 

            item.save()
                .then(() => res.json("Item Updated Successfully"))
                .catch(error => res.status(400).json("Error: " + error))
        })
        .catch(error => res.status(400).json("Error: " + error))
}); 

/* Trigger the following if "http//www.website.com/shop/delete/{id}" is called */
router.route('/update/:id').get((req, res) => {
    /* A POST route that updates the details of the product given its ID */

    shop.findById(req.params.id)
        .then(item => {
            item.itemName = req.body.itemName;
            item.description = req.body.description;
            item.cost = req.body.cost; 

            item.save()
                .then(() => res.json("Item Updated Successfully"))
                .catch(error => res.status(400).json("Error: " + error))
        })
        .catch(error => res.status(400).json("Error: " + error))
});


/* Trigger the following if "http//www.website.com/shop/{id}" is called through get*/ 
router.route('/products/:id')
    .get((req, res) => {
    /* A GET route that extracts the details of a product by its ID */

        shop.findById(req.params.id)
            .then(_item => res.json(_item))
            .catch(error => res.status(400).json("Error: " + error)); 
    });


router.route('/products/:id/rating')
    .get((req, res) => {

        shop.findById(req.params.id)
            .then(_item => res.json(_item))
            .catch(err => res.status(400).json("Error: " + err));
    })

    .post((req, res) => {
        shop.findById(req.params.id)
            .then(_item => {
                if (req.session.user){
                    let sessEmail = req.session.user.email;
                    
                    if (_item.ratings.find(_user => {return _user.email == sessEmail}))  
                        res.json("Your Rating already exists")
                    else {
                        _item.totalRatings = _item.totalRatings + 1;
                        _item.avgRatings = (_item.avgRatings + parseFloat(req.body.yourRating)) / _item.totalRatings; 
                        _item.ratings.push({"email": req.session.user.email, "rating": req.body.yourRating});
                        _item.save()
                            .then(() => res.json("Your Rating has been recorded"))
                            .catch(err => res.status(500).json("Error: " + error))
                    }
                }
                else {
                    res.json("Sign in before rating"); 
                }
            })
            .catch(err => res.status(500).json("Error: " + error))
    });

 
router.route('/getProducts')
    .post((req, res) => {
        
        /* A POST route that accepts an array of product IDs and returns an array of JSON objects containing the 
           details of each product */ 

        let list = new Array(); 
        for (const param in req.body.data) {
            list.push(mongoose.Types.ObjectId(req.body.data[param])); 
        }

        shop.find({'_id': { $in: list}})
            .then(_item => res.json(_item))
            .catch(err => res.json(err));  

    })


module.exports = router;