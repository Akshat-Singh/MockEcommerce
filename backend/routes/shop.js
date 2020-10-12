const router = require('express').Router(); 
const { json } = require('express');
/* Calling the mongoose model we just created */
let shop = require('../models/shop.model'); 

/* Trigger the following when "http//www.website.com/users/" is called */
router.route('/').get((req, res) => {
    /* A GET route that returns the list of all users from the MongoDB database */


    /* If users are found in the MongoDB */
    shop.find()

        /* Return the users you got from the database in JSON format */ 
        .then(items => res.json(items))

        /* In case you hit an error */
        .catch(error => res.status(400).json("Error: + err")); 
}); 

/* Trigger the following if "http//www.website.com/users/add" is called */ 
router.route('/add').post((req, res) => {
    /* A POST route that adds a user to the database */
    
    const itemName = req.body.itemName;
    const description = req.body.description;
    const cost = Number(req.body.cost); 

    const newShop = new shop({
        itemName, 
        description, 
        cost
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
router.route('/:id')
    .get((req, res) => {
    /* A GET route that extracts the details of a product by its ID */

    shop.findById(req.params.id)
        .then(_item => res.json(_item))
        .catch(error => res.status(400).json("Error: " + error)); 
});


module.exports = router;